import { Menu, MenuProps } from "antd";
import { AiOutlineInfoCircle, AiOutlineTransaction } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const UserPageSideBar: React.FC = () => {
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items: MenuProps["items"] = [
    getItem("Information", "information", <AiOutlineInfoCircle/>),
    getItem("Orders", "orders", <AiOutlineTransaction />)
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    switch(e.key){
        case 'information':
            navigate('');
            break;
        case 'orders':
            navigate('orders');
            break;
    }
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};