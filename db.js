var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0918', //자기 비밀번호 입력
    database: 'gpuhunt'
});
db.connect();

module.exports = db;