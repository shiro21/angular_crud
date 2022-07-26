const express = require('express');
const dotenv = require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());


// DB Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    port: process.env.DB_PORT
});

// check DB Connection
db.connect(err => {
    if(err) throw err;
    console.log('Database Connected');
});

// GET All Data
app.get('/user', (req, res, next) => {
    
    let _sql = `SELECT * FROM user`;

    db.query(_sql, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            res.send({
                message: 'All User Data',
                data: result
            });
        }
    });
});

// GET Single Data
app.get('/user/:id', (req, res, next) => {
    
    let _sql_id = req.params.id;
    let _sql = `SELECT * FROM user WHERE id = ${_sql_id}`;

    db.query(_sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            res.send({
                message: 'GET Single Data',
                data: result
            });
        } else {
            res.send({
                message: 'No Data'
            });
        }
    });
});

// Create Data
app.post('/user', (req, res, next) => {
    console.log(req.body, 'Create');

    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let _sql = `
        INSERT INTO user(fullname, email, mobile)
        VALUES('${fullname}', '${email}', '${mobile}')
    `;

    db.query(_sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send({
            message: 'Data Inserted'
        });
    });
});

// Update Single Data
app.put('/user/:id', (req, res, next) => {

    console.log(req.body, 'Update');

    let _sql_id = req.params.id;

    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let _sql = `
        UPDATE user SET fullname = '${fullname}', email = '${email}', mobile = '${mobile}'
        WHERE id = ${_sql_id}
    `;

    db.query(_sql, (err, result) => {
        if(err) throw err;

        res.send({
            message: 'Data Update'
        });
    });
});

// Delete Single Data
app.delete('/user/:id', (req, res, next) => {
    let _sql_id = req.params.id;

    let _sql = `DELETE FROM user WHERE id = '${_sql_id}'`;
    db.query(_sql, (err, result) => {
        if(err) throw err;

        res.send({
            message: 'Data Deleted'
        });
    });
});


app.listen(3000, () => {
    console.log('Server Start');
})