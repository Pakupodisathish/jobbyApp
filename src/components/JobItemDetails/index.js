import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {IoLocationSharp} from 'react-icons/io5'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FaExternalLinkAlt} from 'react-icons/fa'

import {IoMdStar} from 'react-icons/io'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    skills: [],
    jobItemDetails: {},
    companyDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const updatedJobDetails = {
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }
      const updatedSkills = jobDetails.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))
      const lifeAtCompany = jobDetails.life_at_company
      const companyDetails = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      const updatedSimilarJobs = similarJobs.map(similarJob => ({
        id: similarJob.id,
        companyLogoUrl: similarJob.company_logo_url,
        employmentType: similarJob.employment_type,
        jobDescription: similarJob.job_description,
        location: similarJob.location,
        rating: similarJob.rating,
        title: similarJob.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetails: updatedJobDetails,
        skills: updatedSkills,
        companyDetails,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobItemDetails, skills, companyDetails, similarJobs} = this.state
    const {
      title,
      companyLogoUrl,
      employmentType,
      companyWebsiteUrl,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobItemDetails
    const {description, imageUrl} = companyDetails
    return (
      <div className="job-item-content-container">
        <div className="job-item-content">
          <div className="company-logo-role-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="role-container">
              <h1 className="role">{title}</h1>
              <div className="rating-image-container">
                <IoMdStar className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employmentType-package-container">
            <div className="location-employment-type-container">
              <div className="location-logo-container">
                <IoLocationSharp className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-logo-container">
                <BsBriefcaseFill className="jobs-icon" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-company-visit-link-container">
            <h1 className="description-heading">Description</h1>
            <a
              className="visit-icon-container"
              href={companyWebsiteUrl}
              rel="noreferrer"
            >
              Visit
              <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills">Skills</h1>
          <ul className="skills-items-container">
            {skills.map(skill => (
              <li className="skill-name-img-container" key={skill.name}>
                <img
                  src={skill.imageUrl}
                  className="skill-image"
                  alt={skill.name}
                />
                <p className="skill">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company">Life at Company</h1>
          <div className="about-company">
            <p className="company-description">{description}</p>
            <img src={imageUrl} className="company-img" alt="life at company" />
          </div>
        </div>
        <div className="similar-jobs">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-items-container">
            {similarJobs.map(similarJob => (
              <SimilarJobItem
                similarJobDetails={similarJob}
                key={similarJob.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onClickRetryBtn = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <div className="failure-view-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="failure-img"
          alt="failure view"
        />
        <h1 className="alert-message">Oops! Something Went Wrong</h1>
        <p className="reason-text">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-btn"
          onClick={this.onClickRetryBtn}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  renderAppropriateView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
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
        <div className="job-item-details-container">
          {this.renderAppropriateView()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
