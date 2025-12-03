import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { Onboarding } from '@/pages/Onboarding/Onboarding';
import { EnterPage } from '@/pages/EnterPage/EnterPage';
import { CourseListPage } from '@/pages/CourseListPage/CourseListPage';
import { LessonListPage } from '@/pages/LessonListPage/LessonListPage';
import { LessonPage } from '@/pages/LessonPage/LessonPage';
import { MyAccountMainPage } from '@/pages/MyAccount/MyAccountMainPage';
import { FavoritesLessonsPage } from '@/pages/FavoritesLessons/FavoritesLessons';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: EnterPage },
  { path: '/index', Component: IndexPage },
  { path: '/onboarding', Component: Onboarding },
  { path: '/course-list_page/:typeId', Component: CourseListPage },
  { path: '/lessons/:courseId', Component: LessonListPage },
  { path: '/lesson/:lessonId', Component: LessonPage },
  { path: '/myaccount-main_page', Component: MyAccountMainPage },
  { path: '/favorites-lessons_page', Component: FavoritesLessonsPage },
];
