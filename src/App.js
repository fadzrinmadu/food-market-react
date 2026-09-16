import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { listen } from './app/listener';
import { Provider } from 'react-redux';

import GuestOnlyRoute from './components/GuestOnlyRoute';
import GuardRoute from './components/GuardRoute';
import AdminGuardRoute from './components/AdminGuardRoute';
import Logout from './pages/Logout';
import UserOrders from './pages/UserOrders';
import UserAccount from './pages/UserAccount';
import Invoice from './pages/Invoice';
import Checkout from './pages/Checkout';
import UserAddress from './pages/UserAddress';
import UserAddressAdd from './pages/UserAddressAdd';
import UserAddressEdit from './pages/UserAddressEdit';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';
import AdminProducts from './pages/Admin/Products';
import AdminProductAdd from './pages/Admin/Products/Add';
import AdminProductEdit from './pages/Admin/Products/Edit';
import store from './app/store';
import {getCart} from './api/cart';

function App() {

  React.useEffect(() => {
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
          <GuardRoute path="/alamat-pengiriman/:id/ubah">
            <UserAddressEdit/>
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman">
            <UserAddress/>
          </GuardRoute>
          <AdminGuardRoute path="/admin/products/tambah">
            <AdminProductAdd/>
          </AdminGuardRoute>
          <AdminGuardRoute path="/admin/products/:id/ubah">
            <AdminProductEdit/>
          </AdminGuardRoute>
          <AdminGuardRoute path="/admin/products">
            <AdminProducts/>
          </AdminGuardRoute>
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
