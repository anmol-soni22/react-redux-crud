import { useDispatch } from "react-redux";
import { fetchProductsApi } from "../api/productApi";
import { setProducts } from "../store/productSlice";

export const useFetchProducts = () => {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const productsData = await fetchProductsApi();
      dispatch(setProducts(productsData.products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return fetchProducts;
};
