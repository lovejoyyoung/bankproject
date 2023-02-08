const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
};

// Cloning a template before attaching it to the DOM is a common practice in order to avoid modifying the original template.If the original template is modified, it will affect all instances of the template and can lead to unintended consequences and bugs.
// By cloning the template, a new, separate copy of the template is created that can be modified without affecting the original template.This allows for multiple instances of the same template to be used and manipulated independently of each other.
// If the cloning step is skipped, the original template would be directly modified every time it is used, which could result in unexpected behavior and bugs.The original template may not be reusable, as it would contain the changes made to the previous instance.
// In summary, cloning the template before attaching it to the DOM allows for multiple instances of the same template to be used and modified independently, while avoiding unintended consequences and preserving the original template.

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

// The history.pushState method is part of the HTML5 standard and implemented in all modern browsers.
// If you're building a web app for older browsers, there's a trick you can use in place of this API: using a hash(#) before the path you can implement routing that works with regular anchor navigation and does not reload the page, 
// as it's purpose was to create internal links within a page.