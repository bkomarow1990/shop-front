import { Menu, Layout } from "antd";
import {MdOutlineDesignServices} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

export const SettingsNavbar: React.FC = () => {
const navigate = useNavigate();
  return (
    <Sider width={200}>
      <Menu mode="inline" defaultSelectedKeys={["appearance"]}>
      <Menu.Item key="appearance" icon={<MdOutlineDesignServices />} onClick={() => navigate('/settings/appearance')}>
          Вигляд
        </Menu.Item>
      <Menu.Item key="profile" icon={<CgProfile />}>
          Профіль
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
