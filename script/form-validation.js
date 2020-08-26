const form = document.getElementById('contact-form');
form.addEventListener('submit', validator);
const submitBtn = form.querySelector('button.form-btn');

let rules = {
	required: function(el) {
		if(el.type == "checkbox") {
				if(el.checked != false) {
					return true;
				} return false;
		} else if (el.value != '') {
			return true;
		}  else {
      console.log(el.value);
      return false;
    }
	},
	email: function(el){
		var reg = /^\w{1,20}\@\w{2,}\.\w{2,}$/;
		if(reg.test(el.value)){
			return true;
		} return false;
	},
	max: function(el) {
		if(el.value.length > 500){
		    return false;
		} else {
      return true;
    }
	},
  min: function(el) {
    if(el.value.length < 13) {
        return false;
    } else {
      return true;
    }
  }
}

function showErrors(arr) {
	for(let arrItem of arr) {
		let errInpname = arrItem.name;
		let errInp = document.getElementsByName(errInpname)[0];

		errInp.classList.add('error-input');

		let errMess = document.createElement('p');
		errMess.classList.add('error');

		switch(arrItem.error) {
		  case 'required':
		   errMess.textContent = 'The field is empty!';
		   break;
		  case 'email':
		   errMess.textContent = 'The e-mail you\'ve intered is of incorrect format.';
		    break;
		  case 'min':
		   errMess.textContent = 'The phone number you\'ve intered is of incorrect format.';
		    break;
      case 'town':
        errMess.textContent = 'Please select a town';
        break;
		   case 'max':
		   	errMess.innerHTML = 'The maximum number of symbols to enter is 45';
		   	break;
		}
		let parentEl = errInp.parentNode;
		parentEl.appendChild(errMess);
	}
}

function validator(ev) {
  ev.preventDefault();

  let errorsEl = document.getElementsByClassName('error');
    for (let el of errorsEl) {
      el.remove();
    }
    let errorFields = document.getElementsByClassName('error-input');
    for(let errorField of errorFields) {
      errorField.classList.remove('error-input');
    }
    let errors = [];
  	const inputs = this.elements;

  	for(let input of inputs) {
    if(input.tagName == "BUTTON") {
      continue;
    }
    let validationResult = false;

    let rulesList =  input.dataset.rule;
    if(input.dataset.rule) {
      rulesList = rulesList.split(' ');
    } else {
      continue;
    }

    let validRule;

    for(let rule of rulesList) {
      if(rule in rules) {
        validationResult = rules[rule](input);
        if(!validationResult) {
          errors.push({
            name:input.name,
            error:rule
          });
      }

    } else {
      console.log('no such rule in rules');
    }
      validRule = rule;
    }

    if(validRule == "required" && validationResult == false) {
      break;
    }
  }
  if(errors.length > 0) {
    ev.preventDefault();
		//submitBtn.setAttribute('disabled', 'true');
		// submitBtn.style.cursor = 'not-allowed';
    showErrors(errors);
  } else {
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'Your form was successfully submitted',
      showConfirmButton: false,
      timer: 1500
    });

    for(let input of inputs) {
      input.value = '';
    }
  }

}
