import {IoMdStar} from 'react-icons/io'

import {IoLocationSharp} from 'react-icons/io5'

import {BsBriefcaseFill} from 'react-icons/bs'

import {withRouter} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  const onClickJobItem = () => {
    const {history} = props
    history.replace(`/jobs/${id}`)
  }

  return (
    <li className="job-item" onClick={onClickJobItem}>
      <div className="company-logo-role-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
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
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
    </li>
  )
}
export default withRouter(JobItem)
