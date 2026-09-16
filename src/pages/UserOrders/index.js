import * as React from 'react';
import { Button, InputText, LayoutOne, Table, Text } from '../../components/ui';
import { Link } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import BackButton from '../../components/BackButton';
import StatusLabel from '../../components/StatusLabel';
import { formatRupiah } from '../../utils/formatRupiah';
import { sumPrice } from '../../utils/sumPrice';
import { asyncStatus } from '../../constants/asyncStatus';
import FaFileInvoiceDollar from '@meronex/icons/fa/FaFileInvoiceDollar';
import {getOrders} from '../../api/order';

const columns = [
  {
    Header: '',
    id: 'Status',
    accessor: order => {
      return <div>
        #{order.order_number} <br/>
        <StatusLabel status={order.status}/>
      </div>
    }
  },
  {
    Header: 'Tanggal',
    accessor: order => new Date(order.createdAt).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  },
  {
    Header: 'Items',
    accessor: order => {
      return <div>
        {order.order_items.map(item => {
          return <div key={item._id}>
            {item.name} {item.qty}
          </div>
        })}
      </div>
    }
  },
  {
    Header: 'Total',
    accessor: order => {
      return <div>
        {formatRupiah(sumPrice(order.order_items) + order.delivery_fee)}
      </div>
    }
  },
  {
    Header: 'Invoice',
    accessor: order => {
      return <div>
        <Link to={`/invoice/${order._id}`}>
          <Button color="gray" iconBefore={<FaFileInvoiceDollar/>}>
            Invoice
          </Button>
        </Link>
      </div>
    }
  }
];

export default function UserOrders() {
  let [pesanan, setPesanan] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState(asyncStatus.idle);
  let [page, setPage] = React.useState(1);
  let [limit] = React.useState(10);
  let [startDate, setStartDate] = React.useState('');
  let [endDate, setEndDate] = React.useState('');

  const fetchPesanan = React.useCallback( async () => {
    setStatus(asyncStatus.process);

    let { data } = await getOrders({limit, page, startDate, endDate});

    if (data.error) {
      setStatus(asyncStatus.error);
      return;
    }

    setStatus(asyncStatus.success);
    setPesanan(data.data);
    setCount(data.count);
  }, [page, limit, startDate, endDate]);

  React.useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

	return (
    <LayoutOne>
      <TopBar/>
      <div className="flex items-center">
        <BackButton to="/" />
        <div className="ml-3">
          <Text as="h3">Pesanan Anda</Text>
        </div>
      </div>
      <br />

      <div className="flex items-center mb-5">
        <div className="mr-2">
          <Text as="small">Dari tanggal</Text>
          <InputText
            type="date"
            value={startDate}
            onChange={e => { setPage(1); setStartDate(e.target.value); }}
          />
        </div>
        <div>
          <Text as="small">Sampai tanggal</Text>
          <InputText
            type="date"
            value={endDate}
            onChange={e => { setPage(1); setEndDate(e.target.value); }}
          />
        </div>
      </div>

      <Table
        items={pesanan}
        totalItems={count}
        columns={columns}
        onPageChange={ page => setPage(page)}
        page={page}
        isLoading={status === asyncStatus.process}
      />
    </LayoutOne>
  )
}
