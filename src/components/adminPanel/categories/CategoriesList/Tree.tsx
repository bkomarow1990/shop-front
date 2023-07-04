import { Button } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import Title from "antd/es/typography/Title";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useActions } from "../../../../hooks/useActions";
import Swal from "sweetalert2";
export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  level: number;
  isCollapsed?: boolean;
}

export interface TreeProps {
  treeData: TreeNode[];
  onSelect: (nodeId: string) => void;
  onDelete: (id: string) => void;
}

export const Tree: React.FC<TreeProps> = ({ treeData, onSelect, onDelete }) => {
 
  const handleCollapseToggle = (nodeId: string) => {
    const updatedTreeData = toggleCollapse(treeData, nodeId);
    // Виконайте необхідні дії з оновленими даними дерева
  };

  const toggleCollapse = (data: TreeNode[], nodeId: string): TreeNode[] => {
    return data.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          isCollapsed: !node.isCollapsed,
        };
      }

      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: toggleCollapse(node.children, nodeId),
        };
      }

      return node;
    });
  };

  const renderTree = (data: TreeNode[]): JSX.Element[] => {
    

    return data.map((node) => (
      <div key={node.id} style={{ marginLeft: node.level * 20 }}>
        <div>
          {/* {node.children!.length > 0 && (
            <Button onClick={() => handleCollapseToggle(node.id)}>
              {node.isCollapsed ? "+" : "-"}
            </Button>
          )} */}
          <Title level={3} className="mb-2">
            {node.label}
          </Title>
          <ButtonGroup>
            <Button type="primary" size="large"  onClick={() => onSelect(node.id)}  icon={ <AiFillEdit size={25}/>}>
             
            </Button>
            <Button size="large" icon={<AiFillDelete size={25}/>} danger onClick={() => {
              if(node.children && node.children.length > 0){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Для початку видаліть підкатегорії. Не повинно бути підкатегорій.",
                });
              }
              else{
                onDelete(node.id)}
              }
            }>
            </Button>
          </ButtonGroup>
        </div>
        {!node.isCollapsed && node.children && renderTree(node.children)}
      </div>
    ));
  };

  return <div>{renderTree(treeData)}</div>;
};
