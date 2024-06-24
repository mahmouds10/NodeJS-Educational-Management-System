# NodeJS Educational Management System

A Node.js application for managing students, courses, and departments in an educational institution. This application provides a RESTful API to perform CRUD operations on these entities.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Students](#students)
  - [Courses](#courses)
  - [Departments](#departments)
- [Contributing](#contributing)

## Features

- **Manage Students:**
  - Get all students
  - Add a new student
  - Update an existing student
  - Delete a student
  - Get a specific student by ID

- **Manage Courses:**
  - Get all courses
  - Add a new course
  - Update an existing course
  - Delete a course
  - Get a specific course by ID

- **Manage Departments:**
  - Get all departments
  - Add a new department
  - Update an existing department
  - Delete a department
  - Get a specific department by ID

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahmouds10/NodeJS-Educational-Management-System.git
   cd NodeJS-Educational-Management-System
   
2. **Install the dependencies:**
   ```bash
   npm install
3. **Start the application:**
	 ```bash
	  npm start
	  ```
   
   
  4. **(Optional) Import the Postman collection: **
		1.   Open Postman.
		2.   Click on 'Import' and select 'File'.
		3.   Drag and drop the `Postman_Collection.json` file (located in the project's root directory) or browse and select the file. 
		4.   Click 'Continue' and then 'Import'.
	
	## Usage

Once the application is running, you can use the API endpoints to manage students, courses, and departments.


## API Endpoints

### Students
- **GET /AllStudents** 
	- Retrieve all students.
- **POST /Student** 
	-  Add a new student.
- **GET /Student/id** 
	-  Retrieve a specific student by ID.
- **PUT /Student/id** 
	-  Update a specific student by ID.
- **DELETE /Student/id** 
	- Delete a specific student by ID.
- **GET /StudentsInfo** 
	- Retrieve all students along with their departments and related courses.

### Courses

- **GET /AllCourses** 
	-  Retrieve all courses.
- **POST /Course** 
	-  Add a new course.
- **GET /Course/id** 
	-  Retrieve a specific course by ID.
- **PUT /Course/id** 
	-  Update a specific course by ID.
- **DELETE /Course/id** 
	-  Delete a specific course by ID.

### Departments

- **GET /AllDepartments** 
	- Retrieve all departments.
- **POST /Department** 
	-  Add a new department.
- **GET /Department/id** 
	-  Retrieve a specific department by ID.
- **PUT /Department/id** 	
	-  Update a specific department by ID.
- **DELETE /Department/id** 
	-  Delete a specific department by ID.

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request.
