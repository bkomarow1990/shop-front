import { Col, Divider, Row } from "antd";
import { Outlet } from "react-router-dom";
import { SettingsNavbar } from "../../components/settings/SettingsNavbar";

export const SettingsLayout = () => {
  return (
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8} >
         <SettingsNavbar></SettingsNavbar>
        </Col>
        <Col xs={24} lg={16}>
          <Outlet />
        </Col>
      </Row>
  );
};
