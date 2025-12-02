import { useState, useEffect, type FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from '@/axios';

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
      }
    };

    if (lessonId && !state?.urlToFile) {
      fetchLesson();
    }
  }, [lessonId, state?.urlToFile]);

  return (
    <Page back={true}>
      <Header subtitle={lessonName || 'Урок'} />

      {videoUrl ? (
        <div
          style={{ position: 'relative', paddingTop: '53.91%', width: '100%' }}
        >
          <iframe
            src={videoUrl}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
            frameBorder="0"
            allowFullScreen
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
        <p style={{ padding: '16px', color: '#666' }}>
          {lesson.longDescription}
        </p>
      )}

      <TabbarMenu />
    </Page>
  );
};
