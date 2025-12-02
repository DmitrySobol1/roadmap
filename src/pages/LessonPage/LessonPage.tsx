import { useState, useEffect, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/axios';
import { CircularProgress, Checkbox, Button } from '@mui/material';

import { Page } from '@/components/Page.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { Text } from '@/components/Text/Text.tsx';
import { useTlgid } from '@/components/Tlgid.tsx';

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
}

export const LessonPage: FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const tlgid = useTlgid();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [nextLessonId, setNextLessonId] = useState<string | null>(null);

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
            const nextLesson = lessons.find(
              (l: Lesson) => l.numberInListLessons === data.numberInListLessons + 1
            );
            if (nextLesson) {
              setNextLessonId(nextLesson._id);
            }
          }

          // Получаем прогресс пользователя
          if (tlgid) {
            const progressResponse = await axios.get(`/progress/${tlgid}/${lessonId}`);
            setIsChecked(progressResponse.data.isLearned || false);
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
      setNextLessonId(null);
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
        {nextLessonId && (
          <Button
            variant="contained"
            disabled={!isChecked}
            onClick={() => navigate(`/lesson/${nextLessonId}`)}
            sx={{
              backgroundColor: '#4ade80',
              color: '#000',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#3ecf70',
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
