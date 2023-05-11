import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {FiUsers} from 'react-icons/fi';
import { useActions } from "../../hooks/useActions";
import { MdOutlineCategory } from "react-icons/md";
const SideBar = () => {
  const navigate = useNavigate();
  const { LogoutUser } = useActions();
 
  return (
    <Menu mode="inline" defaultSelectedKeys={["users"]}>
    <Menu.Item key="users" icon={<FiUsers />} onClick={() => navigate('/adminPanel/users')}>
        Users
    </Menu.Item>
    <Menu.Item key="categories" icon={<MdOutlineCategory />} onClick={() => navigate('/adminPanel/categories')}>
        Categories
    </Menu.Item>
    </Menu>
  );
};

export default SideBar;