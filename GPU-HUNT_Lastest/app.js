const express = require('express');
const mysql = require('mysql2');
const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yigija27~~',
  database: 'gpuhunt'
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.stack);
    return;
  }
  console.log('MySQL에 연결되었습니다. ID: ' + connection.threadId);
});

// 데이터 복사 함수
const copyData = () => {
  const sourceTable = 'vga';
  const targetTable = 'wish';

  // 복사할 데이터를 선택하는 쿼리
  const selectQuery = `SELECT * FROM ${sourceTable}`;

  // 데이터를 타겟 테이블에 삽입하는 쿼리
  connection.query(selectQuery, (error, results, fields) => {
    if (error) throw error;

    results.forEach((row) => {
      const insertQuery = `INSERT INTO ${targetTable} SET ?`;
      connection.query(insertQuery, row, (error, results, fields) => {
        if (error) throw error;
        console.log('데이터 복사 완료: ', results.insertId);
      });
    });
  });
};

// 데이터 복사 실행
copyData();

// 정적 파일 및 뷰 엔진 설정
app.use(express.static('public'));
app.set('view engine', 'ejs');

// 라우트 설정
app.get('/', (req, res) => {
  const query = 'SELECT * FROM wish'; // 대상 테이블에서 데이터를 가져오는 쿼리

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    res.render('index', { data: results });
  });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 