import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import EclipseWidget from "../../../common/Eclipse";
import { ICategory } from "../types";
import { DataNode, EventDataNode } from "antd/es/tree";
import { Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { Tree, TreeNode } from "./Tree";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {IoIosAddCircle} from "react-icons/io";

export const CategoriesList : React.FC = () => {
    const { GetAdminCategories, DeleteAdminCategory } = useActions();
    const onDelete = (id: string) => {
      DeleteAdminCategory(id);
    }
    const navigate = useNavigate();
    const { isLoading, categories } = useTypedSelector(store => store.adminCategory);
    const createTree = (categories: ICategory[], level = 0): TreeNode[] => {
        // Мапимо категорії до відповідної структури дерева
        if (!Array.isArray(categories)) {
            return [];
          }
        return categories.map((category) => ({
            id: category.id,
            label: category.name,
            level: level,
            children: createTree(category.subcategories, level + 1),
          }));
      };
    //   const handleSelect = (electedKeys: Key[], info: { event: "select"; selected: boolean; node: EventDataNode<DataNode>; selectedNodes: DataNode[]; nativeEvent: MouseEvent; }) => {
          
    //     if(info.node.children &&  info.node.children.length === 0){
    //       //  onCategoryChange(info.node.key.toString());
    //       }
    //   };
      const handleSelect = (nodeId: string) => {
          navigate(nodeId);
      };
    const [treeData, setTreeData] = useState<TreeNode[]>(createTree(categories));
    useEffect(() => {
        GetAdminCategories();
    },[]);
    useEffect(() => {
      setTreeData(createTree(categories));
    },[categories]);
    return (
        <div className="pt-3">
        {isLoading && <EclipseWidget/>}
        <Button type='primary' onClick={() => navigate('create')} className="d-flex align-items-center pb-4 pt-4"> 
          <IoIosAddCircle size={30}/>
          </Button>
        <Tree treeData={treeData} onSelect={handleSelect} onDelete={onDelete}></Tree>
        </div>
    
    )
}