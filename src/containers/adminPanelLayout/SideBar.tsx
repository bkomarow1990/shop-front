import { Breadcrumb, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {FiUsers} from 'react-icons/fi';
import { useActions } from "../../hooks/useActions";
import { MdOutlineCategory } from "react-icons/md";
import { GrShop } from "react-icons/gr";
const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((pathname) => pathname);
  const { LogoutUser } = useActions();
 
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        {pathnames.map((pathname, index) => (
          <Breadcrumb.Item key={index}>
            <Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>{pathname}</Link>
          </Breadcrumb.Item>
        ))}
        </Breadcrumb>
      <Menu mode="inline" defaultSelectedKeys={["users"]} selectedKeys={pathnames}>
      <Menu.Item key="users" icon={<FiUsers />} onClick={() => navigate('/adminPanel/users')}>
          Користувачі
      </Menu.Item>
      <Menu.Item key="categories" icon={<MdOutlineCategory />} onClick={() => navigate('/adminPanel/categories')}>
          Категорії товарів
      </Menu.Item>
      <Menu.Item key="products" icon={<GrShop />} onClick={() => navigate('/adminPanel/products')}>
          Товари
      </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;