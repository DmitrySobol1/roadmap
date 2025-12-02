import { useState, useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/axios';
import { CircularProgress } from '@mui/material';

import { Page } from '@/components/Page.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { Text } from '@/components/Text/Text.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

interface Lesson {
  _id: string;
  name: string;
  urlToFile?: string;
  longDescription?: string;
  text1?: string;
  text2?: string;
  homework?: string;
}

export const LessonPage: FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await axios.get(`/lesson/${lessonId}`);
        if (data && data._id) {
          setLesson(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

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
</div>
      <TabbarMenu />
    </Page>
  );
};
