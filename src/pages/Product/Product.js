import React from "react";
import { Button, LayoutOne, Table, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useProductData from "../../hooks/product";

const columns = [
  {
    Header: "Nama",
    accessor: "name",
  },
  {
    Header: "Kategori",
    accessor: "category",
  },
  {
    Header: "Diskon",
    accessor: "discount",
  },
  {
    Header: "Harga",
    accessor: "price",
  },
  {
    Header: "Gambar",
    accessor: "imageUrl",
    Cell: ({ value }) => (
      <img
        src={value}
        alt="Product"
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
        }}
      />
    ),
  },
];

const Product = () => {
  const {
    data: {
      count,
      data,
      page,
      status,
    },
    method: {
      setPage,
    },
  } = useProductData();
  
  return (
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text as="h3">Produk Anda</Text>
        <br />
        
        <div>
          <Link to="alamat-pengiriman/tambah">
            <Button>
              Tambah baru
            </Button>
          </Link>
          <br />
          <br />
          <Table
            items={data}
            totalItems={count}
            columns={columns}
            onPageChange={(page) => setPage(page)}
            page={page}
            isLoading={status === "process"}
          />
        </div>
        
        {status === "success" && !data.length && (
          <div className="text-center p-10">
            Kamu belum menambahkan produk.<br/>
            <Link to="/alamat-pengiriman/tambah">
              <Button>Tambah Baru</Button>
            </Link>
          </div>
        )} 
      </div>
    </LayoutOne>
  );
};

export { Product };
