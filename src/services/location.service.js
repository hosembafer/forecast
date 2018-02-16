import ForecastService from "./forecast.service.js";
import CityOptionComponent from "../components/cityOption.component.js";

export default class LocationService {

    // Data Fetcher
    static async getCities(term) {
        return fetch("miniProxy.php?https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + term + "&types=(cities)&key=AIzaSyAIZh07RH3m8fo3KFD7KtmswDmShN-6O1c")
        .then(response => response.json())
        .then(response => {
            Store.cities = [];
            if (response.predictions instanceof Array) {
                Store.cities = response.predictions;
            }

            return Store.cities;
        })
        ;
    }

    // Data Renderer
    static renderCities(term) {
        if (event.target.value.length > 2) {
            let cities = LocationService.getCities(term);
            let citiesContainer = document.getElementById("cities");
            
            cities.then(data => {
                citiesContainer.innerHTML = "";
                data.forEach(item => {
                    let component = new CityOptionComponent();
                    let componentHtml = component.render({
                        city: item,
                    });
    
                    citiesContainer.appendChild(componentHtml);
                });
            });
        }
    }

    // Data Fetcher
    static detectCity() {
        console.log("LocationService: Detecting...");

        // Start loading
        document.getElementById("loader").style.display = "block";
        document.getElementById("cities_input").setAttribute("disabled", true);
        
        navigator.geolocation.getCurrentPosition(function(position) {
            let coordString = Number(position.coords.latitude).toFixed(3) + "," + Number(position.coords.longitude).toFixed(3);

            fetch("miniProxy.php?http://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordString)
            .then(response => response.json())
            .then(response => {
                let detectedLocation = response.results.find(item => {
                    let select = false;

                    if (item.types.indexOf("political") != -1 && item.types.indexOf("locality") != -1 && item.types.length == 2) {
                        select = true;
                    }

                    return select;
                });

                if (detectedLocation instanceof Object && detectedLocation.formatted_address) {
                    document.getElementById("cities_input").value = detectedLocation.formatted_address;

                    console.log("LocationService: Coordinates fetched.");
                    ForecastService.renderData();
                }
                else {
                    console.log("LocationService: Try again now. It's just Google Maps API limitation alert.");
                    alert("Try again now. It's just Google Maps API limitation alert.");
                }

                // End loading
                document.getElementById("loader").style.display = "none";
                document.getElementById("cities_input").removeAttribute("disabled");
            })
            ;
        });
    }
}