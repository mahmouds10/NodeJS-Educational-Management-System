const fs = require('fs');
const Courses = JSON.parse(fs.readFileSync('Data/Courses.json'));

// * Get All Courses
const getCourses = (req , res) =>{
    if(req.method == 'GET'){
        res.statusCode = 200;
    
        res.write(JSON.stringify(Courses))
        res.end();
    }
    else{
        res.statusCode = 405
        res.end(`${req.method} methodot not allowed`);
    }
}

// * Add Course
const addCourse = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body = JSON.parse(chunk);
    });
    req.on("end", () => {
    const index = +Courses.findIndex((el) => el.id === body.id);
    if (index == -1) {
        console.log(body);
        Courses.push(body);
        res.statusCode = 201;
        res.write(JSON.stringify(Courses));
        fs.writeFileSync("Data/Courses.json", JSON.stringify(Courses));
        res.end();
    } else {
        res.statusCode = 409;
        res.write("ID already exists");
        res.end();
    }
    });
}

// * Delete Course
const deleteCourses = (req, res) => {
    const id = req.url.split('/').pop()
    const index = Courses.findIndex(el => el.id == id);
    if(index == -1){
        res.statusCode = 404;
        res.write('Not found');
        res.end();
    }
    else{
        res.statusCode = 200;
        res.write(JSON.stringify(Courses[index]));
        Courses.splice(index, 1);
        fs.writeFileSync('Data/Courses.json', JSON.stringify(Courses))
        res.end();
    }
}

// * Update Course
const updateCourses = (req , res) => {
    const id = +req.url.split('/').pop()
    const departmentIndex = Courses.findIndex(course => course.id == id)
    console.log(id,departmentIndex);
    console.log();
    if (departmentIndex == -1) { 
        res.statusCode = 404;
        res.write('Not found');
        res.end();
    }
    else{
        let body = ''
        req.on('data', (chunk) => {
            body = JSON.parse(chunk)
        })
        req.on('end', () => {
            const bodyIDIndex = Courses.findIndex(department => department.id == body.id)
            if (bodyIDIndex == -1){
                Courses[departmentIndex].id = body.id
                Courses[departmentIndex].name = body.name
                fs.writeFileSync('Data/Courses.json', JSON.stringify(Courses))
                res.write(JSON.stringify(Courses))
                res.end()
            }
            else{
                if (body.id == Courses[departmentIndex].id){
                    Courses[departmentIndex].id = body.id
                    Courses[departmentIndex].name = body.name
                    fs.writeFileSync('Data/Courses.json', JSON.stringify(Courses))
                    res.write(JSON.stringify(Courses))
                    res.end()
                }
                else{
                    res.statusCode = 409
                    res.write("ID already exists")
                    res.end()
                }
            }
        });
    }
}

// * Get Specific Courses
const getCourseByID = (req , res) =>{
    const id = +req.url.split('/').pop()
    const index = Courses.findIndex(course => course.id === id)
    if (index == -1){
        res.statusCode = 404
        res.write("Not Found")
        res.end()
    }
    else{
        res.statusCode = 200
        res.write(JSON.stringify(Courses[index]));
        res.end()
    }
}

module.exports = {getCourses , addCourse , deleteCourses , updateCourses , getCourseByID , Courses}