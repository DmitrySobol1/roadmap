import { useState, useEffect, type FC } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from '@/axios';

import { Page } from '@/components/Page.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { Header } from '@/components/Header/Header.tsx';
import { CardList } from '@/components/CardList/CardList.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';
import { useUser } from '@/context/UserContext';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { Alert, Slide } from '@mui/material';

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

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const courseName = state?.courseName || lessons[0]?.linkToCourse?.name || '';
  const badgeColor = state?.color || '#c8e6c9';

  const isAccessible = (lesson: Lesson) => isPayed || lesson.access === 'free';

  const handleLessonClick = (lesson: Lesson) => {
    if (isAccessible(lesson)) {
      navigate(`/lesson/${lesson._id}`, {
        state: { lessonName: lesson.name, urlToFile: lesson.urlToFile },
      });
    } else {
      console.log('нет доступа');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axios.get(`/lessons/${courseId}`);
        if (Array.isArray(data)) {
          setLessons(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке lessons:', error);
      }
    };

    if (courseId) {
      fetchLessons();
    }
  }, [courseId]);

  const handleToggle = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <Page back={true}>
      <Slide direction="down" in={showAlert} mountOnEnter unmountOnExit>
        <Alert
          severity="error"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            borderRadius: 0,
            backgroundColor: '#ff5252', // кастомный фон
            color: '#fff', // цвет текста
            '& .MuiAlert-icon': {
              color: '#fff', // цвет иконки
            },
          }}
        >
          Данный контент доступен на платной подписке
        </Alert>
      </Slide>
      <Header subtitle={courseName || 'Уроки'} />
      {lessons.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
          Уроки ещё не добавлены
        </p>
      ) : (
        <CardList>
          {lessons.map((lesson) => (
            <Card
              key={lesson._id}
              title={lesson.name}
              //   subtitle={lesson.shortDescription || ''}
              badge={{
                isShown: true,
                text: isAccessible(lesson) ? (
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                ) : (
                  <CurrencyRubleIcon sx={{ fontSize: 18 }} />
                ),
                color: isAccessible(lesson) ? badgeColor : '#ff5252',
              }}
              isAccordion={false}
              accordionContent={<p>{lesson.longDescription}</p>}
              isOpen={openAccordion === lesson._id}
              onToggle={() => handleToggle(lesson._id)}
              onClick={() => handleLessonClick(lesson)}
            />
          ))}
        </CardList>
      )}

      <TabbarMenu />
    </Page>
  );
};
