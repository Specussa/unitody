// start height
let oldWidth = window.innerWidth;
const docheight = document.documentElement;
const headert = document.querySelector('.header__transparent');
docheight.style.setProperty('--height', `${window.innerHeight}px`);
const appHeight = () => {
  var newWidth = window.innerWidth;
  if (newWidth != oldWidth) {
    docheight.style.setProperty('--height', `${window.innerHeight}px`);
    document.querySelector('.history__rotate').style.height = document.querySelector('.history__rotate').clientWidth + 'px';
  }
  oldWidth = window.innerWidth;
}
window.addEventListener('resize', appHeight);
appHeight();
// end height

// start scroll
scroll = new LocomotiveScroll({el: document.querySelector('[data-scroll-container]'),smooth:true,getDirection: true,scrollFromAnywhere: true,breakpoint: 0,inertia: 1.7,mobile: {breakpoint: 0,smooth: true,inertia: 0,},tablet: {breakpoint: 0,smooth: true,inertia: 1.7,},smartphone: {breakpoint: 0,smooth: true,inertia: 1.7,}})
// scroll = new LocomotiveScroll({el: document.querySelector('[data-scroll-container]'),smooth: true,getDirection: true,scrollFromAnywhere: true,breakpoint: 0,inertia: 0,tablet: {breakpoint: 0,smooth: false,inertia: 0,}})
new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"));

const hn_scroll = document.querySelector('.header__nav_scroll');
const hc_scroll = document.querySelector('.header__consultation_scroll');
const cp_scroll = document.querySelector('.career_popup__scroll');
const fp_scroll = document.querySelector('.feedback_popup__scroll');
const gp_scroll = document.querySelector('.generation_popup__scroll');

// Scrollbar.init(hn_scroll);
// Scrollbar.init(hc_scroll);
// if (cp_scroll) {Scrollbar.init(cp_scroll);}
// if (fp_scroll) {Scrollbar.init(fp_scroll);}
// if (gp_scroll) {Scrollbar.init(gp_scroll);}

const header = document.querySelector('.header');
const projecttop = document.querySelector('.project_top');
const projecttopinfo = document.querySelector('.project_top__info');
const headerprogress = document.querySelector('.header__progress_bar');

if (!document.querySelector('.has-scroll-smooth')) {
  window.addEventListener('scroll', function() {
    if (headert) {
      if (window.scrollY <= 40) {
        header.classList.add('header__transparent');
      } else {
        header.classList.remove('header__transparent');
      }
    }
    
    document.documentElement.setAttribute('scroll', `${window.scrollY}`);
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let documentHeight = Math.max(
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.querySelector('.main').clientHeight
    );
    let scrollpage = Math.round((scrollTop / (document.querySelector('.main').clientHeight - windowHeight)) * 100);
    headerprogress.style.flexBasis = scrollpage + '%';
  
  });
} else {
  scroll.on('scroll', (args) => {
    var scrollY = Math.round(args["scroll"]["y"]);
    var scrollH = Math.round(args["limit"]["y"]);
    let scrollheader = Math.round((scrollY / scrollH) * 100);
    headerprogress.style.flexBasis = scrollheader + '%';

    document.documentElement.setAttribute('scroll', `${Math.round(args["scroll"]["y"])}`);
  
    if (headert) {
      if (Math.round(args["scroll"]["y"]) <= 40) {
        header.classList.add('header__transparent');
      } else {
        header.classList.remove('header__transparent');
      }
    }
  });
}
// end scroll

// start cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const cursorBlock = cursor.querySelector(".cursor__block");
  const a = document.querySelectorAll('a');
  const button = document.querySelectorAll('button');
  const label = document.querySelectorAll('label');
  const hslanguageicon = document.querySelectorAll('.header__set_language_icon');
  const buttonnext = document.querySelectorAll('.swiper-button-next');
  const buttonprev = document.querySelectorAll('.swiper-button-prev');
  const sliders = document.querySelectorAll(".swiper-wrapper");

  document.addEventListener('mousemove', function(e){
    let ctx = e.clientX;
    let cty = e.clientY;
    if (ctx > (document.body.offsetWidth - 5) || cty > (document.body.offsetHeight - 5) || ctx < 5 || cty < 5) {
      cursor.classList.add('leave')
    } else {
      cursor.classList.remove('leave')
    }
  });
  
  function moveCursor(event) {
    var cursorX = event.clientX + "px";
    var cursorY = event.clientY + "px";
    cursor.style.transform = `translate3d(${cursorX}, ${cursorY}, 0)`;
  }

  document.onmousemove = (event) => {
    moveCursor(event);
    cursor.classList.remove("active");
  };

  document.onpointermove = (event) => {
    moveCursor(event);
    cursor.classList.remove("active");
  };

  document.addEventListener('mousedown', function(){
    cursor.classList.add('active')
  });

  document.addEventListener('mouseup', function(){
    cursor.classList.remove('active')
  });
  
  if (!document.querySelector(".price__swiper")) {
    sliders.forEach(item => {
      item.onmouseenter = () => {
        cursor.classList.add("cursor__slider");
      };
      item.onmouseleave = () => {
        cursor.classList.remove("cursor__slider");
        cursorBlock.classList.remove("active");
      };
      item.onpointerdown = () => {
        cursorBlock.classList.add("active");
      }
      item.onpointerup = () => {
        cursorBlock.classList.remove("active");
      };
    })
  }

  a.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  button.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  hslanguageicon.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  label.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  buttonnext.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  buttonprev.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })
});
// end cursor

// start year
const year = document.querySelector('.footer__year');
if(year) {
  const currentYear = new Date().getFullYear();
  year.insertAdjacentText('beforebegin', currentYear);
  year.remove();
}
// end year

// start domen
const domen = document.querySelector('.domen');
if(domen){
  let domens = document.querySelectorAll(".domen");
  for (let i = 0; i < domens.length; i++) {
    domens[i].innerText = window.location.hostname;
  }
}
// end domen

const overlay = document.querySelector('.overlay');
const menu = document.querySelector('.header__navigation');
const burger = document.querySelector('.header__burger');
const headerClose = document.querySelector('.header__close');
const menuItemActive = document.getElementsByClassName("header__nav_item active");

// button header__burger
burger.addEventListener('click', function() {
  if (burger.classList.contains("active")) {
    overlay.classList.remove("active");
    menu.classList.remove("active");
    burger.classList.remove("active");
    header.classList.remove("active");
    headerClose.classList.remove("active");
    document.documentElement.classList.remove("noscroll");
    scroll.start();
  } else {
    overlay.classList.add("active");
    menu.classList.add("active");
    burger.classList.add("active");
    header.classList.add("active");
    headerClose.classList.add("active");
    document.documentElement.classList.add("noscroll");
    header.classList.remove("hidden");
    scroll.stop();
  }
})
// end header__burger

// end header__popup
const headerPopup = document.querySelector('.header__popup');
const headerNavClose = document.querySelector('.header__navigation_close');
const headerNavLinkActive = document.querySelectorAll(".header .header__nav_link");
const headerPopupActive = document.querySelectorAll(".header .header__popup");
const headerSublinkActive = document.querySelectorAll(".header .header__sublink");
const headerSubNavActive = document.querySelectorAll(".header .header__subnav");
const headerSubSubNavActive = document.querySelectorAll(".header .header__subsubnav");
const headerNavLeftActive = document.querySelectorAll(".header .header__nav_left");
const headerNavRightActive = document.querySelectorAll(".header .header__nav_right");
if(headerPopup){
  const headerNavLink = document.querySelectorAll('.header__nav_link');
  const headerNavigation = document.querySelectorAll('.header__navigation');
  if (window.innerWidth > 1280) {
    headerNavLink.forEach(item => {
      item.addEventListener('mouseover', () => {
        let index = item.parentElement ? [...item.parentElement.parentNode.children].indexOf(item.parentElement) : -1;
        if(item.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index].children[0] && !item.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index].classList.contains("active")) {
          headerPopupActive.forEach((n) => n.classList.remove("active"));
          headerNavLinkActive.forEach((n) => n.classList.remove("active"));
          headerNavLeftActive.forEach((n) => n.classList.remove("active"));
          headerNavRightActive.forEach((n) => n.classList.remove("active"));
          headerSublinkActive.forEach((n) => n.classList.remove("active"));
          headerSubNavActive.forEach((n) => n.classList.remove("active"));
          headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
          item.classList.add("active");
          item.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index].classList.add("active");
          overlay.classList.add("active");
          document.documentElement.classList.add("noscroll");
          scroll.stop();
        } else if (!item.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index].children[0]) {
          headerPopupActive.forEach((n) => n.classList.remove("active"));
          headerNavLinkActive.forEach((n) => n.classList.remove("active"));
          headerNavLeftActive.forEach((n) => n.classList.remove("active"));
          headerNavRightActive.forEach((n) => n.classList.remove("active"));
          headerSublinkActive.forEach((n) => n.classList.remove("active"));
          headerSubNavActive.forEach((n) => n.classList.remove("active"));
          headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
          overlay.classList.remove("active");
          document.documentElement.classList.remove("noscroll");
          scroll.start();
        }
      })
    })
    headerNavigation.forEach(item => {
      item.addEventListener('mouseleave', () => {
        headerPopupActive.forEach((n) => n.classList.remove("active"));
        headerNavLinkActive.forEach((n) => n.classList.remove("active"));
        headerNavLeftActive.forEach((n) => n.classList.remove("active"));
        headerNavRightActive.forEach((n) => n.classList.remove("active"));
        headerSublinkActive.forEach((n) => n.classList.remove("active"));
        headerSubNavActive.forEach((n) => n.classList.remove("active"));
        headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
        overlay.classList.remove("active");
        document.documentElement.classList.remove("noscroll");
        scroll.start();
      });
    })
  
    const headerSubLink = document.querySelectorAll('.header__sublink');
    headerSubLink.forEach(item => {
      item.addEventListener('mouseover', () => {
        let index = item.parentElement ? [...item.parentElement.parentNode.children].indexOf(item.parentElement) : -1;
        if(!item.parentElement.classList.contains("active") && item.parentElement.parentElement.parentElement.nextElementSibling.children[1].children[0].children[index]) {
          headerSubNavActive.forEach((n) => n.classList.remove("active"));
          headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
          headerSublinkActive.forEach((n) => n.classList.remove("active"));
          item.classList.add("active");
          item.parentElement.classList.add("active");
          item.parentElement.parentElement.parentElement.nextElementSibling.children[1].children[0].children[index].classList.add("active");
          overlay.classList.add("active");
          document.documentElement.classList.add("noscroll");
          scroll.stop();
        }
      })
    })
  }

  headerNavClose.addEventListener('click', function() {
    headerPopupActive.forEach((n) => n.classList.remove("active"));
    headerNavLinkActive.forEach((n) => n.classList.remove("active"));
    headerSubNavActive.forEach((n) => n.classList.remove("active"));
    headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
    headerSublinkActive.forEach((n) => n.classList.remove("active"));
    headerNavLeftActive.forEach((n) => n.classList.remove("active"));
    headerNavRightActive.forEach((n) => n.classList.remove("active"));
    overlay.classList.remove("active");
    menu.classList.remove("active");
    burger.classList.remove("active");
    header.classList.remove("active");
    headerClose.classList.remove("active");
    scroll.start();
  })

  const headerPopupClose = document.getElementsByClassName('header__popup_close');
  for (i = 0; i < headerPopupClose.length; i++) {
    headerPopupClose[i].onclick = function(e) {
      headerPopupActive.forEach((n) => n.classList.remove("active"));
      headerNavLinkActive.forEach((n) => n.classList.remove("active"));
      headerNavLeftActive.forEach((n) => n.classList.remove("active"));
      headerNavRightActive.forEach((n) => n.classList.remove("active"));
    };
  }
  
  const headerNLClose = document.getElementsByClassName('header__nav_left_close');
  for (i = 0; i < headerNLClose.length; i++) {
    headerNLClose[i].onclick = function(e) {
      headerPopupActive.forEach((n) => n.classList.remove("active"));
      headerNavLinkActive.forEach((n) => n.classList.remove("active"));
      headerNavLeftActive.forEach((n) => n.classList.remove("active"));
    };
  }
  
  const headerNRClose = document.getElementsByClassName('header__nav_right_close');
  for (i = 0; i < headerNRClose.length; i++) {
    headerNRClose[i].onclick = function(e) {
      headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
      headerSublinkActive.forEach((n) => n.classList.remove("active"));
      headerNavRightActive.forEach((n) => n.classList.remove("active"));
    };
  }
  
  const hnlSvg = document.getElementsByClassName("header__nav_link_svg");
  for (i = 0; i < hnlSvg.length; i++) {
    hnlSvg[i].onclick = function(e) {
      let index = this.parentElement.parentElement ? [...this.parentElement.parentElement.parentNode.children].indexOf(this.parentElement.parentElement) : -1;
      if(this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index].children[0].children[1].children[0]) {
        e.preventDefault();
        headerSubNavActive.forEach((n) => n.classList.remove("active"));
        headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
        headerSublinkActive.forEach((n) => n.classList.remove("active"));
        this.parentElement.classList.add("active");
        this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index].classList.add("active");
        this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index].children[0].children[1].children[0].classList.add("active");
        overlay.classList.add("active");
        document.documentElement.classList.add("noscroll");
        scroll.stop();
      }
    };
  }
  
  const hslSvg = document.getElementsByClassName("header__sublink_svg");
  for (i = 0; i < hslSvg.length; i++) {
    hslSvg[i].onclick = function(e) {
      e.preventDefault();
      headerSubNavActive.forEach((n) => n.classList.remove("active"));
      headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
      headerSublinkActive.forEach((n) => n.classList.remove("active"));
      this.parentElement.classList.add("active");
      this.parentElement.parentElement.parentElement.parentElement.nextElementSibling.classList.add("active");
      let index = this.parentElement.parentElement ? [...this.parentElement.parentElement.parentNode.children].indexOf(this.parentElement.parentElement) : -1;
      this.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[1].children[0].children[index].classList.add("active");
      overlay.classList.add("active");
      document.documentElement.classList.add("noscroll");
      scroll.stop();
    };
  }

  const headerNavLeftScroll = document.querySelectorAll('.header__nav_left .header__nav_scroll');
  [...headerNavLeftScroll].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
  const headerNavList = document.querySelectorAll('.header__nav_list');
  [...headerNavList].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
  const headerSubSubNav = document.querySelectorAll('.header__subsubnav');
  [...headerSubSubNav].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}
// end header__popup

// button overlay
headerClose.addEventListener('click', function() {
  headerPopupActive.forEach((n) => n.classList.remove("active"));
  headerNavLinkActive.forEach((n) => n.classList.remove("active"));
  headerSubNavActive.forEach((n) => n.classList.remove("active"));
  headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
  headerSublinkActive.forEach((n) => n.classList.remove("active"));
  overlay.classList.remove("active");
  menu.classList.remove("active");
  burger.classList.remove("active");
  header.classList.remove("active");
  headerClose.classList.remove("active");
  scroll.start();
})
overlay.addEventListener('click', function() {
  headerPopupActive.forEach((n) => n.classList.remove("active"));
  headerNavLinkActive.forEach((n) => n.classList.remove("active"));
  headerSubNavActive.forEach((n) => n.classList.remove("active"));
  headerSubSubNavActive.forEach((n) => n.classList.remove("active"));
  headerSublinkActive.forEach((n) => n.classList.remove("active"));
  overlay.classList.remove("active");
  menu.classList.remove("active");
  burger.classList.remove("active");
  header.classList.remove("active");
  headerClose.classList.remove("active");
  scroll.start();
})
// end overlay

// start hero___swiper
const heroSlider = document.querySelector('.hero___swiper');
if(heroSlider){
  var heroSwiper = new Swiper('.hero___swiper', {
    loop: true,
    effect: "fade",
    slidesPerView: 1,
    loopedSlides: 1,
    spaceBetween: 20,
    speed: 300,
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false
    // },
    pagination: {
      el: '.hero__pagination',
      type: 'bullets',
      renderBullet: function (index, className) {
        if((index + 1) >= 10) {
          var herocountzero = '';
        } else {
          var herocountzero = '0';
        }
        return '<span class="' + className + '">' + '<span class="count">' + herocountzero + (index + 1) + "</span>" + "</span>";
      },
      clickable: true,
    },
    navigation: {
      nextEl: ".hero__next",
      prevEl: ".hero__prev"
    },
    on: {
      slideChange: function (swiper) {
        const count = document.querySelector('.hero__pagination .swiper-pagination-bullet-active .count');
        if (count) {
          const herocount = document.querySelector('.hero__count');
          herocount.innerHTML = count.innerHTML;
        }
      }
    }
  });
  if(document.querySelector('.hero___wrapper').children.length >= 10) {
    var herototalzero = '';
  } else {
    var herototalzero = '0';
  }
  if(document.querySelector('.hero__total')) {
  document.querySelector('.hero__total').innerHTML = herototalzero + document.querySelector('.hero___wrapper').children.length;
  }
}
// end hero___swiper

// start products_slider
if (document.querySelector(".products_slider__swiper")) {
  document.querySelectorAll(".products_slider__swiper").forEach((n) => {
    const slider = new Swiper(n.querySelector(".products_slider__container"), {
      loop: false,
      slidesPerView: 1.1,
      speed: 500,
      spaceBetween: 20,
      navigation: {
        nextEl: n.querySelector(".products_slider__next"),
        prevEl: n.querySelector(".products_slider__prev"),
      },
      pagination: {
        el: n.querySelector(".products__pagination"),
        type: 'bullets',
        renderBullet: function (index, className) {
          if((index + 1) >= 10) {
            var productscountzero = '';
          } else {
            var productscountzero = '0';
          }
          return '<span class="' + className + '">' + '<span class="count">' + productscountzero + (index + 1) + "</span>" + "</span>";
        },
        clickable: true,
      },
      breakpoints: {
        1280: {
          slidesPerView: 4,
        },
        768:{
          slidesPerView: 2,
        },
      },
      on: {
        slideChange: function (swiper) {
          const count = n.querySelector('.products__pagination .swiper-pagination-bullet-active .count');
          if (count) {
            const herocount = n.querySelector('.products__count');
            herocount.innerHTML = count.innerHTML;
          }
        }
      }
    });
    
  if(n.querySelector('.products_slider__list').children.length >= 10) {
    var productscountzero  = '';
  } else {
    var productscountzero  = '0';
  }
  n.querySelector('.products__total').innerHTML = productscountzero  + n.querySelector('.products_slider__list').children.length;
  });
  
}
// end products_slider

// start history___swiper
const historySlider = document.querySelector('.history___swiper');
const historyActive = document.querySelectorAll(".history__rotate .history__information");
if(historySlider){
  var historySwiper = new Swiper('.history___swiper', {
    loop: true,
    effect: "fade",
    slidesPerView: 1,
    loopedSlides: 1,
    spaceBetween: 20,
    a11y: false,
    speed: 300,
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false
    // },
    pagination: {
      el: '.history__pagination',
      type: 'bullets',
      renderBullet: function (index, className) {
        if((index + 1) >= 10) {
          var historycountzero = '';
        } else {
          var historycountzero = '0';
        }
        return '<span class="' + className + '" index="' + (index + 1) + '">' + '<span class="count">' + historycountzero + (index + 1) + "</span>" + "</span>";
      },
      clickable: true,
    },
    navigation: {
      nextEl: ".history__next",
      prevEl: ".history__prev"
    },
    on: {
      slideChange: function (swiper) {
        const count = document.querySelector('.history__pagination .swiper-pagination-bullet-active .count');
        if (count) {
          const historycount = document.querySelector('.history__count');
          historycount.innerHTML = count.innerHTML;
        }

        let index = document.querySelector('.history__pagination .swiper-pagination-bullet-active').getAttribute('index');
        historyActive.forEach((n) => n.classList.remove("active"));
        document.querySelector(".history__rotate").children[index-1].classList.add("active");
        const total = document.querySelector('.history__rotate').children.length;
        const rotate = 360 / total;
        let information = document.querySelectorAll(".history__information");
        let rotateNext = (index-1)*rotate;
        document.querySelector('.history__rotate').style.transform = 'rotate(' + (360 - rotateNext) + 'deg)';
        for (let i = 0; i < information.length; i++) {
          information[i].children[0].style.transform = 'rotate(' + (0 - (((i+1)*rotate)-rotateNext)) + 'deg)';
        }
        document.querySelector(".history__text_mobile").innerText = document.querySelector(".history__information.active").children[0].children[0].children[0].children[0].innerText;
        document.querySelector(".history__heading_mobile").innerText = document.querySelector(".history__information.active").children[0].children[1].innerText;

        let startTime = 0.0;
        let numberFrom = 0;
        let numberTo = 0;
        let date = document.querySelector(".history__date");
        let animEvent = null;
        function animateText() {
          let now = Date.now();
          if (now < startTime+500) {
            let lapsedTimeNorm = (now-startTime)/500;
            let interval = numberTo-numberFrom;
            date.innerText = Math.round(numberFrom + interval* lapsedTimeNorm);
            animEvent = window.requestAnimationFrame(animateText);
          } else {
            date.innerText = numberTo;
            animEvent = null;
          }
        }
        function initAnimation(to) {
          startTime = Date.now();
          numberFrom = parseInt(date.innerText);
          numberTo = to;
          if (animEvent==null) {
            animEvent = window.requestAnimationFrame(animateText);
          }
        }
        initAnimation(document.querySelector(".history__rotate").children[index-1].getAttribute('historydate'));
      }
    }
  });
  if(document.querySelector('.history___wrapper').children.length >= 10) {
    var historytotalzero = '';
  } else {
    var historytotalzero = '0';
  }

  document.querySelector('.history__total').innerHTML = historytotalzero + document.querySelector('.history___wrapper').children.length;
  document.querySelector('.history__rotate').style.transform = 'rotate(' + 360  + 'deg)';

  const historycounter = document.querySelectorAll('.history__rotate');
  [...historycounter].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){
    elem.children[0].children[0].children[0].children[0].innerHTML = index+1;
    elem.children[0].children[0].setAttribute("index", index);
  }});
  
  document.querySelector('.history__rotate').style.height = document.querySelector('.history__rotate').clientWidth + 'px';
  document.querySelector('.history__rotate').children[0].classList.add('active');
  const historyTotal = document.querySelector('.history__rotate').children.length;
  const historyRotate = 360 / historyTotal;
  let historyInformation = document.querySelectorAll(".history__information");
  for (let i = 0; i < historyInformation.length; i++) {
    historyInformation[i].style.transform = 'rotate(' + ((i+1)*historyRotate) + 'deg)';
    historyInformation[i].children[0].style.transform = 'rotate(' + '-' + ((i+1)*historyRotate) + 'deg)';
  }
  document.querySelector(".history__date").innerText = document.querySelector(".history__rotate").children[0].getAttribute('historydate');
  document.querySelector(".history__text_mobile").innerText = document.querySelector(".history__information.active").children[0].children[0].children[0].children[0].innerText;
  document.querySelector(".history__heading_mobile").innerText = document.querySelector(".history__information.active").children[0].children[1].innerText;
  const historyButton = document.getElementsByClassName("history__button");
  for (i = 0; i < historyButton.length; i++) {
    historyButton[i].onclick = function(e) {
      historySwiper.slideToLoop(this.getAttribute('index'), 0);
    }
  }
}
// end history___swiper

// start partner__list
const partnerlist = document.querySelector('.partner__list');
if(partnerlist){
  const partnerlists = document.querySelectorAll('.partner__list');
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelectorAll(".partner__item").length <= 1) {
      [...document.querySelectorAll('.partner__block')].map((n, i) => {
        let l = partnerlists[i].innerHTML;
        n.querySelector('.partner__list').innerHTML = l + l + l + l + l + l + l + l + l + l + l + l + l + l + l + l + l + l
      })
    } else if (document.querySelectorAll(".partner__item").length <= 2) {
      [...document.querySelectorAll('.partner__block')].map((n, i) => {
        let l = partnerlists[i].innerHTML;
        n.querySelector('.partner__list').innerHTML = l + l + l + l + l + l + l + l + l
      })
    } else if (document.querySelectorAll(".partner__item").length <= 3) {
      [...document.querySelectorAll('.partner__block')].map((n, i) => {
        let l = partnerlists[i].innerHTML;
        n.querySelector('.partner__list').innerHTML = l + l + l + l + l + l
      })
    } else if (document.querySelectorAll(".partner__item").length <= 6) {
      [...document.querySelectorAll('.partner__block')].map((n, i) => {
        let l = partnerlists[i].innerHTML;
        n.querySelector('.partner__list').innerHTML = l + l + l + l + l + l
      })
    } else if (document.querySelectorAll(".partner__item").length <= 11) {
      [...document.querySelectorAll('.partner__block')].map((n, i) => {
        let l = partnerlists[i].innerHTML;
        n.querySelector('.partner__list').innerHTML = l + l + l + l
      })
    } else if (document.querySelectorAll(".partner__item").length <= 17) {
      [...document.querySelectorAll('.partner__block')].map((n, i) => {
        let l = partnerlists[i].innerHTML;
        n.querySelector('.partner__list').innerHTML = l + l
      })
    }
  });
}
// end partner__list

// start canwedo__information
const canwedoButton = document.querySelector('.canwedo__button');
const canwedoButtonActive = document.querySelectorAll(".canwedo__buttons .canwedo__button");
const canwedoButtonOne = document.querySelector('.canwedo__button_one');
const canwedoButtonTwo = document.querySelector('.canwedo__button_two');
const canwedoButtonThree = document.querySelector('.canwedo__button_three');
const canwedoButtonFour = document.querySelector('.canwedo__button_four');

const canwedoinformationActive = document.querySelectorAll(".canwedo__informations .canwedo__information");
const canwedoinformationOne = document.querySelector('.canwedo__information_one');
const canwedoinformationTwo = document.querySelector('.canwedo__information_two');
const canwedoinformationThree = document.querySelector('.canwedo__information_three');
const canwedoinformationFour = document.querySelector('.canwedo__information_four');

if (canwedoButtonOne && canwedoButtonTwo && canwedoButtonThree) {
  canwedoButtonOne.addEventListener('click', function() {
    if (!canwedoButtonOne.classList.contains("active")) {
      canwedoButtonActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationOne.classList.add("active");
      canwedoButtonOne.classList.add("active");
    }
  })
  
  canwedoButtonTwo.addEventListener('click', function() {
    if (!canwedoButtonTwo.classList.contains("active")) {
      canwedoButtonActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationTwo.classList.add("active");
      canwedoButtonTwo.classList.add("active");
    }
  })
  
  canwedoButtonThree.addEventListener('click', function() {
    if (!canwedoButtonThree.classList.contains("active")) {
      canwedoButtonActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationThree.classList.add("active");
      canwedoButtonThree.classList.add("active");
    }
  })
  
  canwedoButtonFour.addEventListener('click', function() {
    if (!canwedoButtonFour.classList.contains("active")) {
      canwedoButtonActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationActive.forEach((n) => n.classList.remove("active"));
      canwedoinformationFour.classList.add("active");
      canwedoButtonFour.classList.add("active");
    }
  })
}
// end canwedo__information

// start terminals__information
const terminalsButton = document.querySelector('.terminals__button');
const terminalsButtonActive = document.querySelectorAll(".terminals__buttons .terminals__button");
const terminalsButtonOne = document.querySelector('.terminals__button_one');
const terminalsButtonTwo = document.querySelector('.terminals__button_two');
const terminalsButtonThree = document.querySelector('.terminals__button_three');
const terminalsButtonFour = document.querySelector('.terminals__button_four');
const terminalsButtonFive = document.querySelector('.terminals__button_five');

const terminalsinformationActive = document.querySelectorAll(".terminals__informations .terminals__information");
const terminalsinformationOne = document.querySelector('.terminals__information_one');
const terminalsinformationTwo = document.querySelector('.terminals__information_two');
const terminalsinformationThree = document.querySelector('.terminals__information_three');
const terminalsinformationFour = document.querySelector('.terminals__information_four');
const terminalsinformationFive = document.querySelector('.terminals__information_five');

if (terminalsButtonOne && terminalsButtonTwo && terminalsButtonThree) {
  console.log('kkk')
  terminalsButtonOne.addEventListener('click', function() {
    
    if (!terminalsButtonOne.classList.contains("active")) {
      terminalsButtonActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationOne.classList.add("active");
      terminalsButtonOne.classList.add("active");
    }
  })
  
  terminalsButtonTwo.addEventListener('click', function() {
    if (!terminalsButtonTwo.classList.contains("active")) {
      terminalsButtonActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationTwo.classList.add("active");
      terminalsButtonTwo.classList.add("active");
    }
  })
  
  terminalsButtonThree.addEventListener('click', function() {
    if (!terminalsButtonThree.classList.contains("active")) {
      terminalsButtonActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationThree.classList.add("active");
      terminalsButtonThree.classList.add("active");
    }
  })
  
  terminalsButtonFour.addEventListener('click', function() {
    if (!terminalsButtonFour.classList.contains("active")) {
      terminalsButtonActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationFour.classList.add("active");
      terminalsButtonFour.classList.add("active");
    }
  })

  terminalsButtonFive.addEventListener('click', function() {
    if (!terminalsButtonFive.classList.contains("active")) {
      terminalsButtonActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationActive.forEach((n) => n.classList.remove("active"));
      terminalsinformationFour.classList.add("active");
      terminalsButtonFive.classList.add("active");
    }
  })
}
// end terminals__information