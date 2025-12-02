import { Tabbar } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';

import PersonIcon from '@mui/icons-material/Person';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { ROUTES } from '@/constants/routes.ts';
import './TabbarMenu.css';

export const TabbarMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = useMemo(
    () => [
      {
        id: 1,
        text: 'Главная',
        Icon: FormatListBulletedIcon,
        path: ROUTES.INDEX,
      },
      {
        id: 2,
        text: 'Профиль',
        Icon: PersonIcon,
        path: ROUTES.MY_ACCOUNT,
      },
      // {
      //   id: 3,
      //   text: 'вкладка 3',
      //   Icon: PersonIcon,
      //   path: ROUTES.MY_ACCOUNT,
      // },
    ],
    ['главная', 'профиль', ]
  );

  const getInitialTab = useCallback(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    return currentTab ? currentTab.id : tabs[0].id;
  }, [tabs, location.pathname]);

  const [currentTab, setCurrentTab] = useState(getInitialTab());

  // Синхронизируем состояние при изменении URL через навигацию вручную
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setCurrentTab(currentTab.id);
    }
  }, [location.pathname, tabs]);

  const changePage = useCallback(
    (id: number) => {
      const tab = tabs.find((t) => t.id === id);
      if (tab) {
        setCurrentTab(id);
        navigate(tab.path);
      }
    },
    [tabs, navigate]
  );

  return (
    <Tabbar className="tabbar-menu">
      {tabs.map(({ id, text, Icon }) => (
        <Tabbar.Item
          key={id}
          text={text}
          selected={id === currentTab}
          onClick={() => changePage(id)}
        >
          <Icon />
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
};
