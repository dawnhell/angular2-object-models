var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var app = express();
var fs = require("fs");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.send("Server is running");
});

app.get('/employeeList', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/company/api/employee.json'));
});

app.get('/bossList', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/company/api/boss.json'));
});

app.get('/companyList', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/company/api/company.json'));
});

app.post('/addEmployee', function (req, res) {
    var newData = req.body;
    fs.readFile(__dirname + '/app/company/api/employee.json',
                'utf8',
                function (err, data){
                if (err){
                    console.log(err);
                } else {
                    var obj = JSON.parse(data);
                    obj.push(newData);
                    var json = JSON.stringify(obj);
                    fs.writeFile(__dirname + '/app/company/api/employee.json',
                                json,
                                'utf8',
                                function () { console.log("Employee POST success"); });
                }});
    res.send({
        status: 200
    });
});

app.post('/addBoss', function (req, res) {
    var newData = req.body;
    fs.readFile(__dirname + '/app/company/api/boss.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                obj.push(newData);
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/app/company/api/boss.json',
                    json,
                    'utf8',
                    function () { console.log("Boss POST - success"); });
            }});
    res.send({
        status: 200
    });
});

app.post('/addCompany', function (req, res) {
    var newData = req.body;
    fs.readFile(__dirname + '/app/company/api/company.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                obj.push(newData);
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/app/company/api/company.json',
                    json,
                    'utf8',
                    function () { console.log("Company POST - success"); });
            }});
    res.send({
        status: 200
    });
});

app.post('/deleteEmployee', function (req, res) {
    var elementToDelete = req.body;
    fs.readFile(__dirname + '/app/company/api/employee.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                obj = obj.filter(function(temp) {
                    return temp.id !== elementToDelete.id;
                });
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/app/company/api/employee.json',
                    json,
                    'utf8',
                    function () { console.log("Delete employee - success"); });
            }});
    res.send({
        status: 200
    });
});

app.post('/deleteBoss', function (req, res) {
    var elementToDelete = req.body;
    fs.readFile(__dirname + '/app/company/api/boss.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                obj = obj.filter(function(temp) {
                    return temp.id !== elementToDelete.id;
                });
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/app/company/api/boss.json',
                    json,
                    'utf8',
                    function () { console.log("Delete boss - success"); });
            }});
    res.send({
        status: 200
    });
});

function updateEmployee(data, employee) {
    for(var i = 0; i < data.length; ++i) {
        if(data[i].id == employee.id){
            data[i].firstName = employee.firstName;
            data[i].lastName = employee.lastName;
            data[i].email = employee.email;
            data[i].position = employee.position;
        }
    }
}

app.post('/updateEmployee', function (req, res) {
    var elementToUpdate = req.body;
    fs.readFile(__dirname + '/app/company/api/employee.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                updateEmployee(obj, elementToUpdate);
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/app/company/api/employee.json',
                    json,
                    'utf8',
                    function () { console.log("Update employee - success"); });
            }});
    res.send({
        status: 200
    });
});

function updateBoss(data, boss) {
    for(var i = 0; i < data.length; ++i) {
        if(data[i].id == boss.id){
            data[i].firstName = boss.firstName;
            data[i].lastName = boss.lastName;
            data[i].company = boss.company;
            data[i].email = boss.email;
        }
    }
}

app.post('/updateBoss', function (req, res) {
    var elementToUpdate = req.body;
    fs.readFile(__dirname + '/app/company/api/boss.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                updateEmployee(obj, elementToUpdate);
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/app/company/api/boss.json',
                    json,
                    'utf8',
                    function () { console.log("Update boss - success"); });
            }});
    res.send({
        status: 200
    });
});

console.log('Server up and running on http://localhost:3456/');
app.listen(3456);