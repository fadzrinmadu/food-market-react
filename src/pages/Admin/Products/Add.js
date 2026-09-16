import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { LayoutOne, Text } from '../../../components/ui';

import TopBar from '../../../components/TopBar';
import BackButton from '../../../components/BackButton';
import ProductForm from './ProductForm';
import { createProduct } from '../../../api/product';

export default function AdminProductAdd() {
  let history = useHistory();

  const handleSubmit = async payload => {
    let { data } = await createProduct(payload);
    if (data.error) return;
    history.push('/admin/products');
  };

  return (
    <LayoutOne>
      <TopBar/>
      <div className="flex items-center mb-6">
        <BackButton to="/admin/products" />
        <div className="ml-3">
          <Text as="h3">Tambah produk</Text>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} submitLabel="Simpan produk" />
    </LayoutOne>
  );
}
