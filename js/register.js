'use strict';

(async _ => {
  const statistics = new Statistics();
  let user = JSON.parse(localStorage.getItem('user'));

  const joinButton = document.querySelector('#joinToChannel')
  joinButton?.addEventListener('click', async (e) => {
    joinButton.disabled = true;
    await statistics.onClickTgBtn();
    joinButton.disabled = false;
    window.location.href = 'https://t.me/+dhfS5-8DCZM2NWIy';
  })

  if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();

    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);
    formData.append(`Foydalanuvchi ID`, statistics.userId);
    formData.append(`Timestamp`, statistics.time?.toString());

    let response = await fetch('https://script.google.com/macros/s/AKfycbzyZ2XlTRm67iH1Qj6liI6n-Uf_NJeehV9B3eptHSdX8w8j7tCVPrIFbAagk26h-Nxegg/exec', {
      method: 'POST',
      body: formData
    })
    await response.json();
    await statistics.onRegister(user);
    localStorage.removeItem('user');
  } else {
    localStorage.removeItem('user');
  }
})()

