import React from "react";
import 'tachyons'
import Register from "./Auth/Register";
import store from "./store/store";
import { StoreProvider } from "easy-peasy";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./Navbar";
import Layout from "./Home";
import test from './Test'
import Footer from "./footer";
import Login from "./Auth/Login";
import Cart from './cart'
import axios from 'axios'
import { AuthContextProvider } from './context/AuthContext'

axios.defaults.withCredentials = true

export default function App() {
  return (
    <StoreProvider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
            <Navigation />
            <Switch>
              <Route exact path={'/'} component={Layout} />
              <Route exact path={'/test'} component={test} />
              <Route exact path={'/register'} component={Register} />
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/cart'} component={Cart} />
            </Switch>
            <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </StoreProvider>
  );
}
