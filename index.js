const StacheElement = require("can-stache-element");
const route = require("can-route");
require("can-stache-route-helpers");
// const PageLogin = require("./technology-overview/page-login");
// const PageHome = require("./technology-overview/page-home");
// const TaskEditor = require("./technology-overview/page-tasks");

class MyRoutingApp extends StacheElement {
    static view = `
  <a href="{{ routeUrl(page='home') }}">Home</a>
      <a href="{{ routeUrl(page='tasks') }}">Tasks</a>
      <p>The current page is {{ this.routeData.page }}.</p>
  {{ this.componentToShow }}
  `;

    static props = {
        routeData: {
            get default() {
                route.register("{page}", { page: "home" });
                route.register("tasks/{taskId}", { page: "tasks" });
                route.start();
                return route.data;
            },
        }
    };

    get componentToShow() {
        switch (this.routeData.page) {
            case "home":
                const home = document.createElement("h2");
                home.innerHTML = "Home";
                return home;
            case "tasks":
                const tasks = document.createElement("h2");
                tasks.innerHTML = "Tasks";
                return tasks;
            default:
                const page404 = document.createElement("h2");
                page404.innerHTML = "Page Missing";
                return page404;
        }
    }
}

customElements.define("my-routing-app", MyRoutingApp);

// export default function(request) {// <-- doesn't work ):
module.exports = function (request) {
    console.log('hash', window.location.hash);

    console.log("routing-main.js default export - START");

    document.body.appendChild(document.createElement("my-routing-app"));

    console.log("routing-main.js default export - END");
};
