import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AiFillShop, AiOutlineShoppingCart } from "react-icons/ai";
import { Button, Card, Col, Menu, Row } from "antd";
import { FiSettings } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { useActions } from "../../hooks/useActions";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
const Navbar = () => {
  const { isAuth, user } = useTypedSelector((store) => store.auth);
  const { products } = useTypedSelector((store) => store.cart);
  const navigate = useNavigate();
  return (
    <Row justify="center">
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Header className="header-fixed">
          <Row>
            <Col xl={12} lg={12} md={12} sm={20} xs={20}>
              <Link to="/" className="text-decoration-none">
                <Title id="title-button" level={4}>
                  <p className="text-white">
                    <AiFillShop color="white"></AiFillShop> Cyrill Shop
                  </p>
                </Title>
              </Link>
            </Col>
            <Col xl={12} lg={12} md={12} sm={4} xs={4}>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={["products"]}
                theme="dark"
                // overflowedIndicator={<MenuOutlined />}
              >
                <Menu.Item key="profile">
                  <GrUserAdmin size={20}></GrUserAdmin>
                  Admin Panel
                </Menu.Item>

                <Menu.Item
                  key="products"
                  className="d-flex gap-2 justify-content-center align-items-center cursor-pointer "
                  onClick={() => navigate("/")}
                >
                  <p className="p-0 m-0">Products</p>
                </Menu.Item>

                {isAuth ? (
                  <Menu.Item key="cart" onClick={() => navigate("/cart")}>
                    <div className="d-flex gap-2 justify-content-center align-items-center cursor-pointer ">
                      <AiOutlineShoppingCart size={20}></AiOutlineShoppingCart>
                      <p className="cart-items-quantity">
                        {products.reduce((sum, pr) => {
                          return sum + pr.quantity;
                        }, 0)}
                      </p>
                    </div>
                  </Menu.Item>
                ) : (
                  <>
                    <Menu.Item key="login" onClick={() => navigate("/login")}>
                      Вхід
                    </Menu.Item>
                    <Menu.Item
                      key="register"
                      onClick={() => navigate("/register")}
                    >
                      Реєстрація
                    </Menu.Item>
                  </>
                )}

                <Menu.Item
                  key="settings"
                  onClick={() => navigate("/settings")}
                  className="d-flex justify-content-center"
                >
                  <FiSettings size={20}></FiSettings>
                </Menu.Item>

                {/* <Menu.Item key={"item2"}>item2</Menu.Item>
                <Menu.Item key={"item3"}>item3</Menu.Item> */}
              </Menu>
            </Col>
          </Row>
        </Header>
        {/* <Content>{props.children}</Content> */}
      </Col>
    </Row>
    // <header>
    //   <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    //     <div className="container">
    //       <Link className="navbar-brand" to="/">
    //         <div className="d-flex gap-1">
    //           <AiFillShop size={25}></AiFillShop>
    //           <h5 className="p-0 m-0">Shop</h5>
    //         </div>
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarCollapse"
    //         aria-controls="navbarCollapse"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarCollapse">
    //         <ul className="navbar-nav me-auto mb-2 mb-md-0">
    //           <li className="nav-item">
    //             <Link className="nav-link active" aria-current="page" to="/">
    //               Головна
    //             </Link>
    //           </li>
    //         </ul>
    //         {isAuth ? (
    //           <ul className="navbar-nav">
    //             <li className="nav-item text-white">{user.email}</li>
    //             <li className="nav-item">
    //               <Link
    //                 to="/cart"
    //                 className="d-flex gap-2 justify-content-center align-items-center cursor-pointer text-decoration-none text-white"
    //               >
    //                 <h5 className="p-0 m-0">Кошик</h5>
    //                 <AiOutlineShoppingCart size={20}></AiOutlineShoppingCart>
    //               </Link>
    //             </li>
    //           </ul>
    //         ) : (
    //           <ul className="navbar-nav">
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/login">
    //                 Вхід
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/register">
    //                 Реєстрація
    //               </Link>
    //             </li>
    //           </ul>
    //         )}
    //         <ul className="navbar-nav">
    //         <li className="nav-link">
    //               <Card style={{ width: "max-content" }}>
    //                 <Button
    //                   onClick={async () => await ChangeTheme(!isDarkTheme)}
    //                 >
    //                   Change Theme to {isDarkTheme ? "Light" : "Dark"}
    //                 </Button>
    //               </Card>
    //             </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </header>
  );
};
export default Navbar;
