let ADMIN_USERNAME = 'admin';
let ADMIN_PASSWORD = '1234';

let loginForm = document.querySelector('#loginForm');
let dashboard = document.querySelector('#dashboard');
let loginBtn = document.querySelector('#loginBtn');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let filterDate = document.querySelector('#filterDate');
let filterBtn = document.querySelector('#filterBtn');
let reservationList = document.querySelector('#reservationList');

loginBtn.onclick = function() {
    if (username.value === ADMIN_USERNAME && password.value === ADMIN_PASSWORD) {
        loginForm.style.display = 'none';
        dashboard.style.display = 'block';
        loadReservations();
    } else {
        alert('Hatalı kullanıcı adı veya şifre!');
    }
};


function loadReservations() {
    let rezervasyonlar = JSON.parse(localStorage.getItem('reservations')) || [];
    displayReservations(rezervasyonlar);
}

function displayReservations(rezervasyonlar) {
    reservationList.innerHTML = '';
    
    rezervasyonlar.forEach((rezervasyon, index) => {
        let card = document.createElement('div');
        card.className = 'reservation-card';
        card.innerHTML = `
            <div class="reservation-info">
                <p>Tarih: ${rezervasyon.tarih}</p>
                <p>Saat: ${rezervasyon.saat}</p>
                <p>Kişi Sayısı: ${rezervasyon.kisi}</p>
                <p>Ad Soyad: ${rezervasyon.ad} ${rezervasyon.soyad}</p>
                <p>Telefon: ${rezervasyon.telefon}</p>
                <p>Durum: ${rezervasyon.durum}</p>
            </div>
            <div class="reservation-actions">
                <button onclick="approveReservation(${index})" class="approve">Onayla</button>
                <button onclick="rejectReservation(${index})" class="reject">Reddet</button>
            </div>
        `;
        reservationList.appendChild(card);
    });
}

function approveReservation(index) {
    let rezervasyonlar = JSON.parse(localStorage.getItem('reservations')) || [];
    rezervasyonlar[index].durum = 'Onaylandı';
    localStorage.setItem('reservations', JSON.stringify(rezervasyonlar));
    loadReservations();
}

function rejectReservation(index) {
    let rezervasyonlar = JSON.parse(localStorage.getItem('reservations')) || [];
    rezervasyonlar[index].durum = 'Reddedildi';
    localStorage.setItem('reservations', JSON.stringify(rezervasyonlar));
    loadReservations();
}

filterBtn.addEventListener('click', function() {
    let selectedDate = filterDate.value;
    let rezervasyonlar = JSON.parse(localStorage.getItem('reservations')) || [];
    
    if (selectedDate) {
        let filtered = rezervasyonlar.filter(rez => rez.tarih === selectedDate);
        displayReservations(filtered);
    } else {
        displayReservations(rezervasyonlar);
    }
});