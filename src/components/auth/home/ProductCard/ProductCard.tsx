import { IProductProps } from "./types";
import './styles.css';
import { useState } from "react";
import Modal from "react-modal";
import { useActions } from "../../../../hooks/useActions";

export const ProductCard: React.FC<IProductProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { AddToCart } = useActions();
  Modal.setAppElement('#root'); // set the appElement
  const customStyles = {
    content: {
      backgroundColor: 'white',
      border: '1px solid black',
      padding: '10px',
      borderRadius: '10px',
      marginTop: '30vh',
      marginRight: 'auto',
      width: '300px',
    },
  };
  const handleAddToCart = async () => {
    await AddToCart( product );
    setIsModalOpen(false);
    //{id: id, name: name, description: description,  price: price,  stockQuantity: stockQuantity, category: category, imageName: imageName}
  };

  return <div className="card">
  <img className="card-img-top" src={product.imageName ? process.env.REACT_APP_SERVER_URL as string + process.env.REACT_APP_PRODUCTS_IMAGES_PATH + product.imageName : process.env.REACT_APP_NOT_FOUND_IMAGE_PRODUCT} alt="product" />
  <div className="card-body">
    <h5 className="card-title">Name: {product.name}</h5>
    <p className="card-text">Description: {product.description}</p>
    <p className="card-text">Price: {product.price}</p>
    <p className="card-text">Quantity: {product.stockQuantity}</p>
    <p className="card-text">Category: {product.category.name}</p>
    {/* <a href="#" className="btn btn-primary">Перейти до товару</a> */}
    <div className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Додати в кошик</div>
  </div>
  <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal-dialog" style={customStyles} >
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
        </Modal>
</div>;
};
