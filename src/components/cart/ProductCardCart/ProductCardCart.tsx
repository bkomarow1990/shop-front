import { useActions } from '../../../hooks/useActions';
import './styles.css';
import { IProductCardCartProps } from './types';

export const ProductCardCart: React.FC<IProductCardCartProps> = ({ product, quantity }) => {
  const {RemoveFromCart} = useActions();
  return <div className="card">
  <img className="card-img-top" src={product.imageName ? process.env.REACT_APP_SERVER_URL as string + process.env.REACT_APP_PRODUCTS_IMAGES_PATH + product.imageName : process.env.REACT_APP_NOT_FOUND_IMAGE_PRODUCT} alt="product" />
  <div className="card-body">
    <h5 className="card-title">Name: {product.name}</h5>
    <p className="card-text">Description: {product.description}</p>
    <p className="card-text">Price: {product.price}</p>
    <p className="card-text">Stock Quantity: {product.stockQuantity}</p>
    <p className="card-text">Category: {product.category.name}</p>
    <p className="card-text">Quantity in cart: {quantity}</p>
    {/* <a href="#" className="btn btn-primary">Перейти до товару</a> */}
    <div className="btn btn-danger" onClick={async () => await RemoveFromCart(product.id)}>Видалити з кошику</div>
  </div>
</div>;
};
