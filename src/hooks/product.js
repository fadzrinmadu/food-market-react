import { useEffect, useState, useCallback } from "react";

import { config } from "../config";
import { formatRupiah } from "../utils/format-rupiah";
import { getProducts } from "../api/product";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const useProductData = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(statusList.idle);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  
  const mapProductsData = (data) => {
    return data && data.length && data.map((item) => ({
      id: item._id || "",
      name: item.name || "",
      category: item.category.name || "",
      discount: `${item.discount || 0}%`,
      price: formatRupiah(item.price || 0),
      imageUrl: `${config.api_host}/upload/${item.image_url || ""}`,
    }));
  };
  
  const fetchProducts = useCallback(async () => {
    setStatus(statusList.process);
    
    const response = await getProducts({ limit, offset });
    const responseData = response.data;
    const productsData = mapProductsData(responseData.data);
    const productsCount = responseData.count;
    
    setStatus(statusList.success);
    setData(productsData);
    setCount(productsCount);
  }, [limit, offset]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  useEffect(() => {
    setOffset(page * limit - limit);
  }, [page, limit]);
  
  return {
    data: {
      count,
      data,
      page,
      status,
    },
    method: {
      setPage,
    },
  };
};

export default useProductData;
