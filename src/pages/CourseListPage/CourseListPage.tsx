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

interface CourseType {
  _id: string;
  name: string;
  color?: string;
}

interface Course {
  _id: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  access: 'free' | 'payment';
  orderNumber: number;
  type: CourseType;
}

interface LocationState {
  courseTypeName?: string;
}

export const CourseListPage: FC = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const { isPayed } = useUser();

  const [courses, setCourses] = useState<Course[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const courseTypeName = state?.courseTypeName || courses[0]?.type?.name || '';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`/courses/${typeId}`);
        if (Array.isArray(data)) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке courses:', error);
      }
    };

    if (typeId) {
      fetchCourses();
    }
  }, [typeId]);

  const handleToggle = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleCourseClick = (course: Course) => {
    if (isPayed || course.access === 'free') {
      navigate(`/lessons/${course._id}`, {
        state: { courseName: course.name, color: course.type?.color },
      });
    } else {
      console.log('нет доступа');
      setShowAlert(true);
    }
  };

  const isAccessible = (course: Course) => isPayed || course.access === 'free';

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
      <Header subtitle={courseTypeName || 'Уроки'} />
      {courses.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
          Уроки ещё не добавлены
        </p>
      ) : (
        <CardList>
          {courses.map((course) => (
            <Card
              key={course._id}
              title={course.name}
              subtitle={course.shortDescription || ''}
              badge={{
                isShown: true,
                text: isAccessible(course) ? (
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                ) : (
                  <CurrencyRubleIcon sx={{ fontSize: 18 }} />
                ),
                color: isAccessible(course)
                  ? course.type?.color || '#c8e6c9'
                  : '#ff5252',
              }}
              isAccordion={true}
              accordionContent={<p>{course.longDescription}</p>}
              isOpen={openAccordion === course._id}
              onToggle={() => handleToggle(course._id)}
              onClick={() => handleCourseClick(course)}
            />
          ))}
        </CardList>
      )}

      <TabbarMenu />
    </Page>
  );
};
