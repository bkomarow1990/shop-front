import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { Tree } from "antd";
import { Category } from "./types";
import { DataNode, EventDataNode } from "antd/es/tree";
import { TreeNode } from "antd/es/tree-select";
import { Key } from "antd/es/table/interface";

  
export interface CategoriesProps{
  onCategoryChange: (categoryId: string) => void;
}
export const Categories: React.FC<CategoriesProps> = ({onCategoryChange}) => {
  const { GetCategories } = useActions();
  //const [treeData, setTreeData] = useState<DataNode[]>();
  const { categories } = useTypedSelector((store) => store.product);
  useEffect(() => {
    GetCategories();
    //treeData = createTree(categories)
    //setTreeData(createTree(categories));
    //console.log(categories);
    //console.log(treeData);
    }, []);
    const handleSelect = (electedKeys: Key[], info: { event: "select"; selected: boolean; node: EventDataNode<DataNode>; selectedNodes: DataNode[]; nativeEvent: MouseEvent; }) => {
      // Check if the clicked node is a leaf node (i.e. has no children)
      //if (!node.props.children) {
        if(info.node.children &&  info.node.children.length === 0){
          //console.log('Last node clicked:', info.node.key);
          //console.log(info.node.children);
          onCategoryChange(info.node.key.toString());
        }
        // Perform your action here
      //}
    };
    // const handleNodeClick : NodeMouseEventHandler | undefined  = (e, treeNode) => {
    //     if (treeNode.children) {
    //       handleCategoryClick(treeNode);
    //     }
    //   };
    const createTree = (categories: Category[]): DataNode[] => {
        // Мапимо категорії до відповідної структури дерева
        if (!Array.isArray(categories)) {
            return [];
          }
        return categories.map((category) => ({
            key: category.id,
            title: category.name,
            children: createTree(category.subcategories),
          }));
      };
    let treeData = createTree(categories);
  // Функція для створення дерева елементів
//   const createTree = (items: Category[]): Category[] => {

//     // Мапимо фільтровані елементи до відповідної структури дерева
//     return items.map((item) => ({
//       key: item.id,
//       title: item.name,
//       children: createTree(items, item.id),
//     }));
//   };
//   const treeData = createTree(categories);

  return (
    <>
      <Tree treeData={treeData} onSelect={handleSelect}></Tree>
    </>
  );
};
