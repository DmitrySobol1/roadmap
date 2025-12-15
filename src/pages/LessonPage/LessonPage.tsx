import { useState, useEffect, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/axios';
import { CircularProgress, Checkbox, Button } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { Page } from '@/components/Page.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { Text } from '@/components/Text/Text.tsx';
import { useTlgid } from '@/components/Tlgid.tsx';
import { useUser } from '@/context/UserContext';
import { AlertMessage } from '@/components/AlertMessage/AlertMessage.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

interface Course {
  _id: string;
  lessonsQty?: number;
}

interface Lesson {
  _id: string;
  name: string;
  urlToFile?: string;
  longDescription?: string;
  text1?: string;
  text2?: string;
  homework?: string;
  numberInListLessons?: number;
  linkToCourse?: Course;
  access?: 'free' | 'payment';
}

export const LessonPage: FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { tlgid } = useTlgid();
  const { isPayed } = useUser();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const isNextLessonAccessible = isPayed || nextLesson?.access === 'free';

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await axios.get(`/lesson/${lessonId}`);
        if (data && data._id) {
          setLesson(data);

          // Получаем следующий урок
          if (data.linkToCourse?._id && data.numberInListLessons !== undefined) {
            const lessonsResponse = await axios.get(`/lessons/${data.linkToCourse._id}`);
            const lessons = lessonsResponse.data;
            const foundNextLesson = lessons.find(
              (l: Lesson) => l.numberInListLessons === data.numberInListLessons + 1
            );
            if (foundNextLesson) {
              setNextLesson(foundNextLesson);
            }
          }

          // Получаем прогресс пользователя
          if (tlgid) {
            const progressResponse = await axios.get(`/progress/${tlgid}/${lessonId}`);
            setIsChecked(progressResponse.data.isLearned || false);

            // Получаем избранное
            const favoriteResponse = await axios.get(`/favorite/${tlgid}/${lessonId}`);
            setIsFavorite(favoriteResponse.data.isFavorite || false);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      setIsChecked(false);
      setNextLesson(null);
      setIsFavorite(false);
      setShowAlert(false);
      fetchLesson();
    }
  }, [lessonId, tlgid]);

  // Обработка изменения checkbox
  const handleCheckboxChange = async (checked: boolean) => {
    setIsChecked(checked);

    if (!tlgid || !lessonId) return;

    try {
      if (checked) {
        await axios.post('/progress', { tlgid, lessonId });
      } else {
        await axios.delete(`/progress/${tlgid}/${lessonId}`);
      }
    } catch (error) {
      console.error('Ошибка при сохранении прогресса:', error);
      setIsChecked(!checked); // Откатываем при ошибке
    }
  };

  // Обработка изменения избранного
  const handleFavoriteChange = async (checked: boolean) => {
    setIsFavorite(checked);

    if (!tlgid || !lessonId) return;

    try {
      if (checked) {
        await axios.post('/favorite', { tlgid, lessonId });
      } else {
        await axios.delete(`/favorite/${tlgid}/${lessonId}`);
      }
    } catch (error) {
      console.error('Ошибка при сохранении избранного:', error);
      setIsFavorite(!checked); // Откатываем при ошибке
    }
  };

  if (loading) {
    return (
      <Page back={true}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress sx={{ color: '#4ade80' }} />
        </div>
      </Page>
    );
  }

  return (
    <Page back={true}>
      <AlertMessage show={showAlert} message="Следующий урок доступен на платной подписке" showButton={true} />
      <div style={{ marginBottom: 100}}>
      <Header2 subtitle={lesson?.name || 'Урок'} />

      <Text text={lesson?.text1} />
      <Text text={lesson?.text2} />

      {lesson?.urlToFile ? (
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
              <CircularProgress sx={{ color: '#4ade80' }} />
            </div>
          )}
          <iframe
            src={lesson.urlToFile}
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
      ) : (
        <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
          Видео не найдено
        </p>
      )}

      {lesson?.homework && (
        <p >
          <Text hometext='Задание:' />
          <Text hometext={lesson?.homework} />
        </p>
      )}

      {/* добавить в избранное */}
      <div style={{ padding: '0 16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Checkbox
            checked={isFavorite}
            onChange={(e) => handleFavoriteChange(e.target.checked)}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            sx={{
              color: '#666',
              '&.Mui-checked': {
                color: '#ff5252',
              },
            }}
          />
          <span style={{ color: isFavorite ? '#4ade80' : '#666' }}>
            {isFavorite ? 'В избранном' : 'Добавить в избранное'}
          </span>
        </label>
      </div>


      {/* Checkbox и кнопка следующего урока */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', color: '#fff', cursor: 'pointer' }}>
          <Checkbox
            checked={isChecked}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            sx={{
              color: '#4ade80',
              '&.Mui-checked': {
                color: '#4ade80',
              },
            }}
          />
          <span style={{ color: isChecked ? '#4ade80' : '#666' }}>Урок пройден</span>
        </label>
        {nextLesson && (
          <Button
            variant="contained"
            disabled={!isChecked}
            onClick={() => {
              if (isNextLessonAccessible) {
                navigate(`/lesson/${nextLesson._id}`);
              } else {
                setShowAlert(true);
              }
            }}
            sx={{
              backgroundColor: isNextLessonAccessible ? '#4ade80' : '#ff5252',
              color: isNextLessonAccessible ? '#000' : '#fff',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: isNextLessonAccessible ? '#3ecf70' : '#e04848',
              },
              '&.Mui-disabled': {
                backgroundColor: '#2a2a2a',
                color: '#666',
              },
            }}
          >
            Следующий урок
          </Button>
        )}
      </div>

</div>
      <TabbarMenu />
    </Page>
  );
};
