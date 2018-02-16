import BaseComponent from './base.component.js';

export default class CityOptionComponent extends BaseComponent {
    template(data) {
        let { city } = data; // Must extract form building component

        return `
            <option value="${city.description}">
        `;
    }

    eventBindings(node, data) {
        
        return node;
    }

    // From here to end of class scope is custom user function define area.
    
}