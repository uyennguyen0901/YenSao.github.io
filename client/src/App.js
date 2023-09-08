import React from 'react';
import logo from './img/logo-cropped.svg';
import yennhat from './img/yensach.png'
import yentho from './img/yentho.png'
// import background from './img/background.jpg'
import searchIcon from './img/search-icon.png';
import myVideo from './img/yen.mp4';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swiper from 'swiper';
import AOS from 'aos';
import Isotope from 'isotope-layout';
import Waypoint from 'waypoints/lib/noframework.waypoints';

import GLightbox from 'glightbox';

function App() {

    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
      return [...document.querySelectorAll(el)]
      } else {
      return document.querySelector(el)
      }
    }
    
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
      }
    }
    
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
    
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
    
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
    
      let elementPos = select(el).offsetTop
      window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
      })
    }
    
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
    
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
    
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
    
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
    
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
      e.preventDefault()
    
      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
      }
    }, true)
    
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
      }
    });
    
    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
      preloader.remove()
      });
    }
    
    /**
     * Initiate  glightbox 
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
    
    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
      new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
        el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
      })
    }
    
    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });
    
      let portfolioFilters = select('#portfolio-flters li', true);
    
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
        el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');
    
        portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
        AOS.refresh()
        });
      }, true);
      }
    
    });
    
    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
    
    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
      delay: 5000,
      disableOnInteraction: false
      },
      pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
      }
    });
    
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
      });
    });
    
  return (
    <div className="App">
      <div id="header" className="header_section fixed-top">
        <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light">
          <div className = "container-fluid">
            <div className="logo">
              <a href="index.html">
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item scrollto"><a className="nav-link" href="#hero">Trang chủ</a></li>
                <li className="nav-item scrollto"><a className="nav-link" href="#about">Giới thiệu</a></li>
                <li className="nav-item scrollto"><a className="nav-link" href="#product">Sản phẩm</a></li>
                <li className="nav-item scrollto"><a className="nav-link" href="#contact">Liên hệ</a></li>
              </ul>
            </div>
            <div className="login_menu justify-content-end">
              <a href="#"><img src={searchIcon} alt="Search" /></a>
            </div>
          </div>
        </nav>
      </div>  


      <div id="hero" class="banner_section layout_padding">
        <div id="main_slider" class="carousel slide" data-ride="carousel">
          <div class="container">
            <div class="row">
              <div class="col-md-12" data-aos="fade-up" data-aos-delay="200">
                <h1 class="banner_taital"> Yến Sào<br/><span style={{"color": "#f3801f"}}>Phương Dinh</span></h1>
              </div>
              
            </div>
          </div> 
        </div>
      </div>
     

      <div id="about" class="about_section layout_padding">
        <div id="my_main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container" data-aos="fade-up">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="about_main">
                        <h1 class="about_taital">Giới thiệu</h1>
                        <p class="about_text">Yến sào, một biểu tượng của sự tinh tế và sang trọng, nay đã được chúng tôi mang đến ngay tại gia đình bạn với sản phẩm yến sào tự nấu. Tự hào được thu hoạch và chế biến hoàn toàn bằng tay, chúng tôi mang đến cho bạn sản phẩm yến sào thô,
                          giữ nguyên được vẻ đẹp tự nhiên và giá trị dinh dưỡng cao của tổ yến.
                        </p>
                        <p class="about_text">Với kinh nghiệm lâu đời trong ngành, chúng tôi cam kết yến sào tự nấu của chúng tôi hoàn toàn không sử dụng chất bảo quản hay hóa chất độc hại. Đặc biệt, chế độ kiểm tra chất lượng nghiêm ngặt của chúng tôi đảm bảo rằng mỗi tổ yến bạn nhận 
                        được đều đạt tiêu chuẩn chất lượng cao nhất, 
                        mang đến cho bạn và gia đình một trải nghiệm ẩm thực vô cùng sạch sẽ và an toàn.</p>
                        <p class="about_text">Việc sử dụng yến sào tự nấu không chỉ giúp bạn kiểm soát chính 
                        xác nguồn gốc và chất lượng của sản phẩm, mà còn mang đến sự thoải mái và tiện lợi khi 
                        bạn có thể tự tay chế biến yến sào theo sở thích cá nhân. Đặc biệt, việc tự chế biến yến 
                        sào tại nhà cũng giúp bạn tiết kiệm chi phí, đồng thời tạo ra những món ăn đặc biệt phong 
                        cách riêng, mang đậm dấu ấn cá nhân hoặc gia đình.</p>
                        <div class="readmore_bt"><a href="#">Read More</a></div>
                      </div>
                    </div>
                    <div class="col-md-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', position: 'relative' }}>
                      <video src={myVideo} autoPlay muted controls className="myVideo" style={{ position: 'absolute', top: '20px', left: '0', width: '100%', height: '100%' }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div id="product" class="services_section layout_padding">
        <div class="container" data-aos="fade-up">
          <h1 class="services_taital">Sản phẩm của chúng tôi</h1>
          <p class="services_text">Chúng tôi cung cấp một dải rộng các loại yến sào, từ yến sào tinh chế đến yến thô, phục vụ mọi nhu cầu của quý khách. Mỗi tổ yến của chúng tôi đều được thu hoạch và chế biến bằng tay thủ công, giữ trọn vẹn giá trị dinh dưỡng và hương vị tinh tế, đậm đà đặc trưng của yến sào. Hãy để chúng tôi biến bữa ăn hàng ngày của quý khách thành những trải nghiệm ẩm thực đầy thú vị!</p>
          <div class="services_section_2 layout_padding">
            <div class="row">
              <div class="col-md-6">
                <div class="box_main active" data-aos="zoom-in" data-aos-delay="100">
                  <div class="left_main">
                    <div class="cup_img_1"><img src={yennhat}/></div>
                  </div>
                  <div class="middle_main">
                    <div class="border_10 active"></div>
                  </div>
                  <div class="right_main">
                    <h6 class="milk_text">Yến tinh chế</h6>
                    <h1 class="price_text">3,000,000</h1>
                    <h1 class="price_text">VND/100gr</h1>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box_main" data-aos="zoom-in" data-aos-delay="200">
                  <div class="left_main">
                    <div class="cup_img_1"><img src={yentho}/></div>
                  </div>
                  <div class="middle_main">
                    <div class="border_10"></div>
                  </div>
                  <div class="right_main">
                    <h6 class="milk_text">Yến thô</h6>
                    <h1 class="price_text">2,000,000</h1>
                    <h1 class="price_text">VND/100gr</h1>
                  </div>
                </div>7
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" class="contact_section layout_padding">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-md-6">
              <div class="mail_main">
                <h1 class="contact_taital">Liên hệ</h1>
                <p class="contact_text">
                  Chúng tôi luôn sẵn lòng lắng nghe và trả lời mọi thắc mắc của quý khách. Hãy liên hệ ngay với chúng tôi để được tư vấn chi tiết về sản phẩm, cách thức đặt hàng, và các chương trình ưu đãi hấp dẫn. Hãy để chúng tôi mang đến cho quý khách những sản phẩm tốt nhất, dịch vụ tận tâm nhất.
                </p>
              </div>
            </div>
            <div class="col-md-6 d-flex justify-content-center align-items-center">
              <div class="d-flex flex-column w-100">
                <div class="card border-0 flex-grow-1 mb-3"> 
                  <a href="tel:+840988550999">
                    <div class="card-body text-center icon-card">
                      <i class="fa fa-phone fa-3x" aria-hidden="true"></i>
                      <h4 class="text-uppercase mb-3">Tư vấn mua hàng</h4>
                      <p>0988 550 999</p>
                    </div>
                  </a>
                </div>
                <div class="card border-0 flex-grow-1">
                  <a href="https://www.facebook.com/profile.php?id=100036213322395">
                    <div class="card-body text-center icon-card">
                      <i class="fa fa-facebook fa-3x" aria-hidden="true"></i>
                      <h4 class="text-uppercase mb-3">Facebook</h4>
                      <p>Dinh Bui</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="choose_section">
        <div class="container" data-aos="zoom-in">
          <h1 class="choose_taital">Sự lựa chọn tối ưu</h1>
          <p class="choose_text">Hãy lựa chọn chúng tôi để cung cấp tổ yến cho bạn và bạn sẽ thấy sự khác biệt. Chúng tôi cam kết mang đến sự hài lòng tuyệt đối cho khách hàng.</p>
          <div class="choose_section_2">
            <div class="choose_left">
              <div class="choose_left_main">
                <div class="icon_1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                  </svg>
                </div>
              </div>
              <div class="choose_right_main">
                <h1 class="satisfied_text">99%<br/><span class="satisfied_text_1">Làm hài lòng khách hàng</span></h1>
              </div>
            </div>
            <div class="choose_middle">
              <div class="choose_left_main">
                <div class="icon_1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </div>
              </div>
              <div class="choose_right_main">
                <h1 class="satisfied_text">100%<br/><span class="satisfied_text_1">Uy tín và chất lượng</span></h1>
              </div>
            </div>
            <div class="choose_middle_1">
              <div class="choose_left_main">
                <div class="icon_1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </div>
              </div>
              <div class="choose_right_main">
                <h1 class="satisfied_text">100%<br/><span class="satisfied_text_1">Cung cấp đúng hẹn</span></h1>
              </div>
            </div>
            <div class="choose_right">
              <div class="choose_left_main">
                <div class="icon_1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-chat-left-heart" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12ZM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z"/>
                    <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                  </svg>
                </div>
              </div>
              <div class="choose_right_main">
                <h1 class="satisfied_text">190+<br/><span class="satisfied_text_1">Phản hồi tích cực từ khách hàng</span></h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about_section layout_padding">
        <div id="my_main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container" data-aos="fade-up">
                <div class="about_main">
                  <h1 class="about_taital">Tự hào</h1>
                  <p class="about_text">Với lòng tự hào và vinh dự không thể nói nên lời, chúng tôi đã có mặt trên 
                  'Challenge Me - Hãy thách thức tôi', một chương trình YouTube đình đám do chính Hoàng Nam làm MC. 
                  Cơ hội này không chỉ tuyệt vời, mà còn mang đến cho chúng tôi sân khấu để giới thiệu những tổ yến 
                  chất lượng hàng đầu, nổi tiếng với lợi ích sức khỏe không thể chối từ. Tổ yến của chúng tôi, thực 
                  hiện quy trình thu hoạch cẩn thận và chế biến tỉ mỉ, đã thu hút được sự quan tâm và ngưỡng mộ rộng 
                  rãi trong chương trình. Chúng tôi muốn gửi lời cảm ơn sâu sắc đến Hoàng Nam và toàn bộ đội ngũ 
                  'Challenge Me - Hãy thách thức tôi' đã tạo ra một nền tảng quan trọng để chúng tôi kết nối với một 
                  lượng lớn khán giả hơn.</p>
                </div>
              </div>
              
              <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh', 
                    width: '100%', 
                    padding: '20px'
                  
                }}>
                <div style={{ 
                    maxWidth: '860px', 
                    maxHeight: '615px', 
                    width: '100%', 
                    aspectRatio: '16 / 9', 
                    overflow: 'hidden', 
                    position: 'relative',
                    top: '-150px',  
                  }}>
                  <iframe 
                    style={{ 
                      position: 'absolute', 
                      top: '0', 
                      left: '0', 
                      width: '100%', 
                      height: '100%' 
                    }} 
                      src="https://www.youtube.com/embed/P--0AJ2Ctuw" 
                      title="YouTube video player" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                                                                                                                                                                                                                                                                                                                    
      <div class="copy-0-2-235">
          <span>Copyright 2023 Minh Uyen</span>
      </div>

      
    </div>
  );
}

export default App;
