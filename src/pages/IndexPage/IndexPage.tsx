import { useState, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { Header } from '@/components/Header/Header.tsx';
import { CardList } from '@/components/CardList/CardList.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface CourseType {
  _id: string;
  name: string;
  description?: string;
  orderNumber: number;
  color?: string;
}

export const IndexPage: FC = () => {
  const navigate = useNavigate();
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);

  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        const response = await fetch('http://localhost:4444/courseTypes');
        const data = await response.json();
        setCourseTypes(data);
      } catch (error) {
        console.error('Ошибка при загрузке courseTypes:', error);
      }
    };

    fetchCourseTypes();
  }, []);

  return (
    <Page back={false}>
      <Header title="Easy dev App" subtitle="про разработку для «не кодеров»" />
      <CardList>
        {courseTypes.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            subtitle={item.description || ''}
            badge={{
              isShown: true,
              text: <ArrowForwardIcon sx={{ fontSize: 18 }} />,
              color: item.color || '#e0e0e0',
            }}
            onClick={() =>
              navigate(`/course-list_page/${item._id}`, {
                state: { courseTypeName: item.name },
              })
            }
          />
        ))}
      </CardList>

      <TabbarMenu />
    </Page>
  );
};
