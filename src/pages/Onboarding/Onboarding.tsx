import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
import { Header } from '@/components/Header/Header.tsx';

// import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

import { useTlgid } from '../../components/Tlgid';

import { Button } from '@mui/material';

import axios from '../../axios';

export const Onboarding: FC = () => {
  const tlgid = useTlgid();
  const navigate = useNavigate();

  const handleComplete = async () => {
    try {
      await axios.post('/set_onboarded', { tlgid });
      navigate('/index');
    } catch (error) {
      console.error('Ошибка при завершении онбординга:', error);
    }
  };

  return (
    <Page back={false}>
      <div style={{ marginBottom: 100}}>
      <Header title="Онбординг" subtitle="в разработка - появится позже" />


      <Button
            variant="contained"

            onClick={handleComplete}
            sx={{
              marginLeft: '20px',
              width: '300px',
              backgroundColor: '#4ade80',
              color:  '#000'  ,
              fontWeight: 500,
              '&:hover': {
                backgroundColor:  '#3ecf70' ,
              },
              '&.Mui-disabled': {
                backgroundColor: '#2a2a2a',
                color: '#666',
              },
            }}
          >
            Далее
          </Button>

</div>
      {/* <TabbarMenu /> */}
    </Page>
  );
};
