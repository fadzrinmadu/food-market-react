import * as React from 'react';
import { useSelector } from 'react-redux';
import FaHome from '@meronex/icons/fa/FaHome';
import FaAddressBook from '@meronex/icons/fa/FaAddressBook';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaFileInvoice from '@meronex/icons/fa/FaFileInvoice';
import FaBoxes from '@meronex/icons/fa/FaBoxes';
import { Card, LayoutOne, Responsive, Text } from '../../components/ui';
import { Link } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import IconWrapper from '../../components/IconWrapper';

const menus = [
  {label: 'Beranda', icon: <IconWrapper className="text-white text-5xl flex justify-center mb-5"><FaHome/></IconWrapper>, url: '/'},
  {label: 'Alamat', icon: <IconWrapper className="text-white text-5xl flex justify-center mb-5"><FaAddressBook/></IconWrapper>, url: '/alamat-pengiriman'},
  {label: 'Pesanan', icon: <IconWrapper className="text-white text-5xl flex justify-center mb-5"><FaFileInvoice/></IconWrapper>, url: '/pesanan'},
  {label: 'Logout', icon: <IconWrapper className="text-white text-5xl flex justify-center mb-5"><FaArrowRight/></IconWrapper>, url: '/logout'}
];

const adminMenu = {
  label: 'Kelola Produk',
  icon: <IconWrapper className="text-white text-5xl flex justify-center mb-5"><FaBoxes/></IconWrapper>,
  url: '/admin/products',
};

export default function UserAccount() {
  let { user } = useSelector(state => state.auth);
  let items = user?.role === 'admin' ? [...menus, adminMenu] : menus;

  return (
    <LayoutOne>
      <TopBar/>
      <Text as="h3"> Akun Anda </Text>
      <br/>
      <Responsive desktop={4} tablet={4} mobile={2}>
        {items.map((menu, index) => {
          return <div key={index} className="px-2 pb-2">
            <Link to={menu.url}>
              <Card
                header={menu.icon}
                body={<div className="text-center font-bold text-white">
                  {menu.label}
                </div>}
              />
            </Link>
          </div>
        })}
      </Responsive>
    </LayoutOne>
  )
}
