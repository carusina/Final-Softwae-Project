const murl = "https://quasarzone.com/";
const fir = "https://quasarzone.com/bbs/qb_tsy?_method=post&type=&page=1&_token=j9FOC6CaFKPaLl7KRuU3hBI6aRONegSKGDylPWUF&popularity=&kind=subject&keyword="; // 수정해야함
const last = "&sort=num%2C+reply&direction=DESC";

// express 프레임워크 객체 생성
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const axios = require("axios");
const cheerio = require("cheerio");

var authRouter = require('./auth');
var db = require('./db');

// express의 새 인스턴스 할당
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
}));

// 인증 라우터
app.use('/auth', authRouter);

// 메인 홈페이지
app.get('/', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/index.html');
  res.sendFile(htmlPath);
});

app.get('/header.html', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/header.html');
  res.sendFile(htmlPath);
});
app.get('/body.html', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/body.html');
  res.sendFile(htmlPath);
});
app.get('/footer.html', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/footer.html');
  res.sendFile(htmlPath);
});

// 상단바 start
// 마이페이지
app.get('/my-account', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/my-account.html');
  res.sendFile(htmlPath);
});

// 상단바 end

// 중단바 start
// 소개 페이지
app.get('/aboutGPUHunt', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/aboutGPUHunt.html');
  res.sendFile(htmlPath);
});

// GPU 페이지
app.get('/gpu', function (req, res) {
  const GpuPage = fs.readFileSync(__dirname + '/gpu.ejs', 'utf-8');
  const pinfo = JSON.parse(req.query.pinfo || "[]");

  db.query("select * from vga;", function (err, result, fields) {
    if (err) throw err;
    else {
      var page = ejs.render(GpuPage, {
        data: result,
        pinfo: pinfo,
      });
      res.send(page);
    }
  });
});

app.get('/gpu/popup', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/popup.html');
  res.sendFile(htmlPath);
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
// 중단바 end

// 최저가
app.get('/getprice', async function (req, res) {
  let pinfo = [];

  try {
    const result = await new Promise((resolve, reject) => {
      db.query("select * from vga;", (err, result, fields) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const getHtml = async (pname) => {
      const pname_plus = pname.replace(/ /gi, "+");
      const furl = fir.concat(pname_plus.concat(last));
      try {
        const html = await axios.get(furl);
        let ulList = [];
        const $ = cheerio.load(html.data);
        const bodyList = $("div.market-info-list-cont");
        bodyList.map((i, element) => {
          ulList[i] = {
            status: $(element).find('p.tit span.label').text(),
            url: $(element).find('p.tit a').attr('href'),
            pname: pname,
            price: $(element).find('div.market-info-sub p span span.text-orange').text()
          };
        });
        for(var j = 0; j < ulList.length; j++) {
          if(ulList[j].status!="종료") {
            return ulList[j];
          } 
        }
        return { pname: pname, price: "정보 없음" };
      } catch (error) {
        // console.error(error);
        return { pname: pname, price: "정보 없음" }; // 기본값 추가
      }
    };

    const promises = result.map((item, index) => getHtml(item.pname));
    pinfo = await Promise.all(promises);

    res.redirect(`/gpu?${new URLSearchParams({ pinfo: JSON.stringify(pinfo) }).toString()}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 해당 포트로 서버를 시작하고 들어오는 요청 수신
app.listen(3000, () => {
  console.log('Server running at localhost:3000/');
});
