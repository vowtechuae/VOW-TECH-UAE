e.addEventListener('submit', function(event) {
  event.preventDefault();
  let thisForm = this;
  ...
});

e.addEventListener('submit', function(event) {
  event.preventDefault();

  let thisForm = this;

  // ===== WhatsApp Integration =====
  const name = encodeURIComponent(thisForm.name.value);
  const phone = encodeURIComponent(thisForm.phone.value);
  const date = encodeURIComponent(thisForm.date.value);
  const department = encodeURIComponent(thisForm.department.value);
  const consultant = encodeURIComponent(thisForm.consultant.value);
  const message = encodeURIComponent(thisForm.message.value);

  const whatsappNumber = "971581816887"; // your number without +
  const whatsappText = `New Appointment Request:\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nDepartment: ${department}\nConsultant: ${consultant}\nMessage: ${message}`;
  const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappText}`;
  window.open(whatsappURL, "_blank");
  // ===== End WhatsApp Integration =====

  let action = thisForm.getAttribute('action');
  let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
  
  if( ! action ) {
    displayError(thisForm, 'The form action property is not set!');
    return;
  }
  thisForm.querySelector('.loading').classList.add('d-block');
  thisForm.querySelector('.error-message').classList.remove('d-block');
  thisForm.querySelector('.sent-message').classList.remove('d-block');

  let formData = new FormData( thisForm );

  if ( recaptcha ) {
    if(typeof grecaptcha !== "undefined" ) {
      grecaptcha.ready(function() {
        try {
          grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
          .then(token => {
            formData.set('recaptcha-response', token);
            php_email_form_submit(thisForm, action, formData);
          })
        } catch(error) {
          displayError(thisForm, error);
        }
      });
    } else {
      displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
    }
  } else {
    php_email_form_submit(thisForm, action, formData);
  }
});
