import * as React from 'react'; 

import { getAddress } from '../api/address';
import { asyncStatus } from '../constants/asyncStatus';

export function useAddressData() {
  let [data, setData] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState(asyncStatus.idle);
  let [page, setPage] = React.useState(1);
  let [limit, setLimit] = React.useState(10);

  let fetchAddress = React.useCallback(async function() {
    setStatus(asyncStatus.process);

    let { data: {data, count, error}} = await getAddress({page, limit});

    if (error) {
      setStatus(asyncStatus.error);
      return
    }

    setStatus(asyncStatus.success);
    setData(data); 
    setCount(count);
  }, [page, limit]); 
  
  React.useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return {
    data, 
    count, 
    status, 
    page, 
    limit, 
    setPage, 
    setLimit
  }
}
