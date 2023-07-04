import { Button, Form, Input, Upload, message, Image, Select } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IBaseCategory } from "../categories/types";
import instance from "../../../api/configurations";
const { Dragger } = Upload;
export interface CategoryProps {
  handleSubmit: (values: any) => void;
  isEdit: boolean;
}

export const ProductCRUD: React.FC<CategoryProps> = ({ handleSubmit, isEdit }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useTypedSelector(state => state.auth);
   const [imageUrl, setImageUrl] = useState<string | undefined>();
   const [categories, setCategories] = useState<IBaseCategory[]>([]);
   const [userId, setUserId] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [form] = Form.useForm();
    useEffect(() => {
      instance.get<IBaseCategory[]>('/api/Category/get-all', {params: {isOnlyWithParent: true}})
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        message.error('error with fetching categories');
      })
    }, []);
    useEffect(() => {
      // Fetch the product data if it's an edit mode
      if(!id && isEdit) navigate('/');
      if (isEdit) {
        instance.get(`/api/Product/get-product-by-id?productId=${id}`)
          .then(response => {
            const productData = response.data;
            form.setFieldsValue({
              name: productData.name,
              description: productData.description,
              price: productData.price,
              stockQuantity: productData.stockQuantity,
              userId: productData.userId,
              categoryId: productData.category.id
            });
            setUserId(productData.userId);
            // Set the preview image if available
            if (productData.image) {
              setPreviewImage(productData.ImageName ? (process.env.REACT_APP_SERVER_URL as string) +
              process.env.REACT_APP_PRODUCTS_IMAGES_PATH +
              productData.imageName
            : process.env.REACT_APP_NOT_FOUND_IMAGE_PRODUCT);
            }
          })
          .catch(err => {
            message.error('Error fetching product data');
          });
      }
    }, [isEdit, id, form]);
  const handleImageChange = (info: any) => {
    console.log(info);
    //if (info.file.status === 'done') {
      //console.log(fileList);
      //console.log('fileList');
      //alert('dd');
      //console.log(info.file.originFileObj);
      form.setFieldsValue({
        image: info.fileList[0].originFileObj, // Set the form field value for "image"
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(info.fileList[0].originFileObj);
    //}
  };
  const validateGuid = (_: any, value: string, callback: (error?: string) => void) => {
    if (value && !/^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/.test(value)) {
      callback('Invalid GUID format');
    } else {
      callback();
    }
  };
  const uploadProps = {
    beforeUpload: (file: File) => {
      // Validate the file here (e.g., file type, size)
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Дозволено завантажувати тільки фото!');
      }
      return false; // Return false to prevent uploading to the server
    },
    maxCount: 1,
    onChange: handleImageChange,
  
  };
  function setMyUserId(){
    setUserId(user.id);
    
    form.setFieldsValue({userId: user.id}); 
   // console.log(form.getFieldValue('userId'));
  }
  // const uploadProps = {
  //   beforeUpload: handleImageBeforeUpload,
  //   maxCount: 1,
  //   onChange: handleImageChange,
  // };
    //let test = info.file.originFileObj;
    //.
    //info.file.status
    //setPreviewImage(info.file.thumbUrl);
    // if (info.file.status === 'done') {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     setPreviewImage(e.target?.result as string);
    //   };
    //   reader.readAsDataURL(info.file.preview);
    // }
  // };

  // const handleImageChange = (info: any) => {
  //   console.log(info.file);
  //   //alert("url " + info.file.status);
  //   if (info.file.status === 'done') {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setPreviewImage(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(info.file.originFileObj);
  //   }
  // };
  // const handleImageBeforeUpload = (file: File) => {
  //   const isImage = file.type.startsWith('image/');
  //   if (!isImage) {
  //     message.error('Дозволено завантажувати тільки фото!');
  //   }
  //   return isImage;
  // };


  // const handleRemoveImage = () => {
  //   setPreviewImage(undefined);
  //   setImageUrl(undefined);
  // };

  // const handleImageRemove = () => {
  //   setPreviewImage(undefined);
  //   setImageFile(undefined);
  // };
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Ім'я"
        name="name"
        rules={[{ required: true, message: "Please enter the product name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Опис" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Ціна"
        name="price"
        rules={[{ required: true, message: "Please enter the product price" }]}
      >
        <Input type="number" step="0.01" />
      </Form.Item>
      <Form.Item
        label="Стокова кількість"
        name="stockQuantity"
        rules={[{ required: true, message: "Please enter the stock quantity" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="User Id (Product owner)"
        name="userId"
        rules={[
          { required: true, message: 'GUID is required' },
          { validator: validateGuid }
        ]}
      >
        <Input
          onChange={(ev) => {setUserId(ev.target.value);form.setFieldsValue({userId: ev.target.value}); }}
          value={userId}
          name="userId"
          placeholder="Enter an user id"
        />
        <Button className="mt-2" onClick={() => setMyUserId()}>Set my user Id</Button>
      </Form.Item>
      <Form.Item label="Фото" name="image"  noStyle>
        {/* valuePropName="fileList" */}
      <Dragger {...uploadProps} listType="picture"  accept=".png,.jpeg,.jpg,.jiff,.gif" >
      {/* fileList={fileList} */}
        {/* showUploadList={false}  action={"http://localhost:3000/"}*/}
    <Button icon={<UploadOutlined />}>Завантажити фото</Button>
  </Dragger>
  {previewImage && (
    <img src={previewImage} alt="product" style={{ width: '200px' }} />
  )}

      </Form.Item>
      <Form.Item
  label="Category"
  name="categoryId"
  rules={[{ required: true, message: 'Please select a category' }]}
>
  <Select placeholder="Select a category">
    {categories.map((category) => (
      <Select.Option key={category.id} value={category.id}>
        {category.name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className='mt-3'>
          {id ? "Оновити" : "Додати"} Товар
        </Button>
      </Form.Item>
    </Form>
  );
};
// import { Button, Form, Input, Upload, message, Image  } from "antd";
// import { useEffect, useState } from "react";
// import { UploadOutlined } from '@ant-design/icons';
// import { useParams } from "react-router-dom";

// export interface CategoryProps {
//     handleSubmit: (values: any) => void;
//     isEdit: boolean;
// }
// export const ProductCRUD : React.FC<CategoryProps> = ({handleSubmit}) =>{
//     const { id } = useParams<{ id?: string }>();
//     const [imageUrl, setImageUrl] = useState<string | undefined>();
//     const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

// //initialValues?.image
//   const [form] = Form.useForm();
//   const handleImageChange = (info: any) => {
//     if (info.file.status === 'done') {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPreviewImage(e.target?.result as string);
//       };
//       reader.readAsDataURL(info.file.originFileObj);
//     }
//   };
//   // Set initial form values if editing an existing product
// //   useEffect(() => {
// //     if (initialValues) {
// //       form.setFieldsValue(initialValues);
// //     }
// //   }, [initialValues, form]);
// const uploadProps = {
//   beforeUpload: (file: File) => {
//     // Validate the file here (e.g., file type, size)
//     const isImage = file.type.startsWith('image/');
//     if (!isImage) {
//       message.error('Дозволено завантажувати тільки фото!');
//     }
//     return isImage;
//   },
//   maxCount: 1,
//   onChange: (info: any) => {
//     if (info.file.status === 'done') {
//       // Get the uploaded image URL
//       const url = info.file.response.imageUrl;
//       setImageUrl(url);
//     }
//   },
// };

// //   const handleSubmit = (values: any) => {
// //     handleSubmit(values);
// //   };
//     return (
//         <Form form={form} onFinish={handleSubmit} layout="vertical">
//       <Form.Item label="Ім'я" name="name" rules={[{ required: true, message: 'Please enter the product name' }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item label="Опис" name="description">
//         <Input.TextArea />
//       </Form.Item>
//       <Form.Item label="Ціна" name="price" rules={[{ required: true, message: 'Please enter the product price' }]}>
//         <Input type="number" step="0.01" />
//       </Form.Item>
//       <Form.Item label="Стокова кількість" name="stockQuantity" rules={[{ required: true, message: 'Please enter the stock quantity' }]}>
//         <Input type="number" />
//       </Form.Item>
//       <Form.Item label="Фото" name="image">
//         <Upload   showUploadList={false}
//         onChange={handleImageChange}
//         beforeUpload={() => false}>
//           <Button icon={<UploadOutlined />} >
//           {/* disabled={initialValues && initialValues.image} */}
//             Завантажити фото
//           </Button>
//         </Upload>
//         {previewImage && (
//         <Image src={previewImage} alt="product" style={{ width: '100%' }} />
//       )}
//         {imageUrl && (
//           <Image src={imageUrl} alt="Product Image" style={{ marginTop: '10px', maxWidth: '200px' }} />
//         )}
//       </Form.Item>
//       {/* Add more form fields as needed */}

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           {id ? 'Оновити' : 'Додати'} Товар
//         </Button>
//       </Form.Item>
//     </Form>
//     )
// }
