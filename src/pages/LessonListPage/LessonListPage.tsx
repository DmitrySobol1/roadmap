import { useState, useEffect, type FC } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from '@/axios';

import { Page } from '@/components/Page.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { Text } from '@/components/Text/Text.tsx';
import { CardList } from '@/components/CardList/CardList.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';
import { useUser } from '@/context/UserContext';
import { useTlgid } from '@/components/Tlgid.tsx';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
// import LockIcon from '@mui/icons-material/Lock';
import { CircularProgress } from '@mui/material';
import { AlertMessage } from '@/components/AlertMessage/AlertMessage.tsx';

interface Course {
  _id: string;
  name: string;
}

interface Lesson {
  _id: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  urlToFile?: string;
  numberInListLessons: number;
  linkToCourse: Course;
  access: 'free' | 'payment';
}

interface LocationState {
  courseName?: string;
  color?: string;
}

export const LessonListPage: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const { isPayed } = useUser();
  const { tlgid } = useTlgid();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [learnedLessonIds, setLearnedLessonIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const courseName = state?.courseName || lessons[0]?.linkToCourse?.name || '';
  const badgeColor = state?.color || '#c8e6c9';

  const isAccessible = (lesson: Lesson) => isPayed || lesson.access === 'free';

  const handleLessonClick = (lesson: Lesson) => {
    if (isAccessible(lesson)) {
      navigate(`/lesson/${lesson._id}`);
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axios.get(`/lessons/${courseId}`);
        if (Array.isArray(data)) {
          console.log('lessons', data)
          setLessons(data);
        }

        // Получаем прогресс пользователя
        if (tlgid && courseId) {
          const progressResponse = await axios.get(`/progress/${tlgid}/course/${courseId}`);
          setLearnedLessonIds(progressResponse.data.learnedLessonIds || []);

          // Получаем избранные уроки пользователя
          const favoritesResponse = await axios.get(`/favorites/${tlgid}`);
          const favIds = favoritesResponse.data.map((f: { _id: string }) => f._id);
          setFavoriteIds(favIds);
        }
      } catch (error) {
        console.error('Ошибка при загрузке lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchLessons();
    }
  }, [courseId, tlgid]);

  const handleToggle = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
    setShowAlert(false);
  };

  const handleFavoriteAdd = async (lessonId: string) => {
    if (!tlgid) return;
    try {
      await axios.post('/favorite', { lessonId, tlgid });
      setFavoriteIds((prev) => [...prev, lessonId]);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  };

  const handleFavoriteRemove = async (lessonId: string) => {
    if (!tlgid) return;
    try {
      await axios.delete(`/favorite/${tlgid}/${lessonId}`);
      setFavoriteIds((prev) => prev.filter((id) => id !== lessonId));
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
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
    <Page back={true} >
      <div style={{ marginBottom: 100}}>
      <AlertMessage show={showAlert} showButton={true} />
      {/* <Header2 subtitle={courseName || 'Уроки'} /> */}
      <Header2 subtitle={`Обучалка «${courseName}»`} />
      <Text text='Список уроков:'/>

      {lessons.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
          Уроки ещё не добавлены
        </p>
      ) : (
        <CardList>
          {lessons.map((lesson) => (
            <Card
              key={lesson._id}
              isLearned={learnedLessonIds.includes(lesson._id)}
              title={lesson.name}
              subtitle={lesson.shortDescription || ''}
              badge={{
                isShown: true,
                text: isAccessible(lesson) ? (
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                ) : (
                  <CurrencyRubleIcon sx={{ fontSize: 18 }} />
                  // <LockIcon sx={{ fontSize: 18 }} />
                ),
                color: isAccessible(lesson) ? badgeColor : '#ff5252',
              }}
              isAccordion={true}
              accordionContent={<p style={{ whiteSpace: 'pre-line' }}>{lesson.longDescription}</p>}
              isOpen={openAccordion === lesson._id}
              onToggle={() => handleToggle(lesson._id)}
              onClick={() => handleLessonClick(lesson)}
              isFavorite={favoriteIds.includes(lesson._id)}
              onFavoriteAdd={() => handleFavoriteAdd(lesson._id)}
              onFavoriteRemove={() => handleFavoriteRemove(lesson._id)}
            />
          ))}
        </CardList>
      )}
</div>
      <TabbarMenu />
    </Page>
  );
};
