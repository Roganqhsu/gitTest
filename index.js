const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');

// 引入資料庫
const db = mysql.createConnection({
    user: 'root',
    password: 'root123',
    host: 'localhost',
    database: 'employeesystem',
})

// 用post函式傳入前端資料
app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const wage = req.body.wage;
    db.query(
        'INSERT INTO employees(name, age, country,wage) VALUES(?,?,?,?)'
        , [name, age, country, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('final');
            }
        }
    )
}

)

// 取得資料
app.get('/getEmployees', (req, res) => {
    db.query('SELECT * FROM employees',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})
// 修改值
app.put('/update', (req, res) => {
    const name = req.body.name;
    const id = req.body.id
    db.query('UPDATE employees SET name=? WHERE employeesid=?'
        , [name, id]
        , (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        }
    )
}
)

// 刪除
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    db.query('DELETE FROM employees WHERE employeesid=?'
    ,id
    ,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    )
})


// 設立監聽
app.listen('3006', () => {
    console.log('running on http://localhost/3006 YA');
})