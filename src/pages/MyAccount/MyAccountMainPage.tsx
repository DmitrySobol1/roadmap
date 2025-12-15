import { type FC } from 'react';
// import { useNavigate } from 'react-router-dom';
import { miniApp } from '@tma.js/sdk-react';

import { Page } from '@/components/Page.tsx';
// import { Card } from '@/components/Card/Card.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { Text } from '@/components/Text/Text.tsx';
// import { CardList } from '@/components/CardList/CardList.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';
import axios from '../../axios';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';

import { useTlgid } from '../../components/Tlgid';
import { useUser } from '@/context/UserContext';
// import { AlertMessage } from '@/components/AlertMessage/AlertMessage.tsx';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './MyAccountMainPage.css';

// interface CourseType {
//   _id: string;
//   name: string;
//   description?: string;
//   orderNumber: number;
//   color?: string;
// }

export const MyAccountMainPage: FC = () => {
  const { tlgid, name } = useTlgid();
  const { isPayed, dateTillPayed } = useUser();
  // const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  //   const navigate = useNavigate();
  //   const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);

  // Форматируем дату для отображения
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePaymentClick = async () => {
    try {
      // Отправляем сообщение боту через backend API
      await axios.post('/sendPaymentMessage', { tlgid });

      // // Показываем Alert
      // setShowPaymentAlert(true);

      // // Скрываем Alert через 3 секунды
      // setTimeout(() => {
      //   setShowPaymentAlert(false);
      // }, 3000);

      // Сворачиваем Mini App
      try {
        // console.log('miniApp:', miniApp);
        // console.log('miniApp.close:', miniApp.close);

        if (miniApp.close) {
          // console.log('Calling miniApp.close()');
          miniApp.close();
        } else {
          console.log('miniApp.close() not available');
        }
      } catch (err) {
        console.error('Error closing miniApp:', err);
      }
    } catch (error) {
      console.error('Error sending payment message:', error);
    }
  };



  return (
    <Page back={false}>
      {/* <AlertMessage
        show={showPaymentAlert}
        message="информация о продлении направлена в бота"
        variant="success"
      /> */}

      <Header2
        title="Мой аккаунт"
        icon={<PersonIcon sx={{ color: '#4ade80', fontSize: 24 }} />}
      />

      <div className="account-info">
        <span>{name}</span>
        <span className={`subscription-badge ${isPayed ? 'subscription-badge--active' : 'subscription-badge--inactive'}`}>
          {isPayed ? 'подписка оплачена' : 'подписка не оплачена'}
        </span>
      </div>

      {isPayed && (
        <Text padding="0px 10px 0px 20px" text={`подписка до: ${formatDate(dateTillPayed)}`} />
      )}

      <div className="payment-button-wrapper">
        <Button
          variant="contained"
          fullWidth
          onClick={handlePaymentClick}
          className="payment-button"
        >
         {isPayed ? 'Продлить подписку' : 'Оплатить подписку' } 
        </Button>
      </div>

      <TabbarMenu />
    </Page>
  );
};
