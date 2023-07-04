import { Button, Input, Typography } from "antd"
import GuidInput from "../../common/GuidInput/GuidInput"
import { useNavigate } from "react-router-dom";
const {Title} = Typography;

export const AdminProducts : React.FC = () =>{
    const navigate = useNavigate();
    return (
        <div className="d-flex flex-column gap-3">
            <div>
                <Title>Редагувати товар:</Title>
                <GuidInput buttonText={'Редагувати'} onSubmit={(t) => navigate(`products/${t.guid}`)}/>
            </div>
            <div>
                <Title>Додати товар:</Title>
                <Button type="primary" onClick={() => navigate('create')}>Додати товар</Button>
            </div>
            <Button className="align-self-center" onClick={() => navigate('/')}>До товарів</Button>
        </div>
    )
}