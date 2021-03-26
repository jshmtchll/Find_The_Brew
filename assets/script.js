let userInputEl = document.getElementById("search");
let formInputEl = document.getElementById("search-form");
let searchBtn = document.getElementById("search-btn");





let formSubmit = function(event) {
    event.preventDefault()

    let city = userInputEl.value.trim().toUpperCase();
    
    
    if (city) {
        userInputEl.value = "";
        console.log(city);
    }
    else{
        alert("Please enter a correct city");
    }
}



formInputEl.addEventListener("submit", formSubmit);
searchBtn.addEventListener("click", formSubmit);

