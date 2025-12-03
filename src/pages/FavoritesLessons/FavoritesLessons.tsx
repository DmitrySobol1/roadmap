import { useState, useEffect, useRef, useCallback, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/axios';

import { Page } from '@/components/Page.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { Header } from '@/components/Header/Header.tsx';
import { CardList } from '@/components/CardList/CardList.tsx';
import { useTlgid } from '@/components/Tlgid.tsx';
import { useUser } from '@/context/UserContext';
import { AlertMessage, AlertActionButton } from '@/components/AlertMessage/AlertMessage.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import { CircularProgress } from '@mui/material';

interface CourseType {
  _id: string;
  name: string;
}

interface Course {
  _id: string;
  name: string;
  type?: CourseType;
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

export const FavoritesLessonsPage: FC = () => {
  const navigate = useNavigate();
  const tlgid = useTlgid();
  const { isPayed } = useUser();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showAccessAlert, setShowAccessAlert] = useState(false);

  const isAccessible = (lesson: Lesson) => isPayed || lesson.access === 'free';

  // Undo state
  const [removedLesson, setRemovedLesson] = useState<Lesson | null>(null);
  const [countdown, setCountdown] = useState(5);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (tlgid) {
          const { data } = await axios.get(`/favorites/${tlgid}`);
          if (Array.isArray(data)) {
            setLessons(data);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке избранных уроков:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [tlgid]);

  // Cleanup countdown on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const deleteFromDb = useCallback(async (lessonId: string) => {
    if (!tlgid) return;
    try {
      await axios.delete(`/favorite/${tlgid}/${lessonId}`);
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  }, [tlgid]);

  const startCountdown = useCallback((lesson: Lesson) => {
    setRemovedLesson(lesson);
    setCountdown(5);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }
          deleteFromDb(lesson._id);
          setRemovedLesson(null);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  }, [deleteFromDb]);

  const handleRestoreFavorite = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (removedLesson) {
      setLessons((prev) => [...prev, removedLesson]);
      setRemovedLesson(null);
      setCountdown(5);
    }
  }, [removedLesson]);

  const handleLessonClick = (lesson: Lesson) => {
    if (isAccessible(lesson)) {
      navigate(`/lesson/${lesson._id}`);
    } else {
      setShowAccessAlert(true);
    }
  };

  const handleToggle = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
    setShowAccessAlert(false);
  };

  const handleRemoveFavorite = (lessonId: string) => {
    if (!tlgid) return;
    setShowAccessAlert(false);
    

    const lesson = lessons.find((l) => l._id === lessonId);
    if (!lesson) return;

    // Remove from UI immediately
    setLessons(lessons.filter((l) => l._id !== lessonId));
    setOpenAccordion(null);

    // Start countdown - will delete from DB after 5 seconds
    startCountdown(lesson);
  };

  if (loading) {
    return (
      <Page back={false}>
        <Header title="Избранные уроки" />
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
        <TabbarMenu />
      </Page>
    );
  }

  return (
    <Page back={false}>
      <AlertMessage show={showAccessAlert} message="Данный контент пока не доступен" />
      <AlertMessage
        show={removedLesson !== null && !showAccessAlert}
        message="Урок удален из избранного"
        variant="warning"
        action={
          <AlertActionButton onClick={handleRestoreFavorite} countdown={countdown}>
            Вернуть
          </AlertActionButton>
        }
      />
      <div style={{ marginBottom: 100 }}>
        <Header title="Избранные уроки" />

        {lessons.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
            Нет избранных уроков
          </p>
        ) : (
          <CardList>
            {lessons.map((lesson) => (
              <Card
                key={lesson._id}
                title={`${lesson.linkToCourse?.type?.name || ''}: ${lesson.linkToCourse?.name || ''}`}
                subtitle={`урок: ${lesson.name}`}
                badge={{
                  isShown: true,
                  text: isAccessible(lesson) ? (
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <LockIcon sx={{ fontSize: 18 }} />
                  ),
                  color: isAccessible(lesson) ? '#c8e6c9' : '#ff5252',
                }}
                isAccordion={true}
                accordionContent={<p style={{ whiteSpace: 'pre-line' }}>{lesson.longDescription}</p>}
                isOpen={openAccordion === lesson._id}
                onToggle={() => handleToggle(lesson._id)}
                onClick={() => handleLessonClick(lesson)}
                isFavorite={true}
                onFavoriteRemove={() => handleRemoveFavorite(lesson._id)}
              />
            ))}
          </CardList>
        )}
      </div>
      <TabbarMenu />
    </Page>
  );
};
