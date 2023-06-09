import { Alert, Spin } from "antd";
import "./styles.scss";

const EclipseWidgetContainer = () => {
  return (
    <div className="my_eclipse">
      <div className="progress">
        <div>
          <Spin tip="Loading..."></Spin>
          {/* <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    <span className="sr-only">Loading...</span> */}
        </div>
      </div>
    </div>
  );
};
const EclipseWidget = EclipseWidgetContainer;
export default EclipseWidget;
