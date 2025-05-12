import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Section, List, Cell, Image, Tabbar } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page.tsx';

import { Icon28Devices } from '@telegram-apps/telegram-ui/dist/icons/28/devices';
import { Icon28Archive } from '@telegram-apps/telegram-ui/dist/icons/28/archive';
import { Icon28Heart } from '@telegram-apps/telegram-ui/dist/icons/28/heart';

import soon from '../../img/soon.png';

export const Materials: FC = () => {
  const tabs = [
    {
      id: 1,
      text: 'Roadmap',
      Icon: Icon28Heart,
    },
    {
      id: 2,
      text: 'Материалы',
      Icon: Icon28Devices,
    },
    {
      id: 3,
      text: 'Шаблоны',
      Icon: Icon28Archive,
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[1].id);
  const navigate = useNavigate();

  function changePage(id: number) {
    setCurrentTab(id);
    if (id === 1) {
      navigate('/roadmap');
    } else if (id === 2) {
      navigate('/materials');
    } else if (id === 3) {
      navigate('/templates');
    }
  }

  return (
    <Page back={false}>
      <List>
        <Section header="Архив материалов">
          <Cell
            multiline
            subtitle="здесь будет собран архив всех обучающих материалов, с возможностью быстрого поиска по ключевым словам, используемым блокам, уровню сложности и т.д. Вы сможете быстро найти ответ на любой ваш вопрос по разработке за считанные секунды"
          >
            <Image size={48} src={soon} />
            Раздел скоро появится ...
          </Cell>
        </Section>

        <Tabbar>
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
      </List>
    </Page>
  );
};
