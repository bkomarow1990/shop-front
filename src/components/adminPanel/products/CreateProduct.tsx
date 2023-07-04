import { useNavigate } from "react-router-dom";
import instance from "../../../api/configurations";
import { ProductCRUD } from "./ProductCRUD"
import Swal from "sweetalert2";


export const CreateProduct : React.FC = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('categoryId', values.categoryId);
            formData.append('stockQuantity', values.stockQuantity);
            console.log(values.image);
            //.file.file
            formData.append('image', values.image); // Assuming 'image' is the name of the field in the form
            const response = await instance.post('/api/Product/add-product', formData,
            {
                params: {
                userId: values.userId,
            }, 
            headers: {
                'Content-Type': 'multipart/form-data', // Set the Content-Type header to multipart/form-data
            }});
            Swal.fire({
                icon: 'success',
                title: 'Успіх!',
                text: 'Товар успішно додано!',
                showConfirmButton: false,
                timer: 1000
              });
            navigate(-1);
            // Handle the response
            console.log(response.data);
          } catch (error) {
            Swal.fire({
                icon: 'success',
                title: 'Помилка!',
                text: 'Товар не додано!',
                showConfirmButton: false,
                timer: 1000
              });
            // Handle the error
            console.error(error);
          }
     console.log(values);
    }
    return (
        <ProductCRUD handleSubmit={handleSubmit} isEdit={false}/>
    )
}