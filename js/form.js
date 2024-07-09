var i;

function updateformValue() {
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

// start validate form
const personalform = document.getElementById('personal__form');

if(personalform) {
  const fpsuccess = document.querySelector(".personal__form .form__pop_success");
  const fperror = document.querySelector(".personal__form .form__pop_error");
  const plastname = document.getElementById('personal__lastname');
  const pfirstname = document.getElementById('personal__firstname');
  const psurname = document.getElementById('personal__surname');
  const pdateofbirth = document.getElementById('personal__dateofbirth');
  const pemail = document.getElementById('personal__email');
  const pphone = document.getElementById('personal__phone');
  const paddress = document.getElementById('personal__address');
  const plastnameMin = plastname.getAttribute('minl');
  const plastnameMax = plastname.getAttribute('maxl');
  const pfirstnameMin = pfirstname.getAttribute('minl');
  const pfirstnameMax = pfirstname.getAttribute('maxl');
  const psurnameMin = psurname.getAttribute('minl');
  const psurnameMax = psurname.getAttribute('maxl');
  const pdateofbirthMin = pdateofbirth.getAttribute('minl');
  const pdateofbirthMax = pdateofbirth.getAttribute('maxl');
  const pemailMin = pemail.getAttribute('minl');
  const pemailMax = pemail.getAttribute('maxl');
  const pphoneMin = pphone.getAttribute('minl');
  const pphoneMax = pphone.getAttribute('maxl');
  const paddressMin = paddress.getAttribute('minl');
  const paddressMax = paddress.getAttribute('maxl');
  plastname.oninput = function(){
    this.value = this.value.substr(0, plastnameMax);
    this.value = this.value.replace(/[0-9]/g, '');
    this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  pfirstname.oninput = function(){
    this.value = this.value.substr(0, pfirstnameMax);
    this.value = this.value.replace(/[0-9]/g, '');
    this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  psurname.oninput = function(){
    this.value = this.value.substr(0, psurnameMax);
    this.value = this.value.replace(/[0-9]/g, '');
    this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  pdateofbirth.oninput = function(){
    this.value = this.value.substr(0, pdateofbirthMax);
    if(!/^\d{4}\-\d{2}\-\d{2}$/.test(pdateofbirth.value.trim())) {
      setErrorFor(pdateofbirth);
    } else if (pdateofbirth.value.trim().split("-", 1) < (new Date().getFullYear() - 1) && pdateofbirth.value.trim().split("-", 1) > (new Date().getFullYear() - 99) && pdateofbirth.value.trim() !== '' && pdateofbirth.value.trim().length >= pdateofbirthMin && pdateofbirth.value.trim().length <= pdateofbirthMax) {
      setSuccessFor(pdateofbirth);
    } else {
      setErrorFor(pdateofbirth);
    }
  }
  pemail.oninput = function(){
    this.value = this.value.substr(0, pemailMax);
    this.value = this.value.replace(/[а-яА-ЯёЁ]$/g, '');
    this.value = this.value.replace(/[()!?•—:,'";№\-_=« »<>%#~`&\/\$\^\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  pphone.oninput = function(){
    this.value = this.value.substr(0, pphoneMax);
  }
  paddress.oninput = function(){
    this.value = this.value.substr(0, paddressMax);
    this.value = this.value.replace(/[()!?•—@'";№_=«»<>%#~`&\/\$\^\\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }

  pemail.addEventListener('input', function () {
    const emailValid = pemail.value.trim();
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

  personalform.addEventListener('submit', e => {
    e.preventDefault();
    checkpersonalformInputs();
  });
  function checkpersonalformInputs() {
    const plastnameValue = plastname.value.trim();
    const pfirstnameValue = pfirstname.value.trim();
    const psurnameValue = psurname.value.trim();
    const pdateofbirthValue = pdateofbirth.value.trim();
    const pemailValue = pemail.value.trim();
    const pphoneValue = pphone.value.trim();
    const paddressValue = paddress.value.trim();
    
    if(plastnameValue !== '' && plastnameValue.length >= plastnameMin && plastnameValue.length <= plastnameMax) {
      setSuccessFor(plastname);
    } else {
      setErrorFor(plastname);
    }
    if(pfirstnameValue !== '' && pfirstnameValue.length >= pfirstnameMin && pfirstnameValue.length <= pfirstnameMax) {
      setSuccessFor(pfirstname);
    } else {
      setErrorFor(pfirstname);
    }
    if(psurnameValue !== '' && psurnameValue.length >= psurnameMin && psurnameValue.length <= psurnameMax) {
      setSuccessFor(psurname);
    } else {
      setErrorFor(psurname);
    }
    if(!/^\d{4}\-\d{2}\-\d{2}$/.test(pdateofbirthValue)) {
      setErrorFor(pdateofbirth);
    } else if (pdateofbirthValue.split("-", 1) < (new Date().getFullYear() - 1) && pdateofbirthValue.split("-", 1) > (new Date().getFullYear() - 99) && pdateofbirthValue !== '' && pdateofbirthValue.length >= pdateofbirthMin && pdateofbirthValue.length <= pdateofbirthMax) {
      setSuccessFor(pdateofbirth);
    } else {
      setErrorFor(pdateofbirth);
    }
    if(!isFormEmailValid(pemailValue)) {
      setErrorFor(pemail);
    } else if (pemailValue !== '' && pemailValue.length >= pemailMin && pemailValue.length <= pemailMax) {
      setSuccessFor(pemail);
    } else {
      setErrorFor(pemail);
    }
    if(pphoneValue !== '' && pphoneValue.length >= pphoneMin && pphoneValue.length <= pphoneMax) {
      setSuccessFor(pphone);
    } else {
      setErrorFor(pphone);
    }
    if(
    // paddressValue !== '' && paddressValue.length >= paddressMin && 
    paddressValue.length <= paddressMax) {
      setSuccessFor(paddress);
    } else {
      setErrorFor(paddress);
    }
    
    if(!isFormEmailValid(pemailValue)) {
      setErrorFor(pemail);
    } else if(!/^\d{4}\-\d{2}\-\d{2}$/.test(pdateofbirthValue)) {
      setErrorFor(pdateofbirth);
    } else if(
    plastnameValue !== '' && plastnameValue.length >= plastnameMin && plastnameValue.length <= plastnameMax && 
    pfirstnameValue !== '' && pfirstnameValue.length >= pfirstnameMin && pfirstnameValue.length <= pfirstnameMax && 
    psurnameValue !== '' && psurnameValue.length >= psurnameMin && psurnameValue.length <= psurnameMax && 
    pdateofbirthValue.split("-", 1) < (new Date().getFullYear() - 1) && pdateofbirthValue.split("-", 1) > (new Date().getFullYear() - 99) && pdateofbirthValue !== '' && pdateofbirthValue.length >= pdateofbirthMin && pdateofbirthValue.length <= pdateofbirthMax && 
    pemailValue !== '' && pemailValue.length >= pemailMin && pemailValue.length <= pemailMax && 
    pphoneValue !== '' && pphoneValue.length >= pphoneMin && pphoneValue.length <= pphoneMax && 
    // paddressValue !== '' && paddressValue.length >= paddressMin && 
    paddressValue.length <= paddressMax) {
      fperror.classList.add('active');
      fpsuccess.classList.add('active');
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          plastnameValue: plastnameValue,
          pfirstnameValue: pfirstnameValue,
          psurnameValue: psurnameValue,
          pdateofbirthValue: pdateofbirthValue,
          pemailValue: pemailValue,
          pphoneValue: pphoneValue,
          paddressValue: paddressValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate personalform

// start validate personalpass
const personalpass = document.getElementById('personal__pass');

if(personalpass) {
  const fpsuccess = document.querySelector(".personal__pass .form__pop_success");
  const fperror = document.querySelector(".personal__pass .form__pop_error");
  const poldpass = document.getElementById('personal__oldpass');
  const pnewpass = document.getElementById('personal__newpass');
  const prepeatpass = document.getElementById('personal__repeatpass');
  const poldpassMin = poldpass.getAttribute('minl');
  const poldpassMax = poldpass.getAttribute('maxl');
  const pnewpassMin = pnewpass.getAttribute('minl');
  const pnewpassMax = pnewpass.getAttribute('maxl');
  const prepeatpassMin = prepeatpass.getAttribute('minl');
  const prepeatpassMax = prepeatpass.getAttribute('maxl');

  poldpass.oninput = function(){
    this.value = this.value.substr(0, poldpassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  pnewpass.oninput = function(){
    this.value = this.value.substr(0, pnewpassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  prepeatpass.oninput = function(){
    this.value = this.value.substr(0, prepeatpassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }

  personalpass.addEventListener('submit', e => {
    e.preventDefault();
    checkpersonalpassInputs();
  });
  function checkpersonalpassInputs() {
    const poldpassValue = poldpass.value.trim();
    const pnewpassValue = pnewpass.value.trim();
    const prepeatpassValue = prepeatpass.value.trim();
    
    if(poldpassValue !== '' && poldpassValue.length >= poldpassMin && poldpassValue.length <= poldpassMax) {
      setSuccessFor(poldpass);
    } else {
      setErrorFor(poldpass);
    }
    if(pnewpassValue !== '' && pnewpassValue.length >= pnewpassMin && pnewpassValue.length <= pnewpassMax) {
      setSuccessFor(pnewpass);
    } else {
      setErrorFor(pnewpass);
    }
    if(prepeatpassValue !== '' && prepeatpassValue.length >= prepeatpassMin && prepeatpassValue.length <= prepeatpassMax && pnewpassValue === prepeatpassValue) {
      setSuccessFor(prepeatpass);
    } else {
      setErrorFor(prepeatpass);
    }
    
    if(
    poldpassValue !== '' && poldpassValue.length >= poldpassMin && poldpassValue.length <= poldpassMax && 
    pnewpassValue !== '' && pnewpassValue.length >= pnewpassMin && pnewpassValue.length <= pnewpassMax && 
    prepeatpassValue !== '' && prepeatpassValue.length >= prepeatpassMin && prepeatpassValue.length <= prepeatpassMax && pnewpassValue === prepeatpassValue) {
      fperror.classList.add('active');
      fpsuccess.classList.add('active');
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          poldpassValue: poldpassValue,
          pnewpassValue: pnewpassValue,
          prepeatpassValue: prepeatpassValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate personalpass

// start validate auth__form
const authform = document.getElementById('auth__form');

if(authform) {
  const fpsuccess = document.querySelector(".auth__form .form__pop_success");
  const fperror = document.querySelector(".auth__form .form__pop_error");
  const aemail = document.getElementById('auth__email');
  const apass = document.getElementById('auth__pass');
  const aemailMin = aemail.getAttribute('minl');
  const apassMin = apass.getAttribute('minl');
  const apassMax = apass.getAttribute('maxl');
  const aemailMax = aemail.getAttribute('maxl');

  aemail.oninput = function(){
    this.value = this.value.substr(0, aemailMax);
    this.value = this.value.replace(/[а-яА-ЯёЁ]$/g, '');
    this.value = this.value.replace(/[()!?•—:,'";№\-_=« »<>%#~`&\/\$\^\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  apass.oninput = function(){
    this.value = this.value.substr(0, apassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }

  aemail.addEventListener('input', function () {
    const emailValid = aemail.value.trim();
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

  authform.addEventListener('submit', e => {
    e.preventDefault();
    checkauthformInputs();
  });
  function checkauthformInputs() {
    const apassValue = apass.value.trim();
    const aemailValue = aemail.value.trim();
    
    if(apassValue !== '' && apassValue.length >= apassMin && apassValue.length <= apassMax) {
      setSuccessFor(apass);
    } else {
      setErrorFor(apass);
    }
    if(!isFormEmailValid(aemailValue)) {
      setErrorFor(aemail);
    } else if (aemailValue !== '' && aemailValue.length >= aemailMin && aemailValue.length <= aemailMax) {
      setSuccessFor(aemail);
    } else {
      setErrorFor(aemail);
    }
    
    if(!isFormEmailValid(aemailValue)) {
      setErrorFor(aemail);
    } else if(
    apassValue !== '' && apassValue.length >= apassMin && apassValue.length <= apassMax && 
    aemailValue !== '' && aemailValue.length >= aemailMin && aemailValue.length <= aemailMax ) {
      // window.location.href = 'personal.html';
      fperror.classList.add('active');
      fpsuccess.classList.add('active');
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          aemailValue: aemailValue,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate auth__form

// start validate recovery__form
const recoveryform = document.getElementById('recovery__form');

if(recoveryform) {
  const fpsuccess = document.querySelector(".recovery__form .form__pop_success");
  const fperror = document.querySelector(".recovery__form .form__pop_error");
  const remail = document.getElementById('recovery__email');
  const remailMin = remail.getAttribute('minl');
  const remailMax = remail.getAttribute('maxl');
  remail.oninput = function(){
    this.value = this.value.substr(0, remailMax);
    this.value = this.value.replace(/[а-яА-ЯёЁ]$/g, '');
    this.value = this.value.replace(/[()!?•—:,'";№\-_=« »<>%#~`&\/\$\^\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }

  remail.addEventListener('input', function () {
    const emailValid = remail.value.trim();
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

  recoveryform.addEventListener('submit', e => {
    e.preventDefault();
    checkrecoveryformInputs();
  });
  function checkrecoveryformInputs() {
    const remailValue = remail.value.trim();
    
    if(!isFormEmailValid(remailValue)) {
      setErrorFor(remail);
    } else if (remailValue !== '' && remailValue.length >= remailMin && remailValue.length <= remailMax) {
      setSuccessFor(remail);
    } else {
      setErrorFor(remail);
    }
    
    if(!isFormEmailValid(remailValue)) {
      setErrorFor(remail);
    } else if(remailValue !== '' && remailValue.length >= remailMin && remailValue.length <= remailMax ) {
      fperror.classList.add('active');
      fpsuccess.classList.add('active');
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          remailValue: remailValue,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate recovery__form

// start validate change__form
const changeform = document.getElementById('change__form');

if(changeform) {
  const fpsuccess = document.querySelector(".change__form .form__pop_success");
  const fperror = document.querySelector(".change__form .form__pop_error");
  const cnewpass = document.getElementById('change__newpass');
  const crepeatpass = document.getElementById('change__repeatpass');
  const cnewpassMin = cnewpass.getAttribute('minl');
  const cnewpassMax = cnewpass.getAttribute('maxl');
  const crepeatpassMin = crepeatpass.getAttribute('minl');
  const crepeatpassMax = crepeatpass.getAttribute('maxl');

  cnewpass.oninput = function(){
    this.value = this.value.substr(0, cnewpassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  crepeatpass.oninput = function(){
    this.value = this.value.substr(0, crepeatpassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }

  changeform.addEventListener('submit', e => {
    e.preventDefault();
    checkchangeformInputs();
  });
  function checkchangeformInputs() {
    const cnewpassValue = cnewpass.value.trim();
    const crepeatpassValue = crepeatpass.value.trim();
    
    if(cnewpassValue !== '' && cnewpassValue.length >= cnewpassMin && cnewpassValue.length <= cnewpassMax) {
      setSuccessFor(cnewpass);
    } else {
      setErrorFor(cnewpass);
    }
    if(crepeatpassValue !== '' && crepeatpassValue.length >= crepeatpassMin && crepeatpassValue.length <= crepeatpassMax && cnewpassValue === crepeatpassValue) {
      setSuccessFor(crepeatpass);
    } else {
      setErrorFor(crepeatpass);
    }
    
    if(
    cnewpassValue !== '' && cnewpassValue.length >= cnewpassMin && cnewpassValue.length <= cnewpassMax && 
    crepeatpassValue !== '' && crepeatpassValue.length >= crepeatpassMin && crepeatpassValue.length <= crepeatpassMax && cnewpassValue === crepeatpassValue) {
      fperror.classList.add('active');
      fpsuccess.classList.add('active');
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          cnewpassValue: cnewpassValue,
          crepeatpassValue: crepeatpassValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate change__form

// start validate confirmation__form
const confirmationform = document.getElementById('confirmation__form');

if(confirmationform) {
  const fpsuccess = document.querySelector(".confirmation__form .form__pop_success");
  const fperror = document.querySelector(".confirmation__form .form__pop_error");
  const concode = document.getElementById('confirmation__code');
  const concodeMin = concode.getAttribute('minl');
  const concodeMax = concode.getAttribute('maxl');

  concode.oninput = function(){
    this.value = this.value.substr(0, concodeMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }

  confirmationform.addEventListener('submit', e => {
    e.preventDefault();
    checkconfirmationformInputs();
  });
  function checkconfirmationformInputs() {
    const concodeValue = concode.value.trim();
    
    if(concodeValue !== '' && concodeValue.length >= concodeMin && concodeValue.length <= concodeMax) {
      setSuccessFor(concode);
    } else {
      setErrorFor(concode);
    }
    
    if(
    concodeValue !== '' && concodeValue.length >= concodeMin && concodeValue.length <= concodeMax) {
      fperror.classList.add('active');
      fpsuccess.classList.add('active');
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          concodeValue: concodeValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate confirmation__form

// start validate form
const registrationform = document.getElementById('registration__form');

if(registrationform) {
  const fpsuccess = document.querySelector(".registration__form .form__pop_success");
  const fperror = document.querySelector(".registration__form .form__pop_error");
  const rlastname = document.getElementById('registration__lastname');
  const rfirstname = document.getElementById('registration__firstname');
  const rsurname = document.getElementById('registration__surname');
  const remail = document.getElementById('registration__email');
  const rpass = document.getElementById('registration__pass');
  const rrepeatpass = document.getElementById('registration__repeatpass');
  const registrationcheckbox = document.getElementById('registration__checkbox');
  const rlastnameMin = rlastname.getAttribute('minl');
  const rlastnameMax = rlastname.getAttribute('maxl');
  const rfirstnameMin = rfirstname.getAttribute('minl');
  const rfirstnameMax = rfirstname.getAttribute('maxl');
  const rsurnameMin = rsurname.getAttribute('minl');
  const rsurnameMax = rsurname.getAttribute('maxl');
  const remailMin = remail.getAttribute('minl');
  const remailMax = remail.getAttribute('maxl');
  const rpassMin = rpass.getAttribute('minl');
  const rpassMax = rpass.getAttribute('maxl');
  const rrepeatpassMin = rrepeatpass.getAttribute('minl');
  const rrepeatpassMax = rrepeatpass.getAttribute('maxl');
  rlastname.oninput = function(){
    this.value = this.value.substr(0, rlastnameMax);
    this.value = this.value.replace(/[0-9]/g, '');
    this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  rfirstname.oninput = function(){
    this.value = this.value.substr(0, rfirstnameMax);
    this.value = this.value.replace(/[0-9]/g, '');
    this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  rsurname.oninput = function(){
    this.value = this.value.substr(0, rsurnameMax);
    this.value = this.value.replace(/[0-9]/g, '');
    this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  remail.oninput = function(){
    this.value = this.value.substr(0, remailMax);
    this.value = this.value.replace(/[а-яА-ЯёЁ]$/g, '');
    this.value = this.value.replace(/[()!?•—:,'";№\-_=« »<>%#~`&\/\$\^\*\+\\\{\}\[\]\(\|]$/g, '');
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  rpass.oninput = function(){
    this.value = this.value.substr(0, rpassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }
  rrepeatpass.oninput = function(){
    this.value = this.value.substr(0, rrepeatpassMax);
    if(fpsuccess && fpsuccess.classList.contains("active")){fpsuccess.classList.remove('active')};
    if(fperror && fperror.classList.contains("active")){fperror.classList.remove('active')};
  }

  remail.addEventListener('input', function () {
    const emailValid = remail.value.trim();
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

  registrationform.addEventListener('submit', e => {
    e.preventDefault();
    checkregistrationformInputs();
  });
  function checkregistrationformInputs() {
    const rlastnameValue = rlastname.value.trim();
    const rfirstnameValue = rfirstname.value.trim();
    const rsurnameValue = rsurname.value.trim();
    const remailValue = remail.value.trim();
    const rpassValue = rpass.value.trim();
    const rrepeatpassValue = rrepeatpass.value.trim();
    
    if(rlastnameValue !== '' && rlastnameValue.length >= rlastnameMin && rlastnameValue.length <= rlastnameMax) {
      setSuccessFor(rlastname);
    } else {
      setErrorFor(rlastname);
    }
    if(rfirstnameValue !== '' && rfirstnameValue.length >= rfirstnameMin && rfirstnameValue.length <= rfirstnameMax) {
      setSuccessFor(rfirstname);
    } else {
      setErrorFor(rfirstname);
    }
    if(rsurnameValue !== '' && rsurnameValue.length >= rsurnameMin && rsurnameValue.length <= rsurnameMax) {
      setSuccessFor(rsurname);
    } else {
      setErrorFor(rsurname);
    }
    if(!isFormEmailValid(remailValue)) {
      setErrorFor(remail);
    } else if (remailValue !== '' && remailValue.length >= remailMin && remailValue.length <= remailMax) {
      setSuccessFor(remail);
    } else {
      setErrorFor(remail);
    }
    if(rpassValue !== '' && rpassValue.length >= rpassMin && rpassValue.length <= rpassMax) {
      setSuccessFor(rpass);
    } else {
      setErrorFor(rpass);
    }
    if(rrepeatpassValue !== '' && rrepeatpassValue.length >= rrepeatpassMin && rrepeatpassValue.length <= rrepeatpassMax && rpassValue === rrepeatpassValue) {
      setSuccessFor(rrepeatpass);
    } else {
      setErrorFor(rrepeatpass);
    }
    if(registrationcheckbox.checked) {
      registrationcheckbox.nextElementSibling.classList.remove('error');
    } else {
      registrationcheckbox.nextElementSibling.classList.add('error');
    }
    
    if(!isFormEmailValid(remailValue)) {
      setErrorFor(remail);
    } else if(
    rlastnameValue !== '' && rlastnameValue.length >= rlastnameMin && rlastnameValue.length <= rlastnameMax && 
    rfirstnameValue !== '' && rfirstnameValue.length >= rfirstnameMin && rfirstnameValue.length <= rfirstnameMax && 
    rsurnameValue !== '' && rsurnameValue.length >= rsurnameMin && rsurnameValue.length <= rsurnameMax && 
    remailValue !== '' && remailValue.length >= remailMin && remailValue.length <= remailMax && 
    rpassValue !== '' && rpassValue.length >= rpassMin && rpassValue.length <= rpassMax && 
    rrepeatpassValue !== '' && rrepeatpassValue.length >= rrepeatpassMin && rrepeatpassValue.length <= rrepeatpassMax && rpassValue === rrepeatpassValue && 
    registrationcheckbox.checked) {
      fperror.classList.add('active');
      fpsuccess.classList.add('active');
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          rlastnameValue: rlastnameValue,
          rfirstnameValue: rfirstnameValue,
          rsurnameValue: rsurnameValue,
          remailValue: remailValue,
          rpassValue: rpassValue,
          rrepeatpassValue: rrepeatpassValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate registrationform