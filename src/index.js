import React from "react";
import  ReactDOM  from "react-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import {BrowserRouter as Router} from "react-router-dom"
import App from "./App";

const app = (
    <Provider store={store} >
        <Router>
            <App />
        </Router>
    </Provider>
    
);

ReactDOM.render(app, document.getElementById("root"));
