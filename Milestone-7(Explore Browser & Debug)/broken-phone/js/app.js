const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 10 phones only 
    const showAll = document.getElementById('show-all');
   
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        // showAll.classList.add('d-hidden');
        showAll.classList.add('d-none');
    }
    

    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone =>{
     
        const phoneDiv  = document.createElement('div');
        phoneDiv.classList.add('cols');
        
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}
                ${phone.slug}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
        
    });
    // stop spinner or loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
   
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    toggleSpinner(true);
    processSearch(10);
});

// search input field enter key handler
document.getElementById('search-field').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        toggleSpinner(true);
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// not the best way to load show All
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
  
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
   
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');

    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
   
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate :'Not Available Now'}</p>
        <p>Storage: ${phone.mainFeatures.storage}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] +', ' + phone.mainFeatures.sensors[1] : 'no sensor'}</p>
    `
}

loadPhones();