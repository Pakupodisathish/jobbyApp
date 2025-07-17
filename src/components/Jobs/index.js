import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import JobItem from '../JobItem'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    activeEmploymentIds: [],
    activeSalaryId: '',
    profileDetails: {},
    jobList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedData = data.profile_details
      const profileDetails = {
        name: fetchedData.name,
        profileImageUrl: fetchedData.profile_image_url,
        shortBio: fetchedData.short_bio,
      }
      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileDetails,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {activeEmploymentIds, activeSalaryId, searchInput} = this.state
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentIds.join(
      ',',
    )}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedData = data.jobs
      const jobs = fetchedData.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsApiStatus: apiStatusConstants.success,
        jobList: jobs,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="designation">{shortBio}</p>
      </div>
    )
  }

  onClickRetry = () => {
    this.getProfile()
  }

  renderRetryButton = () => (
    <div className="retry-button-container">
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  renderAppropriateProfileView = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderRetryButton()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickEmploymentCategory = employmentTypeId => {
    this.setState(prevState => {
      const isActive = prevState.activeEmploymentIds.includes(employmentTypeId)
      const updateIds = isActive
        ? prevState.activeEmploymentIds.filter(id => id !== employmentTypeId)
        : [...prevState.activeEmploymentIds, employmentTypeId]
      return {activeEmploymentIds: updateIds}
    }, this.getJobs)
  }

  renderEmploymentCategories = () => {
    const {employmentTypesList} = this.props
    const {activeEmploymentIds} = this.state
    return (
      <div className="categories-container">
        <h1 className="category-heading">Type of Employment</h1>
        <ul className="categories-items-container">
          {employmentTypesList.map(employment => (
            <li className="each-category" key={employment.employmentTypeId}>
              <input
                type="checkbox"
                id={employment.employmentTypeId}
                checked={activeEmploymentIds.includes(
                  employment.employmentTypeId,
                )}
                onChange={() =>
                  this.onClickEmploymentCategory(employment.employmentTypeId)
                }
              />
              <label className="label" htmlFor={employment.employmentTypeId}>
                {employment.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onClickSearchIcon = () => {
    this.getJobs()
  }

  onClickSalaryCategory = salaryRangeId => {
    this.setState({activeSalaryId: salaryRangeId}, this.getJobs)
  }

  renderSalaryCategories = () => {
    const {salaryRangesList} = this.props
    const {activeSalaryId} = this.state
    return (
      <div className="categories-container">
        <h1 className="category-heading">Salary Range</h1>
        <ul className="categories-items-container">
          {salaryRangesList.map(salaryRange => (
            <li
              className="each-category"
              key={salaryRange.salaryRangeId}
              onClick={() =>
                this.onClickSalaryCategory(salaryRange.salaryRangeId)
              }
            >
              <input
                type="radio"
                id={salaryRange.salaryRangeId}
                checked={activeSalaryId === salaryRange.salaryRangeId}
                onChange={() =>
                  this.onClickSalaryCategory(salaryRange.salaryRangeId)
                }
              />
              <label className="label" htmlFor={salaryRange.salaryRangeId}>
                {salaryRange.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobsSuccessView = () => {
    const {jobList} = this.state
    if (jobList.length > 0) {
      return (
        <ul className="jobs-items">
          {jobList.map(eachJob => (
            <JobItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onClickRetryToGetJobs = () => {
    this.getJobs()
  }

  renderJobsFailureView = () => (
    <div className="failure-view-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="alert-message">Oops! Something Went Wrong</h1>
      <p className="reason-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryToGetJobs}
      >
        Retry
      </button>
    </div>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          className="search-input"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              this.onClickSearchIcon()
            }
          }}
        />
        <button
          onClick={this.onClickSearchIcon}
          type="button"
          data-testid="searchButton"
          className="search-btn"
        >
          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  renderJobsAppropriateView = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-content-container">
            <div className="jobs-content">
              <div className="mobile-search-container">
                {this.renderSearchInput()}
              </div>
              {this.renderAppropriateProfileView()}
              <hr className="line" />
              {this.renderEmploymentCategories()}
              <hr className="line" />
              {this.renderSalaryCategories()}
            </div>
            <div className="job-items-container">
              <div className="desktop-search-container">
                {this.renderSearchInput()}
              </div>
              {this.renderJobsAppropriateView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
