const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all: ', isShowAll);

    // display only first 12 phones if not show all is clicked
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-4 bg-gray-100 shadow-lg';
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Phone" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;

        phoneContainer.appendChild(phoneCard);

    })

    // hide loading spinner
    toggleLoadingSpinner(false);
}
// search for phone brand
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetails = async (id) => {
    // console.log('clicked show details id: ', id);
    // load a single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    // console.log(phoneDetails);

    showPhoneDetails(phoneDetails);
}

const showPhoneDetails = (phoneDetails) => {
    console.log(phoneDetails);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phoneDetails.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <img src="${phoneDetails.image}" alt="">
        <p><span>Storage: </span>${phoneDetails?.mainFeatures?.storage}</p>
        <p><span>Display Size: </span>${phoneDetails?.mainFeatures?.displaySize}</p>
        <p><span>Chipset: </span>${phoneDetails?.mainFeatures?.chipSet}</p>
        <p><span>Memory: </span>${phoneDetails?.mainFeatures?.memory}</p>
        <p><span>Slug: </span>${phoneDetails?.slug}</p>
        <p><span>Release Date: </span>${phoneDetails?.releaseDate}</p>
        <p><span>Brand: </span>${phoneDetails?.brand}</p>
        <p><span>GPS: </span>${phoneDetails?.others?.GPS}</p>
    `;


    // show the modal
    show_details_modal.showModal();
}

loadPhone();