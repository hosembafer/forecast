import ForecastComponent from '../components/forecast.component.js';

export default class ForecastService {

    // Data Fetcher
    static getDays() {
        let days = [];
        let now = new Date();

        // Calculating next 7 days from now
        for (let i = 0; i < 7; i++) {
            let current = new Date();
            current.setDate(now.getDate() + i);

            let active = false;
            if (current.getDay() == new Date().getDay()) {
                active = true;
            }

            days.push({
                date: current,
                weekDay: current.getDay(),
                active,
            });
        }

        return days;
    }

    // Data Fetcher
    static renderData() {
        Store.location = document.getElementById("cities_input").value;

        ForecastService.fetchData(Store.location).then(response => {
            if (response == null) {
                document.getElementById("cities_input").value = "";
                return null;
            }

            let component = new ForecastComponent();
            let componentHtml = component.render({
                location: Store.location,
                date: Store.selectedDay,
            });

            let container = document.getElementById("forecast_data");
            container.innerHTML = "";
            container.appendChild(componentHtml);
        });
    }

    // Data Fetcher
    static fetchData(location) {
        return fetch("miniProxy.php?https://query.yahooapis.com/v1/public/yql?d=7&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "') and u='c' &format=json")
        .then(response => response.json())
        .then(response => {
            if (response.query.results) {
                Store.forecast = response.query.results.channel.item.forecast;
            }
            else {
                alert("Sorry, can't find forecast info for this location.");
                return null;
            }

            return Store.forecast;
        })
        ;
    }
}