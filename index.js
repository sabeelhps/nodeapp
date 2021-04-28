const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'/public')));

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});



app.get('/', (req, res) => {
    res.send("IT WORKED");
})


app.post('/query', (req, res) => {
    console.log(req.body);
    const { queryString } = req.body;
    mysqlConnection.query(queryString, (err, rows, fields) => {
        if (!err) {
           
            if (rows.length!==0) {
                res.send(rows);
            } else {
                res.send("OK")
            }   
        }
        else
            console.log(err);
    })
});




app.listen(3000, () => {
    console.log("Server running at port 3000");
})