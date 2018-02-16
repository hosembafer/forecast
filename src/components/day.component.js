import BaseComponent from './base.component.js';

import ForecastComponent from './forecast.component.js';

export default class DayComponent extends BaseComponent {
    template(data) {
        let { date } = data; // Must extract form building component

        let classes = "";
        if (date.active) {
            classes += " active ";
        }

        let dateString = date.date.toDateString().substring(4);
        
        return `
            <div class="day ${classes}">
                <span><b>${date.date.toLocaleString('en-us', {  weekday: 'long' })}</b></span><br />
                <span>${dateString}</span>
            </div>
        `;
    }

    eventBindings(node, data) {
        node.addEventListener("click", (event) => {
            this.onClick(event, data);
        });

        return node;
    }

    // From here to end of class scope is custom user function define area.

    onClick(event, data) {
        Array.from(document.getElementsByClassName("day")).forEach(item => {
            item.classList.remove("active");
        });

        Store.selectedDay = data.date;
        
        event.target.classList.add("active");

        let component = new ForecastComponent();
        let componentHtml = component.render({
            location: Store.location,
            date: Store.selectedDay,
        });

        let container = document.getElementById("forecast_data");
        container.innerHTML = "";
        container.appendChild(componentHtml);
    }
}