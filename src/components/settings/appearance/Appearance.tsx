import { Button, Card, Divider } from "antd";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import './styles.scss';
export const Appearance: React.FC = () => {
  const { isDarkTheme } = useTypedSelector((state) => state.theme);
  const { ChangeTheme } = useActions();
  return (

    <div >
        <Divider>
          <Card style={{ width: "max-content" }}>
            <Button onClick={async () => await ChangeTheme(!isDarkTheme)}>
              Change Theme to {isDarkTheme ? "Light" : "Dark"}
            </Button>
          </Card>
        </Divider>
    </div>
  );
};
