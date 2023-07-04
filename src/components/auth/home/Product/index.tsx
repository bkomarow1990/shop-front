import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { Button, Card, InputNumber, Modal } from "antd";
import { IProductProps } from "./types";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./styles.scss";
import instance from "../../../../api/configurations";
import Swal from "sweetalert2";
export const Product: React.FC = () => {
  const {
    isAuth,
    user: { roles },
  } = useTypedSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { AddToCart, GetProduct } = useActions();
  const { product } = useTypedSelector((state) => state.product);
  const [inCartQuantity, setInCartQuantity] = useState<number | null>(1);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const deleteProduct = () => {
    const id = params.get("productId") as string | undefined;
    if(id){
      instance.delete(`/api/Product/delete-product?productId=${id}` )
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Успіх!',
          text: 'Продукт був успішно видалений!',
          showConfirmButton: false,
          timer: 1000
        });
        navigate(-1);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Помилка!',
          text: 'Помилка з видаленням товару',
          confirmButtonText: 'OK'
        });
      })
      ;
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Помилка',
        text: 'Id товару некоректний',
        confirmButtonText: 'OK'
      });
      navigate("/");
    }
    
  }
  const handleAddToCart = async () => {
    setIsModalOpen(false);
    if (product) {
      await AddToCart({
        product: {
          id: product.id,
          name: product.name,
          category: product.category,
          description: product.description,
          stockQuantity: product.stockQuantity,
          price: product.price,
          imageName: product.imageName,
          cartQuantity: product.cartQuantity,
        },
        quantity: inCartQuantity ? inCartQuantity : 1,
      });
    }
  };

  useEffect(() => {
    if (params.get("productId")) {
      GetProduct(params.get("productId") as string);
    }
  }, [params]);

  return (
    <div className="product-page">
      {product ? (
        <div>
          <div className="product-container">
            <div className="product-image">
              <img
                src={
                  product.imageName
                    ? (process.env.REACT_APP_SERVER_URL as string) +
                      process.env.REACT_APP_PRODUCTS_IMAGES_PATH +
                      product.imageName
                    : process.env.REACT_APP_NOT_FOUND_IMAGE_PRODUCT
                }
                alt="product"
              />
            </div>
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <h3 className="product-category">{product.category.name}</h3>
              <p className="product-stock">
                Available: {product.stockQuantity} units
              </p>
              <p className="product-description">{product.description}</p>
              <h3 className="product-price">{product.price} ₴</h3>
              <div className="product-actions">
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={1}
                  onChange={(value) => setInCartQuantity(value)}
                  value={inCartQuantity}
                />
                <Button
                  className="add-to-cart-button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            <Modal
              title="Confirmation"
              visible={isModalOpen}
              onOk={handleAddToCart}
              onCancel={() => setIsModalOpen(false)}
            >
              <p>Are you sure you want to add this item to your cart?</p>
            </Modal>
          </div>
          {isAuth && roles && roles.includes("Administrator") && (
            <div className='d-flex mt-3 gap-2'>
              <Button type='primary' onClick={() => navigate(`../adminPanel/products/${params.get("productId") as string}`)}>Edit</Button>
              <Button danger onClick={() => deleteProduct()}>Delete</Button>
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-center">Not found product</h1>
      )}
    </div>
  );
};

export default Product;
// export const Product : React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const { AddToCart, GetProduct } = useActions();
//   const { product } = useTypedSelector((state) => state.product);
//   const [inCartQuantity, setInCartQuantity] = useState<number | null>(1);
//   const [params, setParams] = useSearchParams();

//   const handleAddToCart = async () => {
//     setIsModalOpen(false);
//     if (product) {
//       await AddToCart({
//         product: {
//           id: product.id,
//           name: product.name,
//           category: product.category,
//           description: product.description,
//           stockQuantity: product.stockQuantity,
//           price: product.price,
//           imageName: product.imageName,
//           cartQuantity: product.cartQuantity,
//         },
//         quantity: inCartQuantity ? inCartQuantity : 1,
//       });
//     }
//   };

//   useEffect(() => {
//     if (params.get("productId")) {
//       GetProduct(params.get("productId") as string);
//     }
//   }, [params]);

//   return (
//     <div className="product-page">
//       {product ? (
//         <>
//           <div className="product-image">
//             <img
//               src={
//                 product.imageName
//                   ? (process.env.REACT_APP_SERVER_URL as string) +
//                     process.env.REACT_APP_PRODUCTS_IMAGES_PATH +
//                     product.imageName
//                   : process.env.REACT_APP_NOT_FOUND_IMAGE_PRODUCT
//               }
//               alt="product"
//             />
//           </div>
//           <div className="product-details">
//             <h2 className="product-name">{product.name}</h2>
//             <h3 className="product-category">{product.category.name}</h3>
//             <p className="product-stock">Available: {product.stockQuantity} units</p>
//             <p className="product-description">{product.description}</p>
//             <h3 className="product-price">{product.price} ₴</h3>
//             <div className="product-actions">
//               <InputNumber
//                 min={1}
//                 max={1000}
//                 defaultValue={1}
//                 onChange={(value) => setInCartQuantity(value)}
//                 value={inCartQuantity}
//               />
//               <Button className="add-to-cart-button" onClick={() => setIsModalOpen(true)}>Add to Cart</Button>
//             </div>
//           </div>
//           <Modal
//             title="Confirmation"
//             visible={isModalOpen}
//             onOk={handleAddToCart}
//             onCancel={() => setIsModalOpen(false)}
//           >
//             <p>Are you sure you want to add this item to your cart?</p>
//           </Modal>
//         </>
//       ) : (
//         <h1 className="text-center">Not found product</h1>
//       )}
//     </div>
//   );
// };

// export const Product2: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const { AddToCart, GetProduct } = useActions();
//   const { product } = useTypedSelector((state) => state.product);
//   const [inCartQuantity, setInCartQuantity] = useState<number | null>(1);
//   const [params, setParams] = useSearchParams();
//   const handleAddToCart = async () => {
//     setIsModalOpen(false);
//     if (product) {
//       await AddToCart({
//         product: {
//           id: product.id,
//           name: product.name,
//           category: product.category,
//           description: product.description,
//           stockQuantity: product.stockQuantity,
//           price: product.price,
//           imageName: product.imageName,
//           cartQuantity: product.cartQuantity,
//         },
//         quantity: inCartQuantity ? inCartQuantity : 1,
//       });
//     }
//   };
//   useEffect(() => {
//     if (params.get("productId")) {
//       GetProduct(params.get("productId") as string);
//     }
//   }, [params]);

//   return (
//     <>
//       {product ? (
//         <Card
//           hoverable
//           className="my-card"
//           cover={
//             <img
//               className="card-img-top"
//               src={
//                 product.imageName
//                   ? (process.env.REACT_APP_SERVER_URL as string) +
//                     process.env.REACT_APP_PRODUCTS_IMAGES_PATH +
//                     product.imageName
//                   : process.env.REACT_APP_NOT_FOUND_IMAGE_PRODUCT
//               }
//               alt="product"
//             />
//           }
//         >
//           <div>
//             <h4>{product.name}</h4>
//             <h5 className="card-text">{product.category.name}</h5>
//             <p>{product.stockQuantity} units avaliable</p>
//             <p>{product.description} units avaliable</p>
//             <h3>{product.price} ₴</h3>
//           </div>
//           <div className="d-flex gap-2 p-3">
//             <InputNumber
//               min={1}
//               max={1000}
//               defaultValue={1}
//               onChange={(ev) => setInCartQuantity(ev)}
//               value={inCartQuantity}
//             />
//             <Button onClick={() => setIsModalOpen(true)}>Додати в кошик</Button>
//           </div>
//           <Modal
//             title="Підтвердження"
//             open={isModalOpen}
//             onOk={handleAddToCart}
//             onCancel={() => setIsModalOpen(false)}
//           >
//             <p>Ви дійсно хочете додати товар до кошика?</p>
//           </Modal>
//         </Card>
//       ) : (
//         <h1 className="text-center">Not found product</h1>
//       )}
//     </>
//   );
// };
