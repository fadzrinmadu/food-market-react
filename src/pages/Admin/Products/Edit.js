import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LayoutOne, Text } from '../../../components/ui';

import TopBar from '../../../components/TopBar';
import BackButton from '../../../components/BackButton';
import ProductForm from './ProductForm';
import { asyncStatus } from '../../../constants/asyncStatus';
import { getProductById, updateProduct } from '../../../api/product';

export default function AdminProductEdit() {
  let { id } = useParams();
  let history = useHistory();
  let [status, setStatus] = React.useState(asyncStatus.idle);
  let [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      setStatus(asyncStatus.process);
      let { data } = await getProductById(id);

      if (data.error || !data.data) {
        setStatus(asyncStatus.error);
        return;
      }

      setProduct(data.data);
      setStatus(asyncStatus.success);
    })();
  }, [id]);

  const handleSubmit = async payload => {
    let { data } = await updateProduct(id, payload);
    if (data.error) return;
    history.push('/admin/products');
  };

  return (
    <LayoutOne>
      <TopBar/>
      <div className="flex items-center">
        <BackButton to="/admin/products" />
        <div className="ml-3">
          <Text as="h3">Ubah produk</Text>
        </div>
      </div>
      <br />

      {status === asyncStatus.success && product ? (
        <ProductForm defaultValues={product} onSubmit={handleSubmit} submitLabel="Simpan perubahan" />
      ) : (
        <Text as="body">Memuat data produk...</Text>
      )}
    </LayoutOne>
  );
}
