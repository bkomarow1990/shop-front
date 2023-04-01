import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductCardCart } from "./ProductCardCart/ProductCard";

export const Cart: React.FC = () => {
  const { products } = useTypedSelector((store) => store.cart);
  return (
    <div>
      {products.length > 0 ? (
        <div className="card-wrapper">
          {products.map((pr) => (
            <ProductCardCart
              product={pr}
            > </ProductCardCart>
          ))}
        </div>
      ) : (
        <h3 className="text-center mt-3">NOT FOUND PRODUCTS IN CART</h3>
        )}
        {products.length > 0 ? (
          <div className="btn btn-primary w-100 p-3 m-4">Замовити</div>

        ) : <></>}
    </div>
  );
};
