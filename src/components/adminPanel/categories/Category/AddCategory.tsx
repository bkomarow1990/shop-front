import Swal from "sweetalert2";
import instance from "../../../../api/configurations";
import { useActions } from "../../../../hooks/useActions";
import { CategoryCRUD } from "./Category";
import { useNavigate } from "react-router-dom";

export interface CreateCategoryRequest{
    name: string;
    parentId: string | null;
}
export const AddCategory: React.FC = () => {
    const navigate = useNavigate();
    // const { CreateCategory } = useActions();
  const handleCreate = (values: any) => {
    instance.post("api/Category/create-category", {name: values.name, parentCategoryId: values.parentId}).then(
        () => {
            Swal.fire({
                icon: 'success',
                title: 'Вітаємо...',
                text: "Ви успішно додали категорію! ",
              });
              navigate('../categories');
        }
    ).catch(err => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Щось пішло не так! " + err,
          });
    });

    //CreateCategory();
  };
  return (
    <CategoryCRUD isEdit={false} handleSubmit={handleCreate}></CategoryCRUD>
  );
};
