import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Routes>
          <Route path="/logout" element={<GuardRoute><Logout/></GuardRoute>} />
          <Route path="/pesanan" element={<GuardRoute><UserOrders/></GuardRoute>} />
          <Route path="/account" element={<GuardRoute><UserAccount/></GuardRoute>} />
          <Route path="/invoice/:order_id" element={<GuardRoute><Invoice/></GuardRoute>} />
          <Route path="/checkout" element={<GuardRoute><Checkout/></GuardRoute>} />
          <Route path="/alamat-pengiriman/tambah" element={<GuardRoute><UserAddressAdd/></GuardRoute>} />
          <Route path="/alamat-pengiriman/:id/ubah" element={<GuardRoute><UserAddressEdit/></GuardRoute>} />
          <Route path="/alamat-pengiriman" element={<GuardRoute><UserAddress/></GuardRoute>} />
          <Route path="/admin/products/tambah" element={<AdminGuardRoute><AdminProductAdd/></AdminGuardRoute>} />
          <Route path="/admin/products/:id/ubah" element={<AdminGuardRoute><AdminProductEdit/></AdminGuardRoute>} />
          <Route path="/admin/products" element={<AdminGuardRoute><AdminProducts/></AdminGuardRoute>} />
          <Route path="/register/berhasil" element={<GuestOnlyRoute><RegisterSuccess/></GuestOnlyRoute>} />
          <Route path="/register" element={<GuestOnlyRoute><Register/></GuestOnlyRoute>} />
          <Route path="/login" element={<GuestOnlyRoute><Login/></GuestOnlyRoute>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
