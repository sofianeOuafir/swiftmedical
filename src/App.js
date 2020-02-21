import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toggle/style.css"

import "./App.css";
import configureStore from "./store/configureStore";
import HomePage from "./components/HomePage";
import PatientPage from "./components/PatientPage";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/patients/:id" component={PatientPage}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
