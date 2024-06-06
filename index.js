// express 프레임워크 객체 생성
const express = require('express');
const app = express();
const path = require('path');

const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

// DB 연결
// const mysql = require('mysql2');
// const client = mysql.createConnection({
//   host : 'localhost',
//   user : 'root',
//   password : 'yigija27~~',
//   database : 'GPUHunt'
// });

// express의 새 인스턴스 할당
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}));

// 해당 포트로 서버를 시작하고 들어오는 요청 수신
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// 메인 홈페이지
app.get('/', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/index.html');
    res.sendFile(htmlPath);
});

// header.html
app.get('/header.html', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/header.html');
  res.sendFile(htmlPath);
});

// body.html
app.get('/body.html', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/body.html');
    res.sendFile(htmlPath);
});

// footer.html
app.get('/footer.html', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/footer.html');
  res.sendFile(htmlPath);
});

// 상단바 시작
// 마이페이지
app.get('/my-account', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/my-account.html');
    res.sendFile(htmlPath);
});

// 로그인 페이지
app.get('/login', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/login.html');
    res.sendFile(htmlPath);
});

// 회원가입 페이지
app.get('/login/signup', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/signup.html');
    res.sendFile(htmlPath);
});
// 상단바 끝

// 중단바 시작
// 소개 페이지
app.get('/aboutGPUHunt', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/aboutGPUHunt.html');
    res.sendFile(htmlPath);
});

// GPU 페이지
app.get('/gpu', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/gpu.html');
    res.sendFile(htmlPath);
});

// GPU 페이지
app.get('/gpu', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/gpu.html');
  res.sendFile(htmlPath);

  // const GpuPage = fs.readFileSync(__dirname + '/gpu.ejs', 'utf-8');
  // client.query("select pname, price from gpu limit 1;", function(err, result, fields) {
  //   if(err) throw err;
  //   else{
  //     var page = ejs.render(GpuPage, {
  //       data: result,
  //     });
  //     res.send(page);
  //   }
  // });
});
// 카트
app.get('/cart', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/cart.html');
    res.sendFile(htmlPath);
});

// checkout
app.get('/checkout', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/checkout.html');
    res.sendFile(htmlPath);
});
  
// wishlist
app.get('/wishlist', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/wishlist.html');
    res.sendFile(htmlPath);
});

// shop-detail
app.get('/shop-detail', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/shop-detail.html');
    res.sendFile(htmlPath);
});

// service
app.get('/service', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/service.html');
    res.sendFile(htmlPath);
});

// contact-us
app.get('/contact-us', function (req, res) {
    const htmlPath = path.resolve(__dirname + '/contact-us.html');
    res.sendFile(htmlPath);
});
// 중단바 끝
