const murl = "https://quasarzone.com/";
const fir = "https://quasarzone.com/bbs/qb_tsy?_method=post&type=&page=1&_token=1ooCiXpM1STAxwJw7Jz8ohy7AeKmdZPYijNzGVmr&popularity=&kind=subject&keyword="; // 수정해야함
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

const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex'); //secret 암호화

var authRouter = require('./auth');
var db = require('./db');

// express의 새 인스턴스 할당
const app = express();
// 성환
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
}));

function renderNickname(req, res, htmlPath) {
  fs.readFile(htmlPath, 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('서버에서 HTML 파일을 읽는 중 오류가 발생했습니다.');
      return;
    }
    // 세션에서 nickname 가져오기
    const nickname = req.session.nickname;
    // HTML 파일 내의 '{{nickname}}'을 세션의 nickname 값으로 교체
    html = html.replaceAll('{{nickname}}', nickname);
    // 클라이언트에게 HTML 파일 전송
    res.send(html);
  });
}

// 인증 라우터
app.use('/auth', authRouter);

// 메인 홈페이지
app.get('/', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/index.html');
  renderNickname(req, res, htmlPath);
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
  if (req.session.nickname == 'admin') {
    const htmlPath = path.resolve(__dirname, 'admin.html')
    renderNickname(req, res, htmlPath); // 관리자 페이지
  } else if(req.session.nickname){
    const htmlPath = path.resolve(__dirname, 'my-account.html')
    renderNickname(req, res, htmlPath); // 로그인 상태에서만 접근 가능한 페이지
  } else {
    res.send(`<script type="text/javascript">alert("로그인 상태가 아닙니다."); 
    document.location.href="/";</script>`);  
  }
});

app.get('/admin', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/admin.html');
  res.sendFile(htmlPath);
});
app.get('/account', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/account.html');
  res.sendFile(htmlPath);
});
app.get('/msg', function(req, res) {
  db.query("select * from msg;", function (err, result) {
      if (err) throw err;
      else {
          res.json(result);
      }
  });
});
app.get('/delete', function(req,res) {
  var name = req.query.name;
  db.query("DELETE FROM msg WHERE name = ?;", [name], function(err) {
      if (err) throw err; 
  });
});
app.get('/product', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/product.html');
  res.sendFile(htmlPath);
});
app.get('/notifications', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/notifications.html');
  res.sendFile(htmlPath);
});
app.get('/charts', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/charts.html');
  res.sendFile(htmlPath);
});

// 상단바 end

// 중단바 start
// 소개 페이지
app.get('/aboutGPUHunt', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/aboutGPUHunt.html');
  renderNickname(req, res, htmlPath);
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
      const nickname = req.session.nickname;
      page = page.replaceAll('{{nickname}}', nickname);
      res.send(page);
    }
  });
});

app.get('/gpu/popup', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/popup.html');
  renderNickname(req, res, htmlPath);
});

// 카트
app.get('/cart', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/cart.html');
  renderNickname(req, res, htmlPath);
});

// checkout
app.get('/checkout', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/checkout.html');
  renderNickname(req, res, htmlPath);
});

// 비밀번호 확인
app.post('/check_password', (req, res) => {
  var id = req.session.nickname;
  var password = req.body.password;      
  db.query('SELECT * FROM users WHERE id = ? AND password = ?', [id, password], function(error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
          res.send(true);
      } else {              
          res.send(false);    
      }            
  });
});

// 위시리스트 조회
app.get('/wishlist', (req, res) => {
  const query = 'SELECT * FROM wish';
  db.query(query, (err, result) => {
    if (err) throw err;

    console.log(result); // 쿼리 결과를 콘솔에 출력하여 확인합니다.
    const WishlistPage = fs.readFileSync(__dirname + '/wishlist.ejs', 'utf-8');
    var page = ejs.render(WishlistPage, { data: result });
    const nickname = req.session.nickname;
      page = page.replaceAll('{{nickname}}', nickname);
      res.send(page);
  });
});

// shop-detail
app.get('/shop-detail', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/shop-detail.html');
  renderNickname(req, res, htmlPath);
});

// service
app.get('/service', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/service.html');
  renderNickname(req, res, htmlPath);
});

// contact-us
app.get('/contact-us', function (req, res) {
  const htmlPath = path.resolve(__dirname + '/contact-us.html');
  renderNickname(req, res, htmlPath);
});
// 중단바 end

// 최저가
app.get('/getprice', async function (req, res) {
  let pinfo = [];
  var input_value = req.query.q;

  try {
    const result = await new Promise((resolve, reject) => {
      if(input_value == undefined) {
        db.query("select pname from vga;", (err, result, fields) => {
          if (err) reject(err);
          else resolve(result);
        });
      }
      else {
        db.query("select pname from vga where pname like ?", [`%${input_value}%`], (err, result, fields) => {
          if (err) reject(err);
          else resolve(result);
        });
      }
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
        return { pname: pname, price: "핫딜 없음" };
      } catch (error) {
        // console.error(error);
        return { pname: pname, price: "핫딜 없음" }; // 기본값 추가
      }
    };

    const promises = result.map((item, index) => getHtml(item.pname));
    pinfo = await Promise.all(promises);

    if(input_value == undefined) res.redirect(`/gpu?${new URLSearchParams({ pinfo: JSON.stringify(pinfo) }).toString()}`);
    else res.redirect(`/search_process?${new URLSearchParams({ pinfo: JSON.stringify(pinfo), name: input_value }).toString()}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 검색기능-성환
app.get('/search_process', (req, res) => {
  const SRPage = fs.readFileSync(__dirname + '/search_result.ejs', 'utf-8');
  const pinfo = JSON.parse(req.query.pinfo || "[]");
  const name = req.query.name

  db.query('select * from vga where pname like ?', [`%${name}%`], (err, results) => {
      if (err) {
          console.error('Error executing query:', err.stack);
          res.status(500).send('Database error');
          return;
      } else {
          var page = ejs.render(SRPage, {
              results: results,
              pinfo: pinfo,
          });
          const nickname = req.session.nickname;
          page = page.replaceAll('{{nickname}}', nickname);
          res.send(page);
      }
  });
});

/// 위시리스트에 항목 추가
app.post('/add-to-wishlist', (req, res) => {
  const { pname, price, url } = req.body;
  // console.log(url);

  const selectQuery = 'SELECT * FROM vga WHERE pname = ?';
  const insertQuery = 'INSERT INTO wish SET ?';

  db.query(selectQuery, [pname], (err, results) => {
    if (err) {
      console.error('Error fetching item:', err);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      var vgaData = results[0];
      vgaData.price = price;
      vgaData.url = url;
      db.query(insertQuery, vgaData, (err, insertResults) => {
        if (err) {
          console.error('Error inserting item:', err);
          return res.status(500).send('Database error');
        }

        res.status(200).send('위시리스트에 추가하였습니다.');
      });
    } else {
      res.status(404).send('Item not found.');
    }
  });
});

// 위시리스트에서 항목 삭제
app.post('/remove-from-wishlist', (req, res) => {
  const { pname } = req.body;
  const deleteQuery = 'DELETE FROM wish WHERE pname = ?';

  db.query(deleteQuery, [pname], (err, deleteResults) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).send('Database error');
    }

    res.status(200).send('위시리스트에서 제거되었습니다.');
  });
});

//로그인 유무
app.get('/check-session', (req, res) => {
  if (req.session.nickname) {
      // 세션이 유지되고 있으면 로그인 상태로 처리
      res.send(true);
  } else {
      // 세션이 없으면 로그아웃 상태로 처리
      res.send(false);
  }
});

// 메세지 전송
app.post('/message', function(request, response) {    
  var name = request.body.name;
  var email = request.body.email;
  var subject = request.body.subject;    
  var message = request.body.message;
  if (name && email && subject && message) {
      db.query('INSERT into msg (name, email, subject, message) values(?, ?, ?, ?)', [name, email, subject, message], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
          if (error) throw error;
          response.send(`<script type="text/javascript">alert("메세지 전송을 성공했습니다.");
          document.location.href="/contact-us";</script>`);
      }); 
  } else {   // 입력되지 않은 정보가 있는 경우
      response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
      document.location.href="/contact-us";</script>`);
  }});


// 해당 포트로 서버를 시작하고 들어오는 요청 수신
app.listen(3000, () => {
  console.log('Server running at localhost:3000/');
});
