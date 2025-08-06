'use strict';

(async _ => {
  let user = JSON.parse(localStorage.getItem('user'));

  document.querySelector('#joinToChannel')?.addEventListener('click', async () => {
    window.location.href = 'https://t.me/+DRdCsM3OsU45YjEy';
  })

  if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();

    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);

    let response = await fetch('https://script.google.com/macros/s/AKfycbxXMxDYLQsin0zCbs5Zphpbhn3AnkFlxgLlH4qKLWb3Vq3vC3ZCSlS7CmlSHW_OQztW/exec', {
      method: 'POST',
      body: formData
    })
    await response.json();
    localStorage.removeItem('user');
  } else {
    localStorage.removeItem('user');
  }
})()

