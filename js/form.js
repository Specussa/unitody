var i;

const finputs = document.querySelectorAll(".form__input");
for (i = 0; i < finputs.length; i++) {
  finputs[i].addEventListener("input", updateformValue);
}

function updateformValue() {
  this.nextElementSibling.children[0].textContent = Math.max(0, Math.min(this.getAttribute('maxl'), this.value.length));
  if (this.value.length < this.getAttribute('minl')) {
    this.parentElement.classList.add('error');
    this.parentElement.classList.remove('success');
    this.nextElementSibling.classList.remove('success');
  } else {
    this.parentElement.classList.remove('error');
    this.parentElement.classList.add('success');
    this.nextElementSibling.classList.add('success');
  }
}

function isFormEmailValid(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function setErrorFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form__control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form__control success';
}

// start mask phone
const phone_input = document.querySelector('[data-phone-pattern]');
if (phone_input) {
  document.addEventListener("DOMContentLoaded", function () {
    var eventCalllback = function (e) {
      var el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7(___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
      if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
          e.target.value = '';
          this.parentElement.classList.add('error');
          this.parentElement.classList.remove('success');
          this.nextElementSibling.classList.remove('success');
          return;
        }
      }
      if (def.length >= val.length) val = def;
      e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });
    }
    var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
      for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
      }
    }
  });
}
// end mask phone

// start form__button_pass
var fbp = document.getElementsByClassName("form__button_pass");
for (i = 0; i < fbp.length; i++) {
  fbp[i].onclick = function(e) {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      this.parentElement.children[0].setAttribute('type', 'password');
    } else {
      this.classList.add("active");
      this.parentElement.children[0].setAttribute('type', 'text');
    }
  };
}
// end form__button_pass

// start faq form and sending_popup
const faqform = document.getElementById('faq__form');

if(faqform) {
  const faqname = document.getElementById('faq__name');
  const faqemail = document.getElementById('faq__email');
  const faqphone = document.getElementById('faq__phone');
  const faqmessage = document.getElementById('faq__message');
  const faqcheckbox = document.getElementById('faq__checkbox');
  const sendingpopup = document.querySelector('.sending_popup');
  const sendingpopupOverlay = document.querySelector('.sending_popup__overlay');
  const faqnameMin = faqname.getAttribute('minl');
  const faqnameMax = faqname.getAttribute('maxl');
  const faqemailMin = faqemail.getAttribute('minl');
  const faqemailMax = faqemail.getAttribute('maxl');
  const faqphoneMin = faqphone.getAttribute('minl');
  const faqphoneMax = faqphone.getAttribute('maxl');
  const faqmessageMin = faqmessage.getAttribute('minl');
  const faqmessageMax = faqmessage.getAttribute('maxl');

  faqname.oninput = function(){
    this.value = this.value.substr(0, faqnameMax);
    this.value = this.value.replace(/[0-9]/g, '');
    this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
  }
  faqemail.oninput = function(){
    this.value = this.value.substr(0, faqemailMax);
    this.value = this.value.replace(/[а-яА-ЯёЁ]$/g, '');
    this.value = this.value.replace(/[()!?•—:,'";№\-_=« »<>%#~`&\/\$\^\*\+\\\{\}\[\]\(\|]$/g, '');
  }
  faqphone.oninput = function(){
    this.value = this.value.substr(0, faqphoneMax);
  }
  faqmessage.oninput = function(){
    this.value = this.value.substr(0, faqmessageMax);
    this.value = this.value.replace(/[()!?•—@'";№_=«»<>%#~`&\/\$\^\\*\+\\\{\}\[\]\(\|]$/g, '');
  }

  faqemail.addEventListener('input', function () {
    const emailValid = faqemail.value.trim();
    if (this.value.length < this.getAttribute('minl')) {
      this.parentElement.classList.add('error');
      this.parentElement.classList.remove('success');
      this.nextElementSibling.classList.remove('success');
    } else if (!isFormEmailValid(emailValid)) {
      this.parentElement.classList.add('error');
      this.parentElement.classList.remove('success');
      this.nextElementSibling.classList.remove('success');
    } else {
      this.parentElement.classList.remove('error');
      this.parentElement.classList.add('success');
      this.nextElementSibling.classList.add('success');
    }
  })

  faqform.addEventListener('submit', e => {
    e.preventDefault();
    checkfaqformInputs();
  });
  function checkfaqformInputs() {
    const faqnameValue = faqname.value.trim();
    const faqemailValue = faqemail.value.trim();
    const faqphoneValue = faqphone.value.trim();
    const faqmessageValue = faqmessage.value.trim();
    
    if(faqnameValue !== '' && faqnameValue.length >= faqnameMin && faqnameValue.length <= faqnameMax) {
      setSuccessFor(faqname);
    } else {
      setErrorFor(faqname);
    }
    if(!isFormEmailValid(faqemailValue)) {
      setErrorFor(faqemail);
    } else if (faqemailValue !== '' && faqemailValue.length >= faqemailMin && faqemailValue.length <= faqemailMax) {
      setSuccessFor(faqemail);
    } else {
      setErrorFor(faqemail);
    }
    if(faqphoneValue !== '' && faqphoneValue.length >= faqphoneMin && faqphoneValue.length <= faqphoneMax) {
      setSuccessFor(faqphone);
    } else {
      setErrorFor(faqphone);
    }
    if(
    faqmessageValue !== '' && faqmessageValue.length >= faqmessageMin && faqmessageValue.length <= faqmessageMax) {
      setSuccessFor(faqmessage);
    } else {
      setErrorFor(faqmessage);
    }
    if(faqcheckbox.checked) {
      faqcheckbox.nextElementSibling.classList.remove('error');
    } else {
      faqcheckbox.nextElementSibling.classList.add('error');
    }
    
    if(!isFormEmailValid(faqemailValue)) {
      setErrorFor(faqemail);
    } else if(
    faqnameValue !== '' && faqnameValue.length >= faqnameMin && faqnameValue.length <= faqnameMax && 
    faqemailValue !== '' && faqemailValue.length >= faqemailMin && faqemailValue.length <= faqemailMax && 
    faqphoneValue !== '' && faqphoneValue.length >= faqphoneMin && faqphoneValue.length <= faqphoneMax && 
    faqmessageValue !== '' && faqmessageValue.length >= faqmessageMin && faqmessageValue.length <= faqmessageMax && 
    faqcheckbox.checked) {
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          faqnameValue: faqnameValue,
          faqemailValue: faqemailValue,
          faqphoneValue: faqphoneValue,
          faqmessageValue: faqmessageValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
      .then(() => {
        faqname.value = '';
        faqemail.value = '';
        faqphone.value = '';
        faqmessage.value = '';
        faqcheckbox.checked = false;
        sendingpopup.classList.add('active');
        sendingpopupOverlay.classList.add('active');
        document.documentElement.classList.add("noscroll");
        scroll.stop();
      })
    }
  }
  if (sendingpopup) {
    sendingpopupOverlay.addEventListener('click', e => {
      sendingpopup.classList.remove('active');
      sendingpopupOverlay.classList.remove('active');
      document.documentElement.classList.remove("noscroll");
      scroll.start();
    });
    document.querySelector('.sending_popup__close').addEventListener('click', e => {
      sendingpopup.classList.remove('active');
      sendingpopupOverlay.classList.remove('active');
      document.documentElement.classList.remove("noscroll");
      scroll.start();
    });
    document.getElementById('btnClose').addEventListener('click', e => {
      sendingpopup.classList.remove('active');
      sendingpopupOverlay.classList.remove('active');
      document.documentElement.classList.remove("noscroll");
      scroll.start();
    });
  }
}

// end validate faqform