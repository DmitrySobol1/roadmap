import type { FC } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../axios';


import { Page } from '@/components/Page.tsx';
import {
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react';



export const EnterPage: FC = () => {

  const navigate = useNavigate();
  const initDataState = useSignal(_initDataState);
  const tlgid = initDataState?.user?.id

  if (tlgid){
    useEffect(() => {
      axios
        .post('/enter', {
          tlgid: tlgid
        })
        .then((response) => {
          
          if (response.data.result === 'created') {
            // console.log('created')
            navigate('/onboarding');
          } else if (response.data.result === 'showRoadmap') {
            // console.log('Ответ от сервера:', response.data);
            navigate('/roadmap');
         
          }
        })
        .catch((error) => {
          console.error('Ошибка при выполнении запроса:', error);
        })
        .finally(() => {
          // setShowLoader(false);
          // setWolfButtonActive(true);
        });
    }, []);

  }

  





  return (
    <Page back={false}>
      
    </Page>
  );
};
