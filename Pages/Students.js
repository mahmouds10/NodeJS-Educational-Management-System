const fs = require('fs');
const { get } = require('http');
const Students = JSON.parse(fs.readFileSync('Data/Students.json'));
const {Courses} = require('./Courses.js');
const {Departments} = require('./Departments.js');
// * Get All Students
const getStudents = (req, res) => {
    if (req.method == "GET") {
        res.statusCode = 200;

        res.write(JSON.stringify(Students));
        res.end();
    } else {
        res.statusCode = 405;
        res.end(`${req.method} methodot not allowed`);
    }
};

// * Add New Student
const addStudent = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body = JSON.parse(chunk);
    });
    req.on("end", () => {
    const index = Students.findIndex((el) => el.email === body.email);
    if (index == -1) {
        console.log(body);
        Students.push(body);
        res.statusCode = 201;
        res.write(JSON.stringify(Students));
        fs.writeFileSync("Data/Students.json", JSON.stringify(Students));
        res.end();
    } else {
        res.statusCode = 409;
        res.write("Email already exists");
        res.end();
    }
    });
};

// * Delete Student
const deleteStudent = (req , res) => {
    const id = req.url.split('/').pop()
    console.log(id);
    const index = Students.findIndex(el => el.id == id);
    if(index == -1){
        res.statusCode = 404;
        res.write('Not found');
        res.end();
    }
    else{
        res.statusCode = 200;
        res.write(JSON.stringify(Students[index]));
        Students.splice(index, 1);
        fs.writeFileSync('Data/Students.json', JSON.stringify(Students))
        res.end();
    }
}

// * Update Student
const updateStudent = (req , res) => {
    const id = +req.url.split('/').pop()
    const IDindex = Students.findIndex(el => el.id == id);
    if(IDindex == -1){
        res.statusCode = 404;
        res.write('Not found');
        res.end();
    }
    else{
        let body = ''
        req.on('data' , (chunk) => {
            body = JSON.parse(chunk)
        })
        req.on('end' , () =>{                
            const emailIndex = Students.findIndex(el => el.email == body.email);
            if (emailIndex == -1){
                Students[IDindex].id = id
                Students[IDindex].name = body.name
                Students[IDindex].email = body.email
                Students[IDindex].password = body.password
                Students[IDindex].department = body.department
                console.log('after',Students[IDindex]);
                console.log('body', body);
                console.log('studens', Students);
                res.statusCode = 200;
                res.write(JSON.stringify(Students[IDindex]));
                fs.writeFileSync('Data/Students.json', JSON.stringify(Students))
                res.end();
            }
            else{
                if (Students[IDindex].email == body.email){
                    Students[IDindex].id = id
                    Students[IDindex].name = body.name
                    Students[IDindex].email = body.email
                    Students[IDindex].password = body.password
                    Students[IDindex].department = body.department
                    res.statusCode = 200;
                    res.write(JSON.stringify(Students[IDindex]));
                    fs.writeFileSync('Data/Students.json', JSON.stringify(Students))
                    res.end();
                }
                else{
                    res.statusCode = 409
                    res.write("Email already exists")
                    res.end();
                }
            }
        })
    }
}

// * Get Specific Student 
const  getStudentById = (req,res) => {
    const id = +req.url.split('/').pop()
    const studentIndex = Students.findIndex(student => student.id == id)
    console.log(id , 'id')
    console.log(studentIndex , 'index');;
    if (studentIndex == -1){
        res.statusCode = 404;
        res.write("Not found");
        res.end();
    }
    else{
        res.statusCode = 200;
        res.write(JSON.stringify(Students[studentIndex]));
        res.end();
    }
}

// * Get Students With Their Departments and Related Courses
const getSudentsByDepartment = (req,res) => {
    const updateStudent = Students.map( student => {
        const department = Departments.find(department => department.id == student.department);
        console.log(department,'department');
        const relatedCourses = Courses.filter( course => course.departmentID == student.department)
        console.log(relatedCourses , 'course');
        return{
            ...student,
            "departmentID": department ,
            "course": relatedCourses
        }
    })
    res.statusCode = 200;
    res.write(JSON.stringify(updateStudent))
    res.end();
}

module.exports = { getStudents , addStudent , deleteStudent , updateStudent , getStudentById , getSudentsByDepartment}