import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorState, LayoutOne, Skeleton, Text } from '../../../components/ui';

import TopBar from '../../../components/TopBar';
import BackButton from '../../../components/BackButton';
import ProductForm from './ProductForm';
import { asyncStatus } from '../../../constants/asyncStatus';
import { getProductById, updateProduct } from '../../../api/product';

export default function AdminProductEdit() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [status, setStatus] = React.useState(asyncStatus.idle);
  let [product, setProduct] = React.useState(null);

  const fetchProduct = React.useCallback(async () => {
    setStatus(asyncStatus.process);
    let { data } = await getProductById(id);

    if (data.error || !data.data) {
      setStatus(asyncStatus.error);
      return;
    }

    setProduct(data.data);
    setStatus(asyncStatus.success);
  }, [id]);

  React.useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleSubmit = async payload => {
    let { data } = await updateProduct(id, payload);
    if (data.error) return;
    navigate('/admin/products');
  };

  const header = (
    <div className="flex items-center mb-6">
      <BackButton to="/admin/products" />
      <div className="ml-3">
        <Text as="h3">Ubah produk</Text>
      </div>
    </div>
  );

  if (status === asyncStatus.error) {
    return (
      <LayoutOne>
        <TopBar/>
        {header}
        <ErrorState message="Gagal memuat data produk." onRetry={fetchProduct} />
      </LayoutOne>
    );
  }

  if (status !== asyncStatus.success || !product) {
    return (
      <LayoutOne>
        <TopBar/>
        {header}
        <Skeleton height="2.5rem" className="mb-6" />
        <Skeleton height="6rem" className="mb-6" />
        <Skeleton height="2.5rem" width="12rem" />
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar/>
      {header}
      <ProductForm defaultValues={product} onSubmit={handleSubmit} submitLabel="Simpan perubahan" />
    </LayoutOne>
  );
}
