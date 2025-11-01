import "upkit/dist/style.min.css";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { listen } from "./app/listener";

import Checkout from "./pages/Checkout";
import GuardRoute from "./components/GuardRoute";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Product from "./pages/Product";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import UserAccount from "./pages/UserAccount";
import UserAddress from "./pages/UserAddress";
import UserAddressAdd from "./pages/UserAddressAdd";
import UserOrders from "./pages/UserOrders";
import store from "./app/store";
import { getCart } from "./api/cart";

const App = () => {
  useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <GuardRoute path="/logout">
            <Logout/>
          </GuardRoute>
          <GuardRoute path="/product">
            <Product/>
          </GuardRoute>
          <GuardRoute path="/pesanan">
            <UserOrders/>
          </GuardRoute>
          <GuardRoute path="/account">
            <UserAccount/>
          </GuardRoute>
          <GuardRoute path="/invoice/:order_id">
            <Invoice/>
          </GuardRoute>
          <GuardRoute path="/checkout">
            <Checkout/>
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman/tambah">
            <UserAddressAdd/>
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman">
            <UserAddress/>
          </GuardRoute>
          <GuestOnlyRoute path="/register/berhasil">
            <RegisterSuccess/>
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/register">
            <Register/>
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/login">
            <Login/>
          </GuestOnlyRoute>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
