const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);
const cors = require('cors');
const app = express();
const dataFormat = require('dataformat');

const newDate = new Date();
const time = dataFormat(new Date(), "yyyy-mm-dd hh:mm:ss");

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());

app.put('/create', function(req, res){
    const m_title = req.body.title;
    const m_category = req.body.category;
    const m_content = req.body.content;
    const m_nickname = "shinyeong";
    console.log(m_title);
    const sql = 'INSERT INTO memo (title, category, content, reg_date, nickname)' + 'values(?, ?, ?, ?, ?)';
    const params = [m_title, m_category, m_content, time, m_nickname];
    connection.query(sql, params, function (err, rows, fields){
        if (err) {
            console.log("err", err);
        } else {
            res.send("Input Succeed");
        }
    })
})

app.get('/list', function (req, res) {
    connection.query('SELECT * FROM MEMO', function (err, rows, field){
        if (!err){
            res.send(rows);
        } else {
            console.log('Error while performing Query.', err);
        }
    })
})

app.delete('/delete', function(req, res){
    let id = req.body.id;
    console.log('id', id)
    connection.query('DELETE FROM memo WHERE ID=(?)', id, function(err, rows, field){
        if(err){
            console.log("err",err);
        } else{
            res.send("Delete Succeed");
        }
    })
})


app.listen(app.get('port'), function(){
    console.log('Express server listening on port' + app.get('port'));
})