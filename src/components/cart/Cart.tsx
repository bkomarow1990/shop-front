import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductCardCart } from "./ProductCardCart/ProductCardCart";
import { Button, Modal } from "antd";
import not_found from "../../assets/images/not_found.jpg";

export const Cart: React.FC = () => {
  const { products } = useTypedSelector((store) => store.cart);
  const { GetCart, HandleCart } = useActions();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () =>{
    setIsModalVisible(true);
  }
  const handleCancelModal = () =>{
    setIsModalVisible(false);
  }
  const handleCart = () =>{
    setIsModalVisible(false);
    if(products.length > 0){
      HandleCart(products);
    }
  }
  useEffect(() => {
    if (products.length > 0) {
      //console.log(products);
      //console.log(products.map(p => p.product.id));
      GetCart(products.map((p) => p.product.id));
      setTotalPrice(
        products
          .map((item) => item.product.price * item.quantity)
          .reduce((sum, val) => {
            return sum + val;
          })
      );
    }
  }, [products]);
  return (
    <div>
      {products.length > 0 ? (
        <div className="card-wrapper">
          {products.map((pr) => (
            <ProductCardCart product={pr.product} quantity={pr.quantity}>
              {" "}
            </ProductCardCart>
          ))}
        </div>
      ) : (

        <div className="d-flex align-items-center flex-column">
          <h3 className="text-center mt-3">NOT FOUND PRODUCTS IN CART</h3>
          <img src={not_found} alt="not found" />
        </div>
      )}
      {products.length > 0 ? (
        <div className="d-flex justify-content-center mt-4 gap-3">
          
            <div className="d-flex flex-column gap-2">
              <h3>Загальна сума: {totalPrice} UAH</h3>
              <Button className="w-100" onClick={showModal}>Замовити</Button>
            </div>
        </div>
      ) : (
        <></>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleCart}
        onCancel={handleCancelModal}
      >
        <p>Ви впевнені в замовлені даних товарів?</p>
      </Modal>
    </div>
  );
};
