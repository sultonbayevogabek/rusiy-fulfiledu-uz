
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const registerButtons = document.querySelectorAll('[data-main-button]');
  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const modalCloserElements = document.querySelectorAll('[data-modal-close]');
  const form = document.querySelector('[data-form]');
  const formAlert = document.querySelector('[data-form-alert]');
  const phoneInput = document.querySelector('#phone');
  const countrySelect = document.querySelector('[data-country-select]');
  const countryPrefix = document.querySelector('[data-country-prefix]');

  // Davlatlar uchun telefon formatlar
  const phoneFormats = {
    '+998': {
      mask: '00 000 00 00',
      placeholder: '90 123 45 67',
      length: 9
    },
    '+1': {
      mask: '(000) 000-0000',
      placeholder: '(555) 123-4567',
      length: 10
    },
    '+993': {
      mask: '0 000 0000',
      placeholder: '6 512 3456',
      length: 8
    },
    '+992': {
      mask: '00 000 0000',
      placeholder: '93 123 4567',
      length: 9
    },
    '+7': {
      mask: '(000) 000-00-00',
      placeholder: '(905) 123-45-67',
      length: 10
    },
    '+996': {
      mask: '(000) 00-00-00',
      placeholder: '(555) 12-34-56',
      length: 9
    },
    '+82': {
      mask: '00-0000-0000',
      placeholder: '10-1234-5678',
      length: 10
    }
  };

  let currentFormat = phoneFormats['+998'];

  // Davlat tanlanganda
  countrySelect.addEventListener('change', function() {
    const selectedCountry = this.value;
    countryPrefix.textContent = selectedCountry;
    currentFormat = phoneFormats[selectedCountry];
    phoneInput.placeholder = currentFormat.placeholder;
    phoneInput.value = '';
  });

  // Telefon input mask funksiyasi
  function applyPhoneMask(value, mask) {
    // Faqat raqamlarni olib qolish
    const numbers = value.replace(/\D/g, '');

    let formatted = '';
    let numberIndex = 0;

    for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
      if (mask[i] === '0') {
        formatted += numbers[numberIndex];
        numberIndex++;
      } else {
        formatted += mask[i];
      }
    }

    return formatted;
  }

  // Phone input uchun event listener
  phoneInput.addEventListener('input', function(e) {
    const cursorPosition = this.selectionStart;
    const oldValue = this.value;
    const oldLength = oldValue.length;

    // Maskni qo'llash
    this.value = applyPhoneMask(this.value, currentFormat.mask);

    // Cursor pozitsiyasini to'g'rilash
    const newLength = this.value.length;
    const diff = newLength - oldLength;

    if (diff > 0) {
      this.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
    }
  });

  // Faqat raqam kiritishga ruxsat berish
  phoneInput.addEventListener('keydown', function(e) {
    // Ruxsat berilgan tugmalar: backspace, delete, tab, escape, enter, home, end, left, right
    const allowedKeys = [8, 9, 27, 13, 46, 35, 36, 37, 39];

    if (allowedKeys.includes(e.keyCode) ||
      (e.keyCode >= 48 && e.keyCode <= 57) || // 0-9
      (e.keyCode >= 96 && e.keyCode <= 105)) { // numpad 0-9
      return;
    }

    e.preventDefault();
  });

  registerButtons.forEach(async button => {
    button.addEventListener('click', async () => {
      modalBackdrop.classList.remove('hidden');
    })
  })

  function closeModal() {
    modalBackdrop.classList.add('hidden');
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  })

  modalCloserElements.forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.hasAttribute('data-modal-close')) {
        closeModal();
      }
    })
  })

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitButton = e.target.querySelector('[data-form-button]');
    const name = e.target.querySelector('#name').value?.trim();
    const phone = e.target.querySelector('#phone').value?.trim();
    const selectedCountryCode = countrySelect.value;

    if (!name.length) {
      formAlert.textContent = 'Ismingizni kiriting';
      formAlert.classList.remove('hidden');
      return;
    }

    // Telefon raqam tekshirish - faqat raqamlar soni
    const phoneNumbers = phone.replace(/\D/g, '');
    if (phoneNumbers.length < currentFormat.length) {
      formAlert.textContent = 'To\'liq telefon raqamingizni kiriting';
      formAlert.classList.remove('hidden');
      return;
    }

    formAlert.classList.add('hidden');

    localStorage.setItem('user', JSON.stringify({
      name,
      phone: selectedCountryCode + phoneNumbers, // To'liq telefon raqam
      time: new Date().toLocaleString()
    }))

    window.location.href = `../telegram.html`
  })
});
