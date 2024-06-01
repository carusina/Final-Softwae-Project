const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)
//const __dirname = path.resolve();

var authRouter = require('./auth');
var authCheck = require('./authCheck');
var template = require('./template');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    res.redirect('/main');
    return false;
  }
})

// 인증 라우터
app.use('/auth', authRouter);

// 메인 페이지
app.get('/main', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  }
  var html = template.HTML('Welcome',`
      <meta http-equiv="X-UA-Compatible" content="IE=edge">

      <!-- Mobile Metas -->
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <!-- Site Metas -->
      <title>GPU-HUNT</title>
      <meta name="keywords" content="">
      <meta name="description" content="">
      <meta name="author" content="">

      <!-- Site Icons -->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
      <link rel="apple-touch-icon" href="images/apple-touch-icon.png">

      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="css/bootstrap.min.css">
      <!-- Site CSS -->
      <link rel="stylesheet" href="css/style.css">
      <!-- Responsive CSS -->
      <link rel="stylesheet" href="css/responsive.css">
      <!-- Custom CSS -->
      <link rel="stylesheet" href="css/custom.css">
      `,
    `<!-- Start Main Top 여기 적혀있는 글자들 고칠거 있으면 고쳐야 됨 -->
    <div class="main-top">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="text-slid-box">
                        <div id="offer-box" class="carouselTicker">
                            <ul class="offer-box">
                                <li>
                                    <i class="fab fa-opencart"></i> GPU 최저가 세일중
                                </li>
                                <li>
                                    <i class="fab fa-opencart"></i> 50% - 80% 부품 재고 떨이
                                </li>
                                <li>
                                    <i class="fab fa-opencart"></i> 20% 쿠폰 쓰기
                                </li>
                                <li>
                                    <i class="fab fa-opencart"></i> 50% 할인 지금 사야 됨
                                </li>
                                <li>
                                    <i class="fab fa-opencart"></i> 10% 할인 CPU 할인
                                </li>
                                <li>
                                    <i class="fab fa-opencart"></i> 50% - 80% 부품 재고 떨이
                                </li>
                                <li>
                                    <i class="fab fa-opencart"></i> 20% 쿠폰 쓰기
                                </li>
                                <li>
                                    <i class="fab fa-opencart"></i> 50% 할인 지금 사야 됨
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="custom-select-box">
                        <select id="basic" class="selectpicker show-tick form-control" data-placeholder="$ USD">
                        <option>₩ kor</option>
                        <option>¥ JPY</option>
						<option>$ USD</option>
						<option>€ EUR</option>
					</select>
                    </div>
                    <div class="right-phone-box">
                        <p>1:1문의 : <a href="#"> 010-7777-7777</a></p>
                    </div>
                    <div class="our-link">
                        <ul>
                            <li><a href="">마이 페이지</a></li>
                            <li><a href="/auth/login">로그인</a></li>
                            <li><a href="/auth/register">회원 가입</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Main Top -->

    <!-- Start Main Top -->
    <header class="main-header">
        <!-- Start Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
            <div class="container">
                <!-- Start Header Navigation -->
                <div class="navbar-header">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i>
                </button>
                    <a class="navbar-brand" href="index.html"><img src="images/logo.png" class="logo" alt="" weight="300" height="150"></a>
                </div>
                <!-- End Header Navigation -->

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="navbar-menu">
                    <ul class="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
                        <li class="nav-item active"><a class="nav-link" href="index.html">홈</a></li>
                        <li class="nav-item"><a class="nav-link" href="about.html">소개</a></li>
                        <li class="dropdown megamenu-fw">
                            <a href="#" class="nav-link dropdown-toggle arrow" data-toggle="dropdown">제품</a>
                            <ul class="dropdown-menu megamenu-content" role="menu">
                                <li>
                                    <div class="row">
                                        <div class="col-menu col-md-3">
                                            <h6 class="title">Top</h6>
                                            <div class="content">
                                                <ul class="menu-col">
                                                    <li><a href="shop.html">CPU</a></li>
                                                    <li><a href="shop.html">GPU</a></li>
                                                    <li><a href="shop.html">Main-Board</a></li>
                                                    <li><a href="shop.html">RAM</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- end col-3 -->
                                        <div class="col-menu col-md-3">
                                            <h6 class="title">Storage device</h6>
                                            <div class="content">
                                                <ul class="menu-col">
                                                    <li><a href="shop.html">SSD</a></li>
                                                    <li><a href="shop.html">HDD</a></li>
                                                    <li><a href="shop.html">ODD</a></li>
                                                    <li><a href="shop.html">USB</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- end col-3 -->
                                        <div class="col-menu col-md-3">
                                            <h6 class="title">I/O devices</h6>
                                            <div class="content">
                                                <ul class="menu-col">
                                                    <li><a href="shop.html">key-board</a></li>
                                                    <li><a href="shop.html">Mouse</a></li>
                                                    <li><a href="shop.html">Monitor</a></li>
                                                    <li><a href="shop.html">Web-Cam</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-menu col-md-3">
                                            <h6 class="title">Accessories</h6>
                                            <div class="content">
                                                <ul class="menu-col">
                                                    <li><a href="shop.html">Router</a></li>
                                                    <li><a href="shop.html">Speaker</a></li>
                                                    <li><a href="shop.html">Headset</a></li>
                                                    <li><a href="shop.html">CASE</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- end col-3 -->
                                    </div>
                                    <!-- end row -->
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="nav-link dropdown-toggle arrow" data-toggle="dropdown">나의 쇼핑</a>
                            <ul class="dropdown-menu">
                                <li><a href="cart.html">Cart</a></li>
                                <li><a href="checkout.html">Checkout</a></li>
                                <li><a href="my-account.html">My Account</a></li>
                                <li><a href="wishlist.html">Wishlist</a></li>
                                <li><a href="shop-detail.html">Shop Detail</a></li>
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="service.html">서비스</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact-us.html">연락처</a></li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->

                <!-- Start Atribute Navigation -->
                <div class="attr-nav">
                    <ul>
                        <li class="search"><a href="#"><i class="fa fa-search"></i></a></li>
                        <li class="side-menu"><a href="#">
						<i class="fa fa-shopping-bag"></i>
                            <span class="badge">3</span>
					</a></li>
                    </ul>
                </div>
                <!-- End Atribute Navigation -->
            </div>
            <!-- Start Side Menu -->
            <div class="side">
                <a href="#" class="close-side"><i class="fa fa-times"></i></a>
                <li class="cart-box">
                    <ul class="cart-list">
                        <li>
                            <a href="#" class="photo"><img src="images/cart1.jpg" class="cart-thumb" alt="" /></a>
                            <h6><a href="#">갤럭시 GALAX 지포스 RTX 4060 Ti OC D6 8GB  </a></h6>
                            <p>1x - <span class="price">544,680원 </span></p>
                        </li>
                        <li>
                            <a href="#" class="photo"><img src="images/cart2.jpg" class="cart-thumb" alt="" /></a>
                            <h6><a href="#">GIGABYTE 지포스 RTX 3060 GAMING OC V2 D6 8GB 제이씨현 </a></h6>
                            <p>1x - <span class="price">355,970원</span></p>
                        </li>
                        <li>
                            <a href="#" class="photo"><img src="images/cart3.jpg" class="cart-thumb" alt="" /></a>
                            <h6><a href="#">ASUS DUAL 라데온 RX 7600 O8G V2 OC D6 8GB </a></h6>
                            <p>1x - <span class="price">336,000원 </span></p>
                        </li>
                        <li class="total">
                            <a href="#" class="btn btn-default hvr-hover btn-cart">장바구니</a>
                            <span class="float-right"><strong>총합</strong>: 1,237,620원</span>
                        </li>
                    </ul>
                </li>
            </div>
            <!-- End Side Menu -->
        </nav>
        <!-- End Navigation -->
    </header>
    <!-- End Main Top -->

    <!-- Start Top Search -->
    <div class="top-search">
        <div class="container">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-search"></i></span>
                <input type="text" class="form-control" placeholder="Search">
                <span class="input-group-addon close-search"><i class="fa fa-times"></i></span>
            </div>
        </div>
    </div>
    <!-- End Top Search -->

    <!-- Start Slider -->
    <div id="slides-shop" class="cover-slides">
        <ul class="slides-container">
            <li class="text-left">
                <img src="images/banner-01.jpg" alt="">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="m-b-20"><strong>Welcome To <br> GPU-HUNT</strong></h1>
                            <p class="m-b-40">There is no place cheaper than here <br> Buy it now!!</p>
                            <p><a class="btn hvr-hover" href="#">Shop Start</a></p>
                        </div>
                    </div>
                </div>
            </li>
            <li class="text-center">
                <img src="images/banner-02.jpg" alt="">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="m-b-20"><strong>Welcome To <br> GPU-HUNT</strong></h1>
                            <p class="m-b-40">There is no place cheaper than here <br> Buy it now!!</p>
                            <p><a class="btn hvr-hover" href="#">Shop Start</a></p>
                        </div>
                    </div>
                </div>
            </li>
            <li class="text-right">
                <img src="images/banner-03.jpg" alt="">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="m-b-20"><strong>Welcome To <br> GPU-HUNT</strong></h1>
                            <p class="m-b-40">There is no place cheaper than here<br> Buy it now!!</p>
                            <p><a class="btn hvr-hover" href="#">Shop Start</a></p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="slides-navigation">
            <a href="#" class="next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
            <a href="#" class="prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
        </div>
    </div>
    <!-- End Slider -->

    <!-- Start Categories  -->
    <div class="categories-shop">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="shop-cat-box">
                        <img class="img-fluid" src="images/CPU.png" alt="" />
                        <a class="btn hvr-hover" href="#">CPU</a>
                    </div>
                    <div class="shop-cat-box">
                        <img class="img-fluid" src="images/GPU.png" alt="" />
                        <a class="btn hvr-hover" href="#">GPU</a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="shop-cat-box">
                        <img class="img-fluid" src="images/SSD.png" alt="" />
                        <a class="btn hvr-hover" href="#">SSD</a>
                    </div>
                    <div class="shop-cat-box">
                        <img class="img-fluid" src="images/RAM.png" alt="" />
                        <a class="btn hvr-hover" href="#">RAM</a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="shop-cat-box">
                        <img class="img-fluid" src="images/POWER.png" alt="" />
                        <a class="btn hvr-hover" href="#">POWER</a>
                    </div>
                    <div class="shop-cat-box">
                        <img class="img-fluid" src="images/HDD.png" alt="" />
                        <a class="btn hvr-hover" href="#">HDD</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Categories -->

    <!-- Start Products  -->
    <div class="products-box">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="title-all text-center">
                        <h1>Featured Products</h1>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="special-menu text-center">
                        <div class="button-group filter-button-group">
                            <button class="active" data-filter="*">All</button>
                            <button data-filter=".top-featured">Top featured</button>
                            <button data-filter=".best-seller">Best seller</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row special-list">
                <div class="col-lg-3 col-md-6 special-grid best-seller">
                    <div class="products-single fix">
                        <div class="box-img-hover">
                            <div class="type-lb">
                                <p class="sale">Sale</p>
                            </div>
                            <img src="images/img-pro-01.jpg" class="img-fluid" alt="Image">
                            <div class="mask-icon">
                                <ul>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                                </ul>
                                <a class="cart" href="#">장바구니</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>갤럭시 GALAX 지포스 RTX 4060 Ti OC D6 8GB</h4>
                            <h5> 544,680원</h5>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 special-grid top-featured">
                    <div class="products-single fix">
                        <div class="box-img-hover">
                            <div class="type-lb">
                                <p class="new">New</p>
                            </div>
                            <img src="images/img-pro-02.jpg" class="img-fluid" alt="Image">
                            <div class="mask-icon">
                                <ul>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                                </ul>
                                <a class="cart" href="#">장바구니</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>GIGABYTE 지포스 RTX 3060 GAMING OC V2 D6 8GB 제이씨현</h4>
                            <h5> 355,970원</h5>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 special-grid top-featured">
                    <div class="products-single fix">
                        <div class="box-img-hover">
                            <div class="type-lb">
                                <p class="sale">Sale</p>
                            </div>
                            <img src="images/img-pro-03.jpg" class="img-fluid" alt="Image">
                            <div class="mask-icon">
                                <ul>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                                </ul>
                                <a class="cart" href="#">장바구니</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>ASUS DUAL 라데온 RX 7600 O8G V2 OC D6 8GB</h4>
                            <h5>336,000원</h5>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 special-grid best-seller">
                    <div class="products-single fix">
                        <div class="box-img-hover">
                            <div class="type-lb">
                                <p class="sale">Sale</p>
                            </div>
                            <img src="images/img-pro-04.jpg" class="img-fluid" alt="Image">
                            <div class="mask-icon">
                                <ul>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                                </ul>
                                <a class="cart" href="#">장바구니</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>COLORFUL 지포스 RTX 4060 토마호크 DUO V2 D6 8GB</h4>
                            <h5> 412,900원</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Products  -->

    <!-- Start Blog  -->
    <div class="latest-blog">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="title-all text-center">
                        <h1>REVIEW</h1>
                        <p>This is the part where we collect reviews.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-4 col-xl-4">
                    <div class="blog-box">
                        <div class="blog-img">
                            <img class="img-fluid" src="images/blog-img.jpg" alt="" />
                        </div>
                        <div class="blog-content">
                            <div class="title-blog">
                                <h3>기가바이트 rtx4060ti 47만원 주고 구매 했습니다.</h3>
                                <p>게임중 발열이 70도이상가고 팬rpm 1100정도로 돌아가는 소리 땜에 해드폰을 껴도 소음이 들릴정도라 중고로 판매하고 이앰텍 정품 판매처로 2만원정도 비싸도rtx4060ti로 재구매 했습니다.</p>
                            </div>
                            <ul class="option-blog">
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Likes"><i class="far fa-heart"></i></a></li>
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Views"><i class="fas fa-eye"></i></a></li>
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Comments"><i class="far fa-comments"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-4">
                    <div class="blog-box">
                        <div class="blog-img">
                            <img class="img-fluid" src="images/blog-img-01.jpg" alt="" />
                        </div>
                        <div class="blog-content">
                            <div class="title-blog">
                                <h3>살짝 소음이 귀에 거슬리긴 하는데... 여름 되어봐야 ...</h3>
                                <p>알 것 같네요.화면이 한번씩 망가지는(?)데 모니터 탓인지 그래픽카드 탓인지 잘 모르겠습니다.좀 더 사용해봐야 정확히 알 수 있을 것 같습니다. 흠...</p>
                            </div>
                            <ul class="option-blog">
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Likes"><i class="far fa-heart"></i></a></li>
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Views"><i class="fas fa-eye"></i></a></li>
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Comments"><i class="far fa-comments"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-4">
                    <div class="blog-box">
                        <div class="blog-img">
                            <img class="img-fluid" src="images/blog-img-02.jpg" alt="" />
                        </div>
                        <div class="blog-content">
                            <div class="title-blog">
                                <h3>좋았습니다 ...처음에 설치전 꼭</h3>
                                <p>좋았습니다 ...처음에 설치전 꼭 원래 깔려있던 드라이브를 지워야 오류가 없는데 잘몰라서 한참 해매버렸어요...지금설치하고 잘돌아갑니다</p>
                            </div>
                            <ul class="option-blog">
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Likes"><i class="far fa-heart"></i></a></li>
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Views"><i class="fas fa-eye"></i></a></li>
                                <li><a href="#" data-toggle="tooltip" data-placement="right" title="Comments"><i class="far fa-comments"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Blog  -->


    <!-- Start Instagram Feed  -->
    <div class="instagram-box">
        <div class="main-instagram owl-carousel owl-theme">
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-01.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-02.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-03.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-04.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-05.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-06.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-07.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-08.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-09.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="ins-inner-box">
                    <img src="images/instagram-img-05.jpg" alt="" />
                    <div class="hov-in">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Instagram Feed  -->


    <!-- Start Footer  -->
    <footer>
        <div class="footer-main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="footer-widget">
                            <h4>About GPU-HUNT</h4>
                            <p>당신의 그래픽 카드 쇼핑을 단순하고 경제적으로 만들어줄 GPU-hunt에 오신 것을 환영합니다!<br> GPU-hunt는 최신 그래픽 카드를 가장 저렴한 가격에 찾을 수 있도록 도와주는 최저가 검색 전문 사이트입니다.
                            </p>
                            <p>
                                왜 GPU-hunt인가?<br>
                                완전 최저가 보장: 다양한 온라인 쇼핑몰을 한눈에 비교하여 언제나 최저가를 제공합니다.<br>
                                실시간 가격 비교: 실시간으로 업데이트되는 가격 정보로 최신 최저가를 놓치지 않습니다.<br>
                                사용자 친화적 인터페이스: 간편하고 직관적인 검색 기능을 통해 원하는 제품을 빠르게 찾을 수 있습니다.
                                </p>
                            <ul>
                                <li><a href="#"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-google-plus" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-rss" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-pinterest-p" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-whatsapp" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="footer-link">
                            <h4>Information</h4>
                            <ul>
                                <li><a href="#">소개</a></li>
                                <li><a href="#">제품</a></li>
                                <li><a href="#">나의 쇼핑</a></li>
                                <li><a href="#"> 광고&amp;협력문의</a></li>
                                <li><a href="#">서비스</a></li>
                                <li><a href="#">연락처</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="footer-link-contact">
                            <h4>Contact Us</h4>
                            <ul>
                                <li>
                                    <p><i class="fas fa-map-marker-alt"></i>주소: 부산광역시 사하구<br>사하구 낙동대로 550번길 37<br> S06-635 </p>
                                </li>
                                <li>
                                    <p><i class="fas fa-phone-square"></i>전화번호: <a href="tel:+1-888705770">010-7777-77777</a></p>
                                </li>
                                <li>
                                    <p><i class="fas fa-envelope"></i>이메일: <a href="mailto:contactinfo@gmail.com">GPU-HUNT@gmail.com</a></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- End Footer  -->

    <!-- Start copyright  -->
    <div class="footer-copyright">
        <p class="footer-company">All Rights Reserved. &copy; 2024 <a href="#">GPU-HUNT</a> Design By : 조준혁<br>github site address:
            <a href="https://github.com/carusina/Final-SoftWare-Project"> Final-SoftWare-Project 
            </a></p>
   </div>
    <!-- End copyright  -->

    <a href="#" id="back-to-top" title="Back to top" style="display: none;">&uarr;</a>

    <!-- ALL JS FILES -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!-- ALL PLUGINS -->
    <script src="js/jquery.superslides.min.js"></script>
    <script src="js/bootstrap-select.js"></script>
    <script src="js/inewsticker.js"></script>
    <script src="js/bootsnav.js."></script>
    <script src="js/images-loded.min.js"></script>
    <script src="js/isotope.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/baguetteBox.min.js"></script>
    <script src="js/form-validator.min.js"></script>
    <script src="js/contact-form-script.js"></script>
    <script src="js/custom.js"></script>
        `, authCheck.statusUI(req, res)
  );
  res.send(html);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})