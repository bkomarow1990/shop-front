import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import axios from "axios";
import { Category } from "../../../auth/home/Categories/types";
import instance from "../../../../api/configurations";
import { useParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
const { Option } = Select;
const { Title } = Typography;
export interface CategoryProps {
  handleSubmit: (values: any) => void;
  isEdit: boolean;
}
export interface IBaseCategory{
  id: string;
  name: string;
}
export interface CategoryWithSubCategories extends IBaseCategory{
  subcategories: IBaseCategory[];
  parentCategory: IBaseCategory;
}

interface ParentCategoryType {
  value: string;
  label: string;
}
export const CategoryCRUD: React.FC<CategoryProps> = ({ handleSubmit, isEdit }) => {
  const { id } = useParams<{ id: string }>();
  const { GetAdminAllCategories } = useActions();
  const [subCategories, setSubCategories] = useState<IBaseCategory[]>([]);
  const { allCategories, isAllCategoriesLoading } = useTypedSelector(store => store.adminCategory);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {

        //setLoading(true);
        const response = await instance.get<CategoryWithSubCategories>(
          'api/Category/get-category-with-sub-categories',
          { params: { categoryId: id } }
        );
        const { name, parentCategory } = response.data;
        //console.log(response.data.subcategories);
        //console.log(parentCategory);
        setSubCategories(response.data.subcategories);
        //console.log(response.data.parentCategory);
        form.setFieldsValue({ name: name, parentId: parentCategory?.name  });
        //, subcategories
        // setOptions(
        //   subcategories.map((sc) => ({ value: sc.id, label: sc.name }))
        // );
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        //setLoading(false);
      }
    };
    GetAdminAllCategories(false);
    console.log(allCategories);
    if(isEdit){
      fetchData();
    }
  }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     instance
  //     .get<Category>("api/Category/get-category-with-sub-categories", {params: {categoryId: id}})
  //     .then((response) => {
  //       setName(response.data.name);
  //       setOptions(response.data.subcategories.map(sc => {return {value: sc.id, label: sc.name}}));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching options:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //   }
  //   setLoading(true);
  //   fetchData();
  //   // Make an API call to fetch options for the ComboBox
    
  // }, []);
 // const [options, setOptions] = useState<ParentCategoryType[]>([]);
  //const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} initialValues={{ name: '' }}>
        {isEdit && <Title className="mb-3" level={5}>Id: {id}</Title>}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter a name",
            },
          ]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="Parent Category"
          name="parentId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select an option",
          //   },
          // ]}
        >
          <Select loading={isAllCategoriesLoading}>
            {allCategories.filter(c => c.id !== id).map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
              
            ))}
            <Option value={null}>
                NONE
              </Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? 'Редагувати' : 'Додати'}
          </Button>
        </Form.Item>
      </Form>
      <div>
        {subCategories && subCategories.length > 0 && (<Title>
          Subcategories:
        </Title>)
        }
        {
          subCategories?.map(sc => (
            <Typography key={sc.id}>{sc.name}</Typography>
          ))
        }
      </div>
    </div>
  );
};
