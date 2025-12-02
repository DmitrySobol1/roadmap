import { useState, useEffect, type FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from '@/axios';
import { CircularProgress } from '@mui/material';

import { Page } from '@/components/Page.tsx';
import { Header } from '@/components/Header/Header.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

interface LocationState {
  lessonName?: string;
  urlToFile?: string;
}

interface Lesson {
  _id: string;
  name: string;
  urlToFile?: string;
  longDescription?: string;
}

export const LessonPage: FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const location = useLocation();
  const state = location.state as LocationState;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(!state?.urlToFile);
  const [videoLoading, setVideoLoading] = useState(true);

  const lessonName = state?.lessonName || lesson?.name || '';
  const videoUrl = state?.urlToFile || lesson?.urlToFile || '';

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

    if (lessonId && !state?.urlToFile) {
      fetchLesson();
    }
  }, [lessonId, state?.urlToFile]);

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
      <Header subtitle={lessonName || 'Урок'} />

      {videoUrl ? (
        <div
          style={{ position: 'relative', paddingTop: '53.91%', width: '100%' }}
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
            src={videoUrl}
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

      {lesson?.longDescription && (
        <p style={{ padding: '16px', color: '#666', whiteSpace: 'pre-line' }}>
          {lesson.longDescription}
        </p>
      )}

      <TabbarMenu />
    </Page>
  );
};
