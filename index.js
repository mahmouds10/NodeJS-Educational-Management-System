// Import core modules
const http = require('http');

// import Pages
const { addStudent, getStudents , deleteStudent , updateStudent , getStudentById , getSudentsByDepartment} = require('./Pages/Students.js');
const { getCourses , addCourse , deleteCourses , updateCourses , getCourseByID} = require('./Pages/Courses.js');
const {getDepartments , addDepartment , deleteDepartment , updateDepartment , getDepartmentByID} = require('./Pages/Departments.js');

// Server
http.createServer(function(req, res){
    manageRoutes(req,res)

}).listen(3000 , ()=>console.log("Server is Running"))


const manageRoutes = (req , res)=>{
    res.setHeader('Content-Type', 'application/json');
    // Get All Students
    if(req.url == '/AllStudents' ){
        getStudents(req , res)
    }
    else if(req.url.startsWith('/Student') && !req.url.startsWith('/StudentsInfo') ){
        // Add student
        if(req.method == 'POST'){
            addStudent(req, res)
        }
        // Update student
        else if (req.method == 'PUT'){
            updateStudent(req, res)
        }
        // Delete student
        else if (req.method == 'DELETE'){
            deleteStudent(req, res)
        }
        // Get Specific students
        else if (req.method == 'GET'){
            getStudentById(req, res)
        }
        else{
            res.statusCode = 405;
            res.end(`${req.method} method not allowed`);
        }
        
    }
    else if(req.url == ('/StudentsInfo')){
        if(req.method == 'GET'){
            getSudentsByDepartment(req, res)
        }
        else{
            res.statusCode = 405;
            res.end(`${req.method} method not allowed`)
        }
    }
    // Get All Courses
    else if(req.url == '/AllCourses'){
        getCourses(req , res)
    }
    else if(req.url.startsWith('/Course')){
        // Add Course
        if (req.method == "POST"){
            addCourse(req, res)
        }
        // Delete Course
        else if (req.method == "DELETE"){
            deleteCourses(req, res)
        }
        // Update Course
        else if (req.method == "PUT"){
            updateCourses(req, res)
        }
        // Get Specific Course
        else if (req.method == 'GET'){
            getCourseByID(req, res)
        }
        else{
            res.statusCode = 405;
            res.end(`${req.method} method not allowed`);
        }
    }
    // Get All Departments
    else if (req.url == '/AllDepartments'){
        getDepartments(req , res)
    }
    else if(req.url.startsWith('/Department')){
        // Add Department
        if(req.method == 'POST'){
            addDepartment(req, res)
        }
        // Update Department
        else if(req.method == 'PUT'){
            updateDepartment(req, res)
        }
        // Delete Department
        else if(req.method == 'DELETE'){
            deleteDepartment(req, res)
        }
        // Get Special Department
        else if(req.method == 'GET'){
            getDepartmentByID(req, res)
        }        
        else {
            res.statusCode = 405;
            res.end(`${req.method} method not allowed`)
        }
    }
    else{
        res.statusCode = 404;
        res.end(`Not Founddsa`);
    }
}