import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import "antd/dist/antd.css";
import "sweetalert2/src/sweetalert2.scss";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const app = (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// serviceWorker.unregister()
