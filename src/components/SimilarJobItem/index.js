import './index.css'

import {IoMdStar} from 'react-icons/io'

import {IoLocationSharp} from 'react-icons/io5'

import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-job-item">
      <div className="company-logo-role-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobItem
