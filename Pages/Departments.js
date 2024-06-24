const { log } = require('console');
const fs = require('fs');
const Departments = JSON.parse(fs.readFileSync('Data/Departments.json'));

// * Get All Departments
const getDepartments = (req , res) =>{
    if(req.method == 'GET'){
        res.statusCode = 200;
        res.write(JSON.stringify(Departments))
        res.end();
    }
    else{
        res.statusCode = 405
        res.end(`${req.method} methodot not allowed`);
    }
}

// * Add Course
const addDepartment = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body = JSON.parse(chunk);
    });
    req.on("end", () => {
    const index = +Departments.findIndex((el) => el.id === body.id);
    if (index == -1) {
        Departments.push(body);
        res.statusCode = 201;
        res.write(JSON.stringify(Departments));
        fs.writeFileSync("Data/Departments.json", JSON.stringify(Departments));
        res.end();
    } else {
        res.statusCode = 409;
        res.write("ID already exists");
        res.end();
    }
    });
}

// * Delete Course
const deleteDepartment = (req, res) => {
    const id = req.url.split('/').pop()
    const index = Departments.findIndex(el => el.id == id);
    if(index == -1){
        res.statusCode = 404;
        res.write('Not found');
        res.end();
    }
    else{
        res.statusCode = 200;
        res.write(JSON.stringify(Departments[index]));
        Departments.splice(index, 1);
        fs.writeFileSync('Data/Departments.json', JSON.stringify(Departments))
        res.end();
    }
}

// * Update Course
const updateDepartment = (req , res) => {
    const id = +req.url.split('/').pop()
    const departmentIndex = Departments.findIndex(course => course.id == id)
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
            const bodyIDIndex = Departments.findIndex(department => department.id == body.id)
            if (bodyIDIndex == -1){
                Departments[departmentIndex].id = body.id
                Departments[departmentIndex].name = body.name
                fs.writeFileSync('Data/Departments.json', JSON.stringify(Departments))
                res.write(JSON.stringify(Departments))
                res.end()
            }
            else{
                if (body.id == Departments[departmentIndex].id){
                    Departments[departmentIndex].id = body.id
                    Departments[departmentIndex].name = body.name
                    fs.writeFileSync('Data/Departments.json', JSON.stringify(Departments))
                    res.write(JSON.stringify(Departments))
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

// * Get Specific Course
const getDepartmentByID = (req , res) =>{
    const id = +req.url.split('/').pop()
    const index = Departments.findIndex(course => course.id === id)
    if (index == -1){
        res.statusCode = 404
        res.write("Not Found")
        res.end()
    }
    else{
        res.statusCode = 200
        res.write(JSON.stringify(Departments[index]));
        res.end()
    }
}

module.exports = {getDepartments , addDepartment , deleteDepartment , updateDepartment , getDepartmentByID , Departments}