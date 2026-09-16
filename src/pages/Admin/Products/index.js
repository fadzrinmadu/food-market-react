import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, LayoutOne, Table, Text } from '../../../components/ui';

import TopBar from '../../../components/TopBar';
import BackButton from '../../../components/BackButton';
import { getImageUrl } from '../../../utils/getImageUrl';
import { formatRupiah } from '../../../utils/formatRupiah';
import { asyncStatus } from '../../../constants/asyncStatus';
import { getProducts, deleteProduct } from '../../../api/product';

const LIMIT = 10;

export default function AdminProducts() {
  let [products, setProducts] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState(asyncStatus.idle);
  let [page, setPage] = React.useState(1);

  const fetchProducts = React.useCallback(async () => {
    setStatus(asyncStatus.process);

    let { data: { data, count } } = await getProducts({
      limit: LIMIT,
      skip: (page * LIMIT) - LIMIT,
    });

    setStatus(asyncStatus.success);
    setProducts(data);
    setCount(count);
  }, [page]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async product => {
    if (!window.confirm(`Hapus produk "${product.name}"?`)) return;
    await deleteProduct(product._id);
    fetchProducts();
  };

  const columns = [
    {
      Header: 'Gambar',
      accessor: product => product.image_url
        ? <img className="h-12 w-12 object-cover rounded" src={getImageUrl(product.image_url)} alt={product.name} />
        : null,
    },
    { Header: 'Nama', accessor: 'name' },
    { Header: 'Kategori', accessor: product => product.category?.name },
    { Header: 'Harga', accessor: product => formatRupiah(product.price) },
    {
      Header: 'Aksi',
      accessor: product => (
        <div className="flex">
          <div className="mr-2">
            <Link to={`/admin/products/${product._id}/ubah`}>
              <Button size="small" color="blue">Ubah</Button>
            </Link>
          </div>
          <Button size="small" color="red" variant="outline" onClick={() => handleDelete(product)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <LayoutOne size="large">
      <TopBar/>
      <div className="flex items-center">
        <BackButton to="/" />
        <div className="ml-3">
          <Text as="h3">Kelola Produk</Text>
        </div>
      </div>
      <br />

      <Link to="/admin/products/tambah">
        <Button>Tambah produk</Button>
      </Link>
      <br />
      <br />

      <Table
        items={products}
        columns={columns}
        totalItems={count}
        perPage={LIMIT}
        page={page}
        isLoading={status === asyncStatus.process}
        onPageChange={page => setPage(page)}
      />
    </LayoutOne>
  );
}
