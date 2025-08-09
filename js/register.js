'use strict';

(async _ => {
  let user = JSON.parse(localStorage.getItem('user'));

  const joinButton = document.querySelector('#joinToChannel')
  joinButton?.addEventListener('click', async (e) => {
    window.location.href = 'https://t.me/+YnaTZveWsyo3OTUy';
  })

  if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();

    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);

    let response = await fetch('https://script.google.com/macros/s/AKfycbzFKWpgX0SE2zWzpbZEnvKFCU1OxzPifmzmEVZXnYXux2K-9FSYAFWCzyzj1kKw9fAg/exec', {
      method: 'POST',
      body: formData
    })
    await response.json();
    localStorage.removeItem('user');
  } else {
    localStorage.removeItem('user');
  }
})()

