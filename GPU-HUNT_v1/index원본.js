const murl="https://quasarzone.com/";
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
app.use(bodyParser.urlencoded({   extended: false   }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

//인증 라우터
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

//상단바 strat
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

    db.query("select * from vga;", function(err, result, fields) {
      if(err) throw err;
      else{
        var page = ejs.render(GpuPage, {
          data: result,
        });
        res.send(page);
      }
    });
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
app.get('/getprice', function (req, res) {
  var pname = req.query.pname;
  var pname_puls = pname.replace(/ /gi, "+"); 
  const furl = fir.concat(pname_puls.concat(last));

  const getHtml = async () => {
    try {
      return await axios.get(furl);
    } catch (error) {
      console.error(error);
    }
  };

  getHtml().then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.market-info-list-cont");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          status: $(this).find('p.tit span.label').text(),
          url: murl.concat($(this).find('p.tit a').attr('href')),
          pname: $(this).find('p.tit a span.ellipsis-with-reply-cnt').text(),
          price: $(this).find('div.market-info-sub p span span.text-orange').text()
      };
    });
    
    for(var i = 0; i < ulList.length; i++) {
      // if(ulList[i].status=="종료") {
      //   console.log(`${pname}: 종료`)
      // }
      // else {
      //   console.log(`${pname}: 진행중 ${ulList[i].price}`)
      // }
      console.log(ulList[i]);
    }
    console.log('-----------------------------------');
    
    
  })

  res.redirect('/gpu');
});

// 해당 포트로 서버를 시작하고 들어오는 요청 수신
app.listen(3000, () => {
  console.log('Server running at localhost:3000/');
});

[티몬] [EMTEK] 이엠텍 지포스 RTX 4070 Ti SUPER BLACK STORM OC D6X 16... =  ￦ 1,081,980 (KRW)
[티몬+카카오페이] GIGABYTE 지포스 RTX 4080 SUPER GAMING OC D6X 16GB 피씨... =  ￦ 1,399,030 (KRW)
[ 티몬 ] GIGABYTE 지포스 RTX 4060 Ti WINDFORCE OC D6 8GB 제이씨현 =  ￦ 481,000 (KRW)
[인터파크] GIGABYTE 지포스 RTX 3060 Ti Gaming OC V2 D6 8GB =  ￦ 549,900 (KRW)
GIGABYTE 지포스 RTX 4070 SUPER WINDFORCE OC D6X 12GB 제이씨현 =  ￦ 782,550 (KRW)
[티몬] GIGABYTE 지포스 RTX 4090 Gaming OC D6X 24GB 제이씨현 =  ￦ 2,199,000 (KRW)