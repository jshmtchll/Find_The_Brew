//TODO:
    //Style card text (address, website and number) so it displays in different rows .... and looks a bit more presentable
    //Set website text as a link so they can click and visit the brewery website
    //Figure out how we will put the map in there still.... I'm still working on the logic for it TYPE 422 ERROR


let userInputEl = document.getElementById("search");
let formInputEl = document.getElementById("search-form");
let searchBtn = document.getElementById("search-btn");
let cardsContainer = document.getElementById("cards-row")
//creates a new array
let randomImages = new Array();

//adds images to array
randomImages[0] = "./assets/images/brewery1.jpeg" 
randomImages[1] = "./assets/images/brewery2.jpeg"
randomImages[2] = "./assets/images/brewery3.jpeg"
randomImages[3] = "./assets/images/brewery4.jpeg"
randomImages[4] = "./assets/images/brewery5.jpeg"
randomImages[5] = "./assets/images/brewery6.jpeg"
randomImages[6] = "./assets/images/brewery7.jpeg"
randomImages[7] = "./assets/images/brewery8.jpeg"
randomImages[8] = "./assets/images/brewery9.jpeg"
randomImages[9] = "./assets/images/brewery10.jpeg"

//On Click function for search button
let formSubmit = function(event) {
    event.preventDefault()
    let city = userInputEl.value.trim().toUpperCase();
    let brewUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city;
    fetch(brewUrl)
    .then(function(response){
          if (response.ok) {
        response.json()
    .then(function(data){
            console.log(data)
            $(cardsContainer).empty()
            breweryFunc(data)
             })
        }
         else{
             alert("error: " + response.statusText);
         }
    })
}

//function to display cards
let breweryFunc = function(data){
    for (let i = 0; i < data.length; i++) {
        let image = Math.floor(Math.random()*randomImages.length)
        let lat = data[i].latitude
        let lon = data[i].longitude
        //had to wrap around an if statement because quite a bit of the breweries did not have LAT and LON
        if(lat != null && lon != null) {
        let breweriesEl = `<div class="col s12 m5">
            <div class="card-panel red darken-2">
            <img class="card-image" src="${randomImages[image]}"/>
            <h4>${data[i].name}<a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">add</i></a></h4>
            <span class="white-text"> Address: ${data[i].street} ${data[i].city}, ${data[i].state} Phone Number: ${data[i].phone} Website: ${data[i].website_url}
            <iframe id="" src="" width="300" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </span>
          </div>
        </div>`
        cardsContainer.insertAdjacentHTML("afterbegin", breweriesEl)
        //trying to pass the values of lat and lon on to the mapbox api
        mapFunc(lat, lon)
        }
    }
}
//currently working on this function..... keep receiving error, have to look further into the api.
let mapFunc = function(lat, lon){
    let mapBoxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lat},${lon},7.51,0/300x200?access_token=pk.eyJ1IjoianNobXRjaGxsIiwiYSI6ImNrbW10N3V3aTFud3QydW1pNGQ0YnE4ZXEifQ.g5TMwli6T0663l8JG6x1EA`
    console.log(mapBoxUrl)
    fetch(mapBoxUrl)
    .then(function(response) {
        if (response.ok){
            response.json()
            console.log(response)
            .then(function(response){
                console.log(response)
            })
        }
    })
}
formInputEl.addEventListener("submit", formSubmit);
searchBtn.addEventListener("click", formSubmit);

