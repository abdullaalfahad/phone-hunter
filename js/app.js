// search phone
const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(json => displayPhone(json.data))
};

// display phone
const displayPhone = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const phoneDetails = document.getElementById('display-details');
    phoneDetails.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top w-75 ms-3 mt-3" alt="phone-image">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">${phone.phone_name}</p>
                    <button onclick="searchDetails('${phone.slug}')">Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
};

// search details
const searchDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(json => displayDetails(json.data));
}

// display details
const displayDetails = details => {
    console.log(details);
    const phoneDetails = document.getElementById('display-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `<div class="card">
        <img src="${details.image}" class="card-img-top w-50 mx-auto mt-3" alt="phone-image">
        <div class="card-body">
          <h5 class="card-title">Brand: ${details.brand}, Name: ${details.name}</h5>
          <p class="card-text"><span class="fw-bold fs-5">Main-Features:</span> Chipset- ${details.mainFeatures.chipSet}, Display-size- ${details.mainFeatures.displaySize}, Storage- ${details.mainFeatures.storage}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span class="fw-bold">Sensors-</span> ${details?.mainFeatures?.sensors ? details.mainFeatures.sensors : 'Not Found'}</li>
          <li class="list-group-item"><span class="fw-bold">Bluetooth-</span> ${details
            ?.others?.Bluetooth ? details.others.Bluetooth : 'Not Found'}, <span class="fw-bold">NFC-</span> ${details?.others?.NFC ? details.others.NFC : 'Not Found'}, <span class="fw-bold">Radio-</span> ${details?.others?.Radio ? details.others.Radio : 'Not Found'}, <span class="fw-bold">USB-</span> ${details?.others?.USB ? details.others.USB : 'Not Found'}</li>
          <li class="list-group-item"><span class="fw-bold">WLAN-</span> ${details?.others?.WLAN ? details.others.WLAN : 'Not Found'}</li>
        </ul>
        <div class="card-body">
        <p class="card-text fw-bold">${details.releaseDate ? details.releaseDate : 'Release date not found'}</p>
        </div>
      </div>`;
    phoneDetails.appendChild(div);
}
{/* <span class="fw-bold"></span> */ }