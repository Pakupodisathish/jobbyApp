# Jobby App - Job Search Portal

Jobby App is a dynamic and responsive job search application built with React. It allows users to log in, search for jobs with various filters, and view detailed information about each job opportunity. The application is designed to provide a seamless user experience with protected routes and asynchronous data fetching from a live API.

### ✨ Live Demo

**[Jobby App Live Demo](https://pakupodisathish.github.io/jobbyApp/)**

---

### 🎬 A Quick Look
### Login page
![Login Page](https://github.com/user-attachments/assets/3b367c33-b779-48da-b562-a753220ce836)

### Login Error Page
![Login Error Page](https://github.com/user-attachments/assets/049389e6-95dc-42b7-997a-b21ceb549338)

### Home page 
![Home page](https://github.com/user-attachments/assets/ae7be88c-1532-4dfc-9d6a-9e42996fb721)

### Jobs Page
![jobs page](https://github.com/user-attachments/assets/881dd624-3b8e-4be4-ab37-cda6d1721410)


### JobItemDetails page part 1
![job item](https://github.com/user-attachments/assets/2cbf8bd5-b649-46f4-b799-11fe681450a6)

### JobItemDetails page part 2
![job item](https://github.com/user-attachments/assets/aa33453d-93c3-4765-ae57-1690fd10b56a)

### JobItemDetails page part 3
![job item](https://github.com/user-attachments/assets/f3524e9d-e45c-4546-94b7-5db4ca57c01b)


## **Features**

### **Authentication & Security**
* **User Login:** Secure login page to authenticate users with provided credentials.
* **Persistent Login:** Uses JWT tokens stored in browser cookies to maintain user sessions.
* **Protected Routes:** Key routes like Home, Jobs, and Job Details are accessible only to authenticated users.
* **Smart Redirection:** Automatically redirects users based on their authentication status to provide a seamless experience.
* **Logout:** Functionality to log out and securely terminate the session.

### **Job Searching & Filtering**
* **Jobs List:** Fetches and displays a list of available jobs from the API.
* **Keyword Search:** Users can search for jobs based on their title.
* **Filter by Employment Type:** Filter jobs by selecting one or more employment types (e.g., Full Time, Part Time, Internship).
* **Filter by Salary Range:** Filter jobs based on minimum salary packages.
* **Combined Filters:** All filters work in conjunction to refine search results.

### **User Interface & Experience**
* **Responsive Design:** The interface is built to be fully responsive and works on various screen sizes.
* **Asynchronous States:**
    * Displays a loading spinner while fetching data.
    * Shows a clean failure view with a "Retry" button if an API call is unsuccessful.
    * Displays a "No Jobs Found" view when search criteria yield no results.
* **Detailed Job View:** Clicking on a job card navigates to a detailed view showing:
    * A comprehensive job description.
    * Required skills with corresponding icons.
    * A glimpse into "Life at the Company" with text and images.
    * A list of similar jobs to encourage further exploration.
* **External Linking:** A "Visit" button on the job details page opens the company's official website in a new tab.
* **Not Found Page:** A custom 404 page for any invalid URL paths.

---

## **Technologies Used**

* **Core:** React.js, JavaScript (ES6+), HTML5, CSS3
* **Routing:** `react-router-dom`
* **API Interaction:** Browser `fetch` API
* **Authentication:** `js-cookie` for JWT token management
* **UI Components:** `react-loader-spinner` for loading indicators

---

## **API Reference**

### **Login API**
* **API:** `https://apis.ccbp.in/login`
* **Method:** `POST`
* **Sample Success Output:**
    ```json
    {
      "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y"
    }
    ```

### **Profile API**
* **API:** `https://apis.ccbp.in/profile`
* **Method:** `GET`
* **Sample Output:**
    ```json
    {
      "profile_details": {
        "name": "Rahul Attuluri",
        "profile_image_url": "[https://assets.ccbp.in/frontend/react-js/male-avatar-img.png](https://assets.ccbp.in/frontend/react-js/male-avatar-img.png)",
        "short_bio": "Lead Software Developer and AI-ML expert"
      }
    }
    ```

### **Jobs API**
* **API:** `https://apis.ccbp.in/jobs`
* **Method:** `GET`
* **Sample Output:**
    ```json
    {
      "jobs": [
        {
          "company_logo_url": "[https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png](https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png)",
          "employment_type": "Full Time",
          "id": "d6019453-f864-4a2f-8230-6a9642a59466",
          "job_description": "We’re in search of a Back-End Software Engineer...",
          "location": "Bangalore",
          "package_per_annum": "21 LPA",
          "rating": 4,
          "title": "Backend Engineer"
        }
      ],
      "total": 25
    }
    ```

### **Job Details API**
* **API:** `https://apis.ccbp.in/jobs/:id`
* **Method:** `GET`
* **Sample Output:**
    ```json
    {
      "job_details": {
        "company_logo_url": "[https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png](https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png)",
        "company_website_url": "[https://about.netflix.com/en](https://about.netflix.com/en)",
        "employment_type": "Internship",
        "id": "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751",
        "job_description": "We are looking for a DevOps Engineer..."
      }
    }
    ```
---


### sample credentials
username:rahul 
password:rahul@2021
---

## **Setup and Run**

Follow these steps to get the project up and running on your local machine.

**1. Clone the repository:**
```bash
git clone [https://github.com/pakupodisathish/jobbyApp.git](https://github.com/pakupodisathish/jobbyApp.git)
cd jobbyApp

npm install

npm start
 
