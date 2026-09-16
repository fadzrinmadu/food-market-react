import * as React from 'react';
import { Badge, Button, ErrorState, LayoutOne, Table, Text } from '../../components/ui';
import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import BackButton from '../../components/BackButton';
import { useAddressData } from '../../hooks/address';
import { deleteAddress, setPrimaryAddress } from '../../api/address';

export default function UserAddress() {
  let {
    data,
    limit,
    page,
    status,
    count,
    setPage,
    refetch,
  } = useAddressData();

  const handleSetPrimary = async alamat => {
    await setPrimaryAddress(alamat._id);
    refetch();
  };

  const handleDelete = async alamat => {
    if (!window.confirm(`Hapus alamat "${alamat.nama}"?`)) return;
    await deleteAddress(alamat._id);
    refetch();
  };

  const columns = [
    {Header: 'Nama', accessor: alamat => {
      return <div>
        {alamat.nama} {alamat.isPrimary ? <Badge color="green">Utama</Badge> : null}
      </div>
    }},
    {Header: 'Detail', accessor: alamat => {
      return <div>
        {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan}, {alamat.kelurahan} <br/>
        {alamat.detail}
      </div>
    }},
    {Header: 'Aksi', accessor: alamat => {
      return <div className="flex">
        <div className="mr-2">
          <Link to={`/alamat-pengiriman/${alamat._id}/ubah`}>
            <Button size="small" color="blue">Ubah</Button>
          </Link>
        </div>
        {!alamat.isPrimary ? (
          <div className="mr-2">
            <Button size="small" color="green" onClick={() => handleSetPrimary(alamat)}>
              Jadikan utama
            </Button>
          </div>
        ) : null}
        <Button size="small" color="red" onClick={() => handleDelete(alamat)}>
          Hapus
        </Button>
      </div>
    }},
  ]

  return (
    <LayoutOne size="large">
      <div>
        <TopBar/>
        <div className="flex items-center">
          <BackButton to="/" />
          <div className="ml-3">
            <Text as="h3"> Alamat pengiriman </Text>
          </div>
        </div>
        <br />

        <div>
          <Link to="alamat-pengiriman/tambah">
            <Button>
              Tambah baru
            </Button>
          </Link>
          <br />
          <br />
          {status === 'error' ? (
            <ErrorState message="Gagal memuat daftar alamat." onRetry={refetch} />
          ) : (
            <Table
              items={data}
              columns={columns}
              totalItems={count}
              page={page}
              perPage={limit}
              isLoading={status === 'process'}
              onPageChange={page => setPage(page)}
            />
          )}
        </div>

        {status === 'success' && !data.length ? <div className="text-center p-10">
          Kamu belum menambahkan alamat pengiriman. <br/>
          <Link to="/alamat-pengiriman/tambah">
            <Button> Tambah Baru </Button>
          </Link>
        </div> : null}

      </div>
    </LayoutOne>
  )
}
