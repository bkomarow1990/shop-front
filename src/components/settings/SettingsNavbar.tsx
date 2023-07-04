import { Menu, Layout } from "antd";
import {MdOutlineDesignServices} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
const { Sider } = Layout;

export const SettingsNavbar: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((pathname) => pathname);
const navigate = useNavigate();
  return (
    <Sider width={200}>
      <Menu mode="inline" defaultSelectedKeys={["appearance"]} selectedKeys={pathnames.length > 1 ? pathnames : ['appearance']}>
      <Menu.Item key="appearance" icon={<MdOutlineDesignServices />} onClick={() => navigate('/settings/appearance')}>
          Вигляд
        </Menu.Item>
      <Menu.Item key="profile" icon={<CgProfile />} onClick={() => navigate('/settings/profile')}>
          Профіль
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
