import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
import { Header } from '@/components/Header/Header.tsx';
import { Text } from '@/components/Text/Text.tsx';
import { AlertMessage } from '@/components/AlertMessage/AlertMessage.tsx';

// import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

import { useTlgid } from '../../components/Tlgid';

import { Button, TextField } from '@mui/material';

import axios from '../../axios';

export const Onboarding: FC = () => {
  const { tlgid } = useTlgid();
  const navigate = useNavigate();

  const [videoLoading, setVideoLoading] = useState(true);
  const [codeWord, setCodeWord] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleComplete = async () => {
    try {
      const response = await axios.post('/checkCodeWord', {
        tlgid,
        codeWord
      });

      if (response.data.status === 'success') {
        navigate('/index');
      } else if (response.data.status === 'wrong') {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Ошибка при проверке кодового слова:', error);
    }
  };

  return (
    <Page back={false}>
      <AlertMessage
        show={showAlert}
        message="Неверное кодовое слово"
        variant="error"
        showButton={false}
      />

      <div style={{ marginBottom: 100}}>
      <Header padding="0px 10px 20px 20px" title="Онбординг" />

      <Text padding="0px 10px 0px 20px" text = '1. Посмотрите видео, с краткой инструкцией по использованию приложения'/>
      <Text padding="0px 10px 10px 20px" text = '2. Введите кодовое слово из видео в поле ниже, чтобы перейти к контенту'/>

              <div
                style={{ position: 'relative', paddingTop: '53.91%', width: '95%', margin: '0 auto' }}
              >
                {videoLoading && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#1a1a1a',
                    }}
                  >
                    {/* <CircularProgress sx={{ color: '#4ade80' }} /> */}
                  </div>
                )} 
                <iframe
                  src='https://kinescope.io/nxYeSJ9vzy313TcLoErV6a'
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  onLoad={() => setVideoLoading(false)}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                  }}
                />
              </div>

            <Text padding="20px 10px 10px 20px" text = 'Введите кодовое слово из видео:'/>

            <TextField
              fullWidth
              value={codeWord}
              onChange={(e) => setCodeWord(e.target.value)}
              placeholder="кодовое слово"
              sx={{
                margin: '0 20px',
                width: 'calc(100% - 40px)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#4ade80',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4ade80',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4ade80',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  fontFamily: "'Tektur', sans-serif",
                },
              }}
            />

      <Button
            variant="contained"
            disabled={!codeWord.trim()}
            onClick={handleComplete}
            sx={{
              margin: '20px 20px 0 20px',
              width: 'calc(100% - 40px)',
              height: '56px',
              backgroundColor: '#4ade80',
              color:  '#000'  ,
              fontWeight: 500,
              fontFamily: "'Tektur', sans-serif",
              textTransform: 'none',
              fontSize: '16px',
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
