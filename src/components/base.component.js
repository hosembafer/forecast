export default class BaseComponent {
    render(data) { // Read-only, see template() and eventBindings()
        let d = document.createElement('div');
        d.innerHTML = this.template(data);

        let node = d.children[0];
        node = this.eventBindings(node, data);

        return node;
    }
}