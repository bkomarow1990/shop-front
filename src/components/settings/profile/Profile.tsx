import { Button, Card, Divider } from "antd";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
export const Profile: React.FC = () => {
  const { isDarkTheme } = useTypedSelector((state) => state.theme);
  const { ChangeTheme, LogoutUser } = useActions();
  const navigate = useNavigate();
  return (

    <div >
        <Divider>
          <Card style={{ width: "max-content" }}>
            <Button onClick={async () => {await LogoutUser(); navigate('/login')}}>
                Вийти з аккаунту
            </Button>
          </Card>
        </Divider>
    </div>
  );
};