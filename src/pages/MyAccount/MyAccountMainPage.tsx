import { type FC } from 'react';
// import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
// import { Card } from '@/components/Card/Card.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
// import { CardList } from '@/components/CardList/CardList.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

import PersonIcon from '@mui/icons-material/Person';

// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// interface CourseType {
//   _id: string;
//   name: string;
//   description?: string;
//   orderNumber: number;
//   color?: string;
// }

export const MyAccountMainPage: FC = () => {
  //   const navigate = useNavigate();
  //   const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);

  //   useEffect(() => {
  //     const fetchCourseTypes = async () => {
  //       try {
  //         const response = await fetch('http://localhost:4444/courseTypes');
  //         const data = await response.json();
  //         setCourseTypes(data);
  //       } catch (error) {
  //         console.error('Ошибка при загрузке courseTypes:', error);
  //       }
  //     };

  //     fetchCourseTypes();
  //   }, []);

  return (
    <Page back={false}>
      <Header2
                title="Мой аккаунт"
                icon={<PersonIcon sx={{ color: '#4ade80', fontSize: 24 }} />}
              />

      <TabbarMenu />
    </Page>
  );
};
