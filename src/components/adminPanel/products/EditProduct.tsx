import Swal from "sweetalert2";
import instance from "../../../api/configurations";
import { ProductCRUD } from "./ProductCRUD"
import { useNavigate, useParams } from "react-router-dom";


export const EditProduct : React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const handleSubmit = async (values: any) => {
        if(!id) return;
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('categoryId', values.categoryId);
            formData.append('stockQuantity', values.stockQuantity);
            console.log(values.image);
            //.file.file
            formData.append('image', values.image); // Assuming 'image' is the name of the field in the form
            const response = await instance.post('/api/Product/edit-product', formData,
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
                text: 'Товар успішно редаговано!',
                showConfirmButton: false,
                timer: 1000
              });
            navigate(-1);
            // Handle the response
            console.log(response.data);
          } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Помилка!',
                text: 'Товар не редаговано!',
                showConfirmButton: false,
                timer: 1000
              });
            // Handle the error
            console.error(error);
          }
    }
    return (
        <ProductCRUD handleSubmit={handleSubmit} isEdit={true}/>
    )
}