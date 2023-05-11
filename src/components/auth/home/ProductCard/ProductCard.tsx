import { IProductCardProps } from "./types";
import "./styles.scss";
import { useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { Button, Card, InputNumber, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { AddToCart } = useActions();
  const navigate = useNavigate();
  const [inCartQuantity, setInCartQuantity] = useState<number | null>(1);
  const customStyles = {
    content: {
      backgroundColor: "white",
      border: "1px solid black",
      padding: "10px",
      borderRadius: "10px",
      marginTop: "30vh",
      marginRight: "auto",
      width: "300px",
    },
  };
  // const onChangeQuantityToCart = (value: number | null) => {
  //   if(value){
  //     console.log('changed', value);
  //   }
  // };
  const handleAddToCart = async () => {
    setIsModalOpen(false);
    await AddToCart({
      product: product,
      quantity: inCartQuantity ? inCartQuantity : 1,
    });
    //{id: id, name: name, description: description,  price: price,  stockQuantity: stockQuantity, category: category, imageName: imageName}
  };

  return (
    <Card
      hoverable
      className="my-card"
      cover={
        <img
          className="card-img-top"
          src={
            product.imageName
              ? (process.env.REACT_APP_SERVER_URL as string) +
                process.env.REACT_APP_PRODUCTS_IMAGES_PATH +
                product.imageName
              : process.env.REACT_APP_NOT_FOUND_IMAGE_PRODUCT
          }
          alt="product"
        />
      }
    >
      <div>
        <h4>{product.name}</h4>
        {/* <h5 className="card-text">{product.category.name}</h5> */}
        <p>{product.stockQuantity} units avaliable</p>
        <h3>{product.price} ₴</h3>
        {/* <a href="#" className="btn btn-primary">Перейти до товару</a> */}
      </div>
      <div className="d-flex flex-column">
      <div className="d-flex gap-2 p-3">
        <InputNumber
          min={1}
          max={1000}
          defaultValue={1}
          onChange={(ev) => setInCartQuantity(ev)}
          value={inCartQuantity}
        />
        <Button onClick={() => setIsModalOpen(true)}>Додати в кошик</Button>
      </div>
        <Button onClick = {() => navigate({pathname : '/product', search : `productId=${product.id}`})}>Перейти до товару</Button>
      </div>
      <Modal
        title="Підтвердження"
        open={isModalOpen}
        onOk={handleAddToCart}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Ви дійсно хочете додати товар до кошика?</p>
      </Modal>
      {/* <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal-dialog" style={customStyles} >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Додати товар до кошика</h5>

            </div>
            <div className="modal-body ">
              <p>Ви дійсно бажаєте додати товар до кошика?</p>
            </div>
            <div className="modal-footer d-flex gap-2 ">
              <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Закрити</button>
              <button type="button" className="btn btn-primary" onClick={handleAddToCart}>Додати</button>
            </div>
          </div>
        </Modal> */}
    </Card>
  );
};
