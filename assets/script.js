let userInputEl = document.getElementById("search");
let formInputEl = document.getElementById("search-form");
let searchBtn = document.getElementById("search-btn");
let cardsContainer = document.getElementById("home-row");
let favoriteContainer = document.getElementById("favorite-row")
let favoriteBtn = document.querySelector(".save-fave")
let faveArr = JSON.parse(window.localStorage.getItem("favorites")) || [];
//creates a new array
let randomImages = new Array();

//adds images to array
randomImages[0] = "./assets/images/brewery1.jpeg";
randomImages[1] = "./assets/images/brewery2.jpeg";
randomImages[2] = "./assets/images/brewery3.jpeg";
randomImages[3] = "./assets/images/brewery4.jpeg";
randomImages[4] = "./assets/images/brewery5.jpeg";
randomImages[5] = "./assets/images/brewery6.jpeg";
randomImages[6] = "./assets/images/brewery7.jpeg";
randomImages[7] = "./assets/images/brewery8.jpeg";
randomImages[8] = "./assets/images/brewery9.jpeg";
randomImages[9] = "./assets/images/brewery10.jpeg";

//On Click function for search button
let formSubmit = function (event) {
  event.preventDefault();
  let city = userInputEl.value.trim().toUpperCase();
  let brewUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city;
  fetch(brewUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //console.log(data);
        $(cardsContainer).empty();
        breweryFunc(data);
      });
    } else {
      alert("error: " + response.statusText);
    }
  });
};


//function to display cards
let breweryFunc = function (data) {
  for (let i = 0; i < data.length; i++) {
    let image = Math.floor(Math.random() * randomImages.length);
    let lat = data[i].latitude;
    let lon = data[i].longitude;
    //formats the phone number (xxx) xxx-xxxx
    let phone = data[i].phone;
    let formatPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3");
    //had to wrap around an if statement because quite a bit of the breweries did not have LAT and LON
    if (lat != null && lon != null) {
      let breweriesEl = `<div class="col s12 m5">
            <div class="card-panel effect2">
            <div class="img-span"><img class="card-image" src="${randomImages[image]}"/></div>
            <h4 class="brew-title">${data[i].name} </h4>
            <div class="fav-btn save-fave" data-id="${data[i].id}">
            <img class="favorite-btn image-main" src="./assets/images/favorite1.png"/>
            <img class="favorite-btn image-hover" src="./assets/images/favorite.png"/>
            </div>
            <span class="card-span white-text"> <b>Address:</b> <a href="https://maps.google.com/?q=${data[i].street} ${data[i].city}, ${data[i].state}" target="_blank">${data[i].street} ${data[i].city}, ${data[i].state}</a> <br>
            <b>Phone Number:</b> <a href="tel:${data[i].phone}">${formatPhone}</a> <br>
            <b>Website:</b> <a href="${data[i].website_url}" target="_blank">${data[i].website_url}</a></span>
            <br> 
            <div class="map"><img class="map-img" src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(${lon},${lat})/${lon},${lat},15,0/400x300?access_token=pk.eyJ1IjoianNobXRjaGxsIiwiYSI6ImNrbW10N3V3aTFud3QydW1pNGQ0YnE4ZXEifQ.g5TMwli6T0663l8JG6x1EA" /></div>
          </div>
        </div>`;
      cardsContainer.insertAdjacentHTML("afterbegin", breweriesEl);
    }
  }
};

let favortiesFunc = function(){
    let brewId = this.getAttribute("data-id")
    faveArr.push(brewId)
    console.log(faveArr)
    window.localStorage.setItem("favorites", JSON.stringify(faveArr))
}

let favoritesPage = function(){
    for (let i = 0; i < faveArr.length; i++) {
        let getBrewUrl = "https://api.openbrewerydb.org/breweries/" + faveArr[i];
        fetch(getBrewUrl)
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function (data) {
                    console.log(data.phone)
                    let image = Math.floor(Math.random() * randomImages.length);
                    let phone = data.phone;
                    let formatPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3");
                    let lat = data.latitude;
                    let lon = data.longitude;
                    let breweriesEl = `<div class="col s12 m5">
                    <div class="card-panel effect2">
                    <div class="img-span"><img class="card-image" src="${randomImages[image]}"/></div>
                    <h4 class="brew-title">${data.name} </h4>
                    <span class="card-span white-text"> <b>Address:</b> ${data.street} ${data.city}, ${data.state} <br>
                    <b>Phone Number:</b> ${formatPhone} <br>
                    <b>Website:</b> ${data.website_url}</span>
                    <br>
                    <div class="map"><img class="map-img" src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(${lon},${lat})/${lon},${lat},15,0/300x200?access_token=pk.eyJ1IjoianNobXRjaGxsIiwiYSI6ImNrbW10N3V3aTFud3QydW1pNGQ0YnE4ZXEifQ.g5TMwli6T0663l8JG6x1EA" /></div>
                    </div>
                </div>`;
                favoriteContainer.insertAdjacentHTML("afterbegin", breweriesEl);
                })
            }
        })
    }
}
favoritesPage()

formInputEl.addEventListener("submit", formSubmit);
searchBtn.addEventListener("click", formSubmit);

$(document).on('click','.save-fave', favortiesFunc);