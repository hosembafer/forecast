import BaseComponent from './base.component.js';

export default class ForecastComponent extends BaseComponent {
    template(data) {
        let { location = "" } = data; // Must extract form building component

        let forecast = Store.forecast.find(item => {
            return Store.selectedDay.date.yyyymmdd() == new Date(item.date).yyyymmdd();
        });
        
        return `
            <div class="forecast">
                <div class="forecast-location">${location}</div>
                <div class="forecast-dayOfWeek">${Store.selectedDay.date.toLocaleString('en-us', {  weekday: 'long' })}, ${forecast.text}</div>
                <div class="forecast-temp">${forecast.high} <span>°C</span></div>
            </div>
        `;
    }

    eventBindings(node, data) {
        
        return node;
    }

    // From here to end of class scope is custom user function define area.
    
}