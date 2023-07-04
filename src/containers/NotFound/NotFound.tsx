import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Title, Text } = Typography;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <Typography.Title level={2}>Oops! Page not found.</Typography.Title>
      <Typography.Text>
        We're sorry, but the page you requested could not be found.
      </Typography.Text>
      <Button type="primary" className='mt-3' onClick={() => navigate('/')}>Go back to home page</Button>
      <style>{`
        .not-found-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #f5f5f5;
        }

        @media screen and (max-width: 768px) {
          .not-found-page {
            padding: 0 20px;
          }
        }

        @media screen and (min-width: 768px) {
          .not-found-page {
            padding: 0 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;