import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Section,
  List,
  Cell,
  
  Tabbar,
  Chip
} from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page.tsx';

import { Icon28Devices } from '@telegram-apps/telegram-ui/dist/icons/28/devices';
import { Icon28Archive } from '@telegram-apps/telegram-ui/dist/icons/28/archive';
import { Icon28Heart } from '@telegram-apps/telegram-ui/dist/icons/28/heart';



export const Templates: FC = () => {
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

  const [currentTab, setCurrentTab] = useState(tabs[2].id);
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
        <Section header="Готовые шаблоны проектов">
          <Cell
            // before={ <Image size={48} src={soon}/>}
            multiline
            //   after={<Icon16Chevron />}
            subtitle="здесь будут собраны готовые шаблоны разных проектов, в том числе и те, доступ к которым сейчас закрыт и выдается только избранным)"
          >
            
            <div style={{marginBottom:'10px'}}>
                          <Chip mode='mono'>Скоро ... </Chip>
                        </div>
            Раздел в разработке 
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
