// Data layers
import ForecastService from './services/forecast.service';
import LocationService from './services/location.service';

// Presentations
import DayComponent from './components/day.component';
import CityOptionComponent from './components/cityOption.component';


// Static data variables
let thisDay = new DayComponent({
    date: new Date()
});

let days = ForecastService.getDays();

// The main controller
document.addEventListener("DOMContentLoaded", function() {
    let daysHtml = days.map(date => {
        let component = new DayComponent();
        let componentHtml = component.render({
            date: date,
        });
    
        document.getElementById("days").appendChild(componentHtml);
        return componentHtml;
    });

    document.getElementById("detechWithGeolocation").addEventListener("click", event => {
        LocationService.detectCity();
    });

    document.getElementById("cities_input").addEventListener("keyup", event => {
        LocationService.renderCities(event.target.value);
    });

    document.getElementById("cities_input").addEventListener("change", ForecastService.renderData);

    // Initial Entry Point
    ForecastService.renderData();
});