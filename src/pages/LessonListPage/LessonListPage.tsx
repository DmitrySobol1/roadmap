import { useState, useEffect, type FC } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from '@/axios';

import { Page } from '@/components/Page.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { CardList } from '@/components/CardList/CardList.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';
import { useUser } from '@/context/UserContext';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import LockIcon from '@mui/icons-material/Lock';
import { Alert, Slide, CircularProgress } from '@mui/material';

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
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Ошибка при загрузке lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchLessons();
    }
  }, [courseId]);

  const handleToggle = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
    setShowAlert(false);
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
          Данный контент пока не доступен 
        </Alert>
      </Slide>
      {/* <Header2 subtitle={courseName || 'Уроки'} /> */}
      <Header2 subtitle={`Курс «${courseName}»`} />

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
              subtitle={lesson.shortDescription || ''}
              badge={{
                isShown: true,
                text: isAccessible(lesson) ? (
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                ) : (
                  // <CurrencyRubleIcon sx={{ fontSize: 18 }} />
                  <LockIcon sx={{ fontSize: 18 }} />
                ),
                color: isAccessible(lesson) ? badgeColor : '#ff5252',
              }}
              isAccordion={true}
              accordionContent={<p style={{ whiteSpace: 'pre-line' }}>{lesson.longDescription}</p>}
              isOpen={openAccordion === lesson._id}
              onToggle={() => handleToggle(lesson._id)}
              onClick={() => handleLessonClick(lesson)}
            />
          ))}
        </CardList>
      )}
</div>
      <TabbarMenu />
    </Page>
  );
};
