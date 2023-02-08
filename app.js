const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
};

function navigate(path) {
    window.history.pushState({}, path, path);
    updateRoute();
}

function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path];

    if (!route) {
        return navigate('/login');
    }

    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);
    // The code app.innerHTML = ''; sets the innerHTML property of the app object to an empty string, effectively clearing its content.
    // innerHTML is a property of HTML elements that represents the HTML code contained within the element, as a string.By setting it to an empty string, any content that was previously within the element is removed.
    // If this code were not present, the content of the app object would persist and new content would simply be added to it, potentially leading to duplicated or unexpected behavior.By clearing the content beforehand, the template can ensure a clean slate for rendering the desired content.

}

function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
}

window.onpopstate = () => updateRoute();
updateRoute();