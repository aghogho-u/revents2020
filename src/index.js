import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css'
import "./app/layout/styles.css";
import App from "./app/layout/App.jsx";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from './serviceWorker';
//import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, history } from "./app/store/configueStore";
import ScrollToTop from "./app/layout/ScrollToTop";
import { ConnectedRouter } from "connected-react-router";


const store = configureStore();


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );
}

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", function () {
    setTimeout(render);
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register();

reportWebVitals();
