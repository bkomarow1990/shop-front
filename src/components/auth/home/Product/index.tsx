
import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { Button, Card, InputNumber, Modal } from "antd";
import { IProductProps } from "./types";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useParams, useSearchParams } from "react-router-dom";

export const Product: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { AddToCart, GetProduct } = useActions();
  const { product } = useTypedSelector((state) => state.product);
  const [inCartQuantity, setInCartQuantity] = useState<number | null>(1);
  const [params, setParams] = useSearchParams();
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
    <>
      {product ? (
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
            <h5 className="card-text">{product.category.name}</h5>
            <p>{product.stockQuantity} units avaliable</p>
            <p>{product.description} units avaliable</p>
            <h3>{product.price} ₴</h3>
          </div>
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
          <Modal
            title="Підтвердження"
            open={isModalOpen}
            onOk={handleAddToCart}
            onCancel={() => setIsModalOpen(false)}
          >
            <p>Ви дійсно хочете додати товар до кошика?</p>
          </Modal>
        </Card>
      ) : (
        <h1 className="text-center">Not found product</h1>
      )}
    </>
  );
};
