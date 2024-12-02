var navLink=document.querySelector("#navLink");
var navExtra=document.querySelector("#extralink")
// var btn= document.querySelector("#btn")
// var contactLink= document.querySelector("#contact")
// var contactLink1= document.querySelector("#contact1")
var searchInput = document.querySelector("#search");
var seachBtn = document.querySelector("#searchBtn");
var text=document.querySelector("#dayOne")

var weatherData = [];
var city = "";





 // --------------------------------------------------------toggle nav--------------------------------------------------------------------------------


    window.addEventListener("resize", function(){
        if(window.innerWidth<=960){
            navLink.classList.add("d-none")
            
            btn.classList.remove("d-none")
        }
        else{
            navLink.classList.remove("d-none")
       
            btn.classList.add("d-none")
            navExtra.classList.add("d-none")
        }
    }) 
     window.addEventListener("load", function(){
        if(window.innerWidth<=960){
            navLink.classList.add("d-none")
            btn.classList.remove("d-none")
        }
        else{
            navLink.classList.remove("d-none")
       
            btn.classList.add("d-none")
            navExtra.classList.add("d-none")
        }
    })
    document.addEventListener("click",function(e){
        if(e.target.id=="btn"){
            navExtra.classList.toggle("d-none")
        }
         if(e.target.id=="contact"||e.target.id=="contact1"){
            location.href="index1.html"
        }
        
    })
    
    // --------------------------------------------------------finally nav--------------------------------------------------------------------------------




// ------------------------------------------------------------------------search input--------------------------------------------------------------
var searchInput = document.querySelector("#search");
var seachBtn = document.querySelector("#searchBtn");

searchInput.addEventListener("input", function() {
    city = searchInput.value.trim().toLowerCase();
     
     if (city) {
        getWeather(city); 
    }
    
    else {
        getWeatherByCoordinates(lat, lon);
       
        text.innerHTML = `<h1 class="text-center bg-white text-primary py-3 rounded-3 shadow-lg">city isnt exist</h1>`
    }
    console.log(matched);
     
});

// ------------------------------------------------------------------------search button--------------------------------------------------------------
// seachBtn.addEventListener("click", function() {
//     if (matched==true) {
//         getWeather(city); 
//     }
    
//     else{  text.innerHTML = `<h1 class="text-center bg-white text-primary py-3 rounded-3 shadow-lg">city isnt exist</h1>`
//     }
//     console.log(matched);
// });





// -------------------------------------------------------------------location in load page---------------------------------------------------------------------------
async function getWeatherByCoordinates(lat, lon) {
    try {
        var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b23ad5564d445b0873103137240112&q=${lat},${lon}&days=3&aqi=no`, { method: "GET" });
        var data = await res.json();
        
            weatherData = data;
          
        display();
        

         
    } finally{
        console.log("done");
    }
}
window.addEventListener("load", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon); 
        });
    } 
    else{
        text.innerHTML = `<h1 class="text-center bg-white text-primary py-3 rounded-3 shadow-lg">turn on ur GPS location</h1>`
    }
});




// -------------------------------------------------------------fetch api--------------------------------------------------------------------
async function getWeather(city) {
    try {
        var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b23ad5564d445b0873103137240112&q=${city}&days=3&aqi=no`, { method: "GET" });
        var data = await res.json();

        
           
        weatherData = data;
    
        
        display();
        
 
    } catch (error) {
        console.log(error)
    }
}
// -------------------------------------------------------------fetch api--------------------------------------------------------------------
// -------------------------------------------------------------display--------------------------------------------------------------------

    function display() {
        var cartona = "";
    
        if (weatherData) {
           
            var currentDayDate = new Date();
            var currentDate = currentDayDate.toLocaleDateString(undefined, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            
            var currentIconUrl = `https:${weatherData.current.condition.icon}`;
    
            cartona = `
                <div class="col-md-6 col-lg-4">
                    <div class="mb-3 shadow-lg p-3 text-center bg-white rounded-3">
                        <h1 class="my-5">${weatherData.location.name}</h1>
                        <p class="fs-4">${currentDate}</p>
                        <h2 class="my-5">
                            <img src="${currentIconUrl}" class="weather-icon" />
                            ${weatherData.current.temp_c} °C
                        </h2>
                        <p class="fs-4 text-primary">${weatherData.current.condition.text}</p>
                        <div class="info d-flex my-5 justify-content-around">
                            <span class="fs-5"><i class="fa-solid fa-umbrella"></i> ${weatherData.current.humidity}% </span>
                            <span class="fs-5"><i class="fa-solid fa-wind text-secondary"></i> ${weatherData.current.wind_kph} km/h</span>
                            <span class="fs-5"><i class="fa-solid fa-compass text-primary"></i> ${weatherData.current.wind_dir} </span>
                        </div>
                    </div>
                </div>`;
    
            weatherData.forecast.forecastday.slice(1).forEach(function (dayS) {
                var date = new Date(dayS.date);
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var editDate = date.toLocaleDateString(undefined, options);
    
                
                var fullIconUrl = `https:${dayS.day.condition.icon}`;
    
                cartona += `
                    <div class="col-md-6 col-lg-4">
                        <div class="mb-3 shadow-lg p-3 text-center bg-white rounded-3">
                            <h1 class="my-5">${weatherData.location.name}</h1>
                            <p class="fs-4">${editDate}</p>
                            <h2 class="my-5">
                                <img src="${fullIconUrl}" class="weather-icon" />
                                ${dayS.day.avgtemp_c} °C
                            </h2>
                            <p class="fs-4 text-primary">${dayS.day.condition.text}</p>
                            <div class="info d-flex my-5 justify-content-around">
                                <span class="fs-5"><i class="fa-solid fa-umbrella"></i> ${dayS.day.daily_chance_of_rain}%</span>
                                <span class="fs-5"><i class="fa-solid fa-wind text-secondary"></i> ${dayS.day.maxwind_kph} km/h</span>
                                <span class="fs-5"><i class="fa-solid fa-compass text-primary"></i> N</span>
                            </div>
                        </div>
                    </div>`;
            });
    
            text.innerHTML = cartona;
        } else {
            text.innerHTML = `<h1 class="text-center bg-white text-primary py-3 rounded-3 shadow-lg">No Data Found</h1>`;
        }
    }
    

// -------------------------------------------------------------display--------------------------------------------------------------------



