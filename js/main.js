// start height
let oldWidth = window.innerWidth;
const docheight = document.documentElement;
const headert = document.querySelector('.header__transparent');
docheight.style.setProperty('--height', `${window.innerHeight}px`);
const appHeight = () => {
  var newWidth = window.innerWidth;
  if (newWidth != oldWidth) {
    docheight.style.setProperty('--height', `${window.innerHeight}px`);
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
  };

  document.onpointermove = (event) => {
    moveCursor(event);
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
const menu = document.querySelector('.header__nav');
const burger = document.querySelector('.header__burger');
const menuItemActive = document.getElementsByClassName("header__nav_item active");

// button header__burger
burger.addEventListener('click', function() {
  if (burger.classList.contains("active")) {
    overlay.classList.remove("active");
    menu.classList.remove("active");
    burger.classList.remove("active");
    header.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    // for (var i = 0; i < menuItemActive.length; i++) {
    //   menuItemActive[i].children[1].style.maxHeight = null;
    //   menuItemActive[i].children[1].classList.remove("active");
    //   menuItemActive[i].classList.remove("active");
    // }
    scroll.start();
  } else {
    overlay.classList.add("active");
    menu.classList.add("active");
    burger.classList.add("active");
    header.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    // for (var i = 0; i < menuItemActive.length; i++) {
    //   menuItemActive[i].children[1].style.maxHeight = null;
    //   menuItemActive[i].children[1].classList.remove("active");
    //   menuItemActive[i].classList.remove("active");
    // }
    header.classList.remove("hidden");
    scroll.stop();
  }
})
// end header__burger

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
  document.querySelector('.hero__total').innerHTML = herototalzero + document.querySelector('.hero___wrapper').children.length;
}
// end hero___swiper

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