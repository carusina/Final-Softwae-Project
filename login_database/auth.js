var express = require('express');
var router = express.Router();

var template = require('./template.js');
var db = require('./db');

// 로그인 화면
router.get('/login', function (request, response) {
    var title = '로그인';
    var html = template.HTML(title, `
    <style>
    @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

    body {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #AAA2C2;
        margin: 50px;

    }

    .login-container {
      background-color: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
  }

    .background {
        background-color: white;
        height: auto;
        width: 90%;
        max-width: 450px;
        padding: 10px;
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
        text-align: center;
    }

    form {
        display: flex;
        padding: 30px;
        flex-direction: column;
    }

    .login {
        border: none;
        border-bottom: 2px solid #D1D1D4;
        background: none;
        padding: 10px;
        font-weight: 700;
        transition: .2s;
        width: 75%;
    }
    .login:active,
    .login:focus,
    .login:hover {
        outline: none;
        border-bottom-color: #6A679E;
    }

    .btn {            
        border: none;
        width: 75%;
        background-color: #6A679E;
        color: white;
        padding: 15px 0;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
        transition: .2s;
    }
    .btn:hover {
        background-color: #595787;
    }
</style>`,
            `
                <img src="C:\Users\whwns\OneDrive\바탕 화면\sw\프론트\logo.png">
                <h2>로그인</h2>
                <form action="/auth/login_process" method="post">
                <p><input class="login" type="text" name="id" placeholder="아이디"></p>
                <p><input class="login" type="password" name="pwd" placeholder="비밀번호"></p>
                <p><input class="btn" type="submit" value="로그인"></p>
                </form>            
                <p>계정이 없으신가요?  <a href="/auth/register">회원가입</a></p>
            
        `, '');
    response.send(html);
});

// 로그인 프로세스
router.post('/login_process', function (request, response) {
    var id = request.body.id;
    var password = request.body.pwd;
    if (id && password) {             // id와 pw가 입력되었는지 확인
        
        db.query('SELECT * FROM users WHERE id = ? AND password = ?', [id, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                request.session.is_logined = true;      // 세션 정보 갱신
                request.session.nickname = id;
                request.session.save(function () {
                    response.redirect(`/`);
                });
            } else {              
                response.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/auth/login";</script>`);    
            }            
        });

    } else {
        response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
        document.location.href="/auth/login";</script>`);    
    }
});

// 로그아웃
router.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        response.redirect('/');
    });
});


// 회원가입 화면
router.get('/register', function(request, response) {
    var title = '회원가입';    
    var html = template.HTML(title, `<style>
        @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
    
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #AAA2C2;
            margin: 50px;
    
        }
    
        .login-container {
          background-color: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
      }
    
        .background {
            background-color: white;
            height: auto;
            width: 90%;
            max-width: 450px;
            padding: 10px;
            margin: 0 auto;
            border-radius: 5px;
            box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
    
        form {
            display: flex;
            padding: 30px;
            flex-direction: column;
        }
    
        .login {
            border: none;
            border-bottom: 2px solid #D1D1D4;
            background: none;
            padding: 10px;
            font-weight: 700;
            transition: .2s;
            width: 75%;
        }
        .login:active,
        .login:focus,
        .login:hover {
            outline: none;
            border-bottom-color: #6A679E;
        }
    
        .btn {            
            border: none;
            width: 75%;
            background-color: #6A679E;
            color: white;
            padding: 15px 0;
            font-weight: 600;
            border-radius: 5px;
            cursor: pointer;
            transition: .2s;
        }
        .btn:hover {
            background-color: #595787;
        }
    </style>`, `
    <h2>회원가입</h2>
    <form action="/auth/register_process" method="post">
    <p><input class="login" type="text" name="id" placeholder="id"></p>
    <p><input class="login" type="password" name="pwd" placeholder="password"></p>    
    <p><input class="login" type="password" name="pwd2" placeholder="confirm password"></p>
    <p><input class="btn" type="submit" value="제출"></p>
    </form>            
    <p><a href="/auth/login">로그인 화면으로 돌아가기</a></p>
    `, '');
    response.send(html);
});
 
// 회원가입 프로세스
router.post('/register_process', function(request, response) {    
    var id = request.body.id;
    var password = request.body.pwd;    
    var password2 = request.body.pwd2;

    if (id && password && password2) {
        
        db.query('SELECT * FROM users WHERE id = ?', [id], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
                db.query('INSERT INTO users (id, password) VALUES(?, ?)', [id, password], function (error, data) {
                    if (error) throw error;
                    response.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                    document.location.href="/";</script>`);
                });
            } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우
                response.send(`<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); 
                document.location.href="/auth/register";</script>`);    
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우
                response.send(`<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); 
                document.location.href="/auth/register";</script>`);    
            }            
        });

    } else {        // 입력되지 않은 정보가 있는 경우
        response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/auth/register";</script>`);
    }
});
module.exports = router;