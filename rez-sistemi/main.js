let form = document.querySelector('#form');
let tarih = document.querySelector('#tarih');
let ad = document.querySelector('#ad');
let soyad = document.querySelector('#soyad');
let telefon = document.querySelector('#tel');
let saat = document.querySelector('#saat');
let kisi = document.querySelector('#kisi');
let basarili = document.querySelector('#basarili');
let kisiBilgileri = document.querySelector('#kisiBilgileri');
let tarihKisi = document.querySelector('#tarihKisi');
let ileri = document.querySelector('#ileri');
let olustur = document.querySelector('#olustur');

ileri.onclick = function(e) {
    e.preventDefault();
    if (tarih.value && saat.value && kisi.value) {
        tarihKisi.style.display = 'none';
        kisiBilgileri.style.display = 'flex';
        ileri.style.display = 'none';
    } else {
        alert('Lütfen tarih, saat ve kişi sayısını seçiniz!');
    }
};

olustur.onclick = function() {
    if (tarih.value && saat.value && kisi.value && 
        ad.value && soyad.value && telefon.value) {
        
        let rezervasyon = {
            tarih: tarih.value,
            saat: saat.value,
            kisi: kisi.value,
            ad: ad.value,
            soyad: soyad.value,
            telefon: telefon.value,
            durum: 'Beklemede'
        };

        let rezervasyonlar = JSON.parse(localStorage.getItem('reservations')) || [];
        rezervasyonlar.push(rezervasyon);
        localStorage.setItem('reservations', JSON.stringify(rezervasyonlar));

        basarili.style.display = 'block';
        basarili.innerHTML = `
            <p>${tarih.value} tarihinde, saat ${saat.value} için ${kisi.value} kişilik rezervasyonunuz oluşturulmuştur.</p>
        `;

        form.reset();
        kisiBilgileri.style.display = 'none';
        tarihKisi.style.display = 'flex';
        ileri.style.display = 'block';
    } else {
        alert('Lütfen tüm alanları doldurunuz!');
    }
};