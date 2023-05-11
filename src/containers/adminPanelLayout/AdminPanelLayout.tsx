import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export const AdminPanelLayout = () => {
  return (
    <Row gutter={[16, 16]} className="pt-2">
      <Col xs={24} lg={8}>
        <SideBar></SideBar>
      </Col>
      <Col xs={24} lg={16}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default AdminPanelLayout;
