import Swal from "sweetalert2";
import instance from "../../../../api/configurations"
import { CategoryCRUD } from "./Category"
import { useNavigate, useParams } from "react-router-dom";

export const EditCategory : React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const handleSubmit = (values: any) => {
        console.log(values);
        instance.post("api/Category/edit-category", {id: id, name: values.name, parentCategoryId: values.parentId})
        .then(data => {
            Swal.fire({   
                position: 'top-end', 
                icon: 'success',
                title: 'Категорія успішно змінена',
                showConfirmButton: false,
                timer: 1000  
              });
              navigate('../categories');

        }).catch(err => {
            Swal.fire({   
                position: 'top-end',
                icon: 'error',
                title: 'Помилка під час виконання запиту',
                showConfirmButton: false,
                timer: 1000
              }); 
        });
    }
    return (
        <CategoryCRUD handleSubmit={handleSubmit} isEdit={true}/>
    )
}