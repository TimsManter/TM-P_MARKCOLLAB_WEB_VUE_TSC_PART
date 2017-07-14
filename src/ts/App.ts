// Imports
import Vue from "vue";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import Axios from "axios";
import "./../scss/style.scss";

// Components
import App from "../vue/App.vue";
import DocumentPage from "../vue/pages/DocumentPage.vue";

Axios.defaults.baseURL = "http://markcollabapi.azurewebsites.net/api";
Axios.defaults.headers.common["Accept"] = "application/json";
Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://markcollabvue.azurewebsites.net";
Axios.defaults.headers.patch["Content-Type"] = "text/plain";

Vue.use(VueRouter);
Vue.use(VueMaterial);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/document",
      component: DocumentPage
    },
    {
      path: "/",
      redirect: "/document"
    }
  ]
});

const app = new Vue({
  el: "#app",
  router: router,
  render: r => r(App, {
  })
});
