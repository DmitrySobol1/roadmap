import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { Section, List, Cell, Divider, Image,Tabbar } from '@telegram-apps/telegram-ui';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import { Icon16Chevron } from '@telegram-apps/telegram-ui/dist/icons/16/chevron';
import { Icon28Devices  } from '@telegram-apps/telegram-ui/dist/icons/28/devices'
// import { Icon28Stats} from '@telegram-apps/telegram-ui/dist/icons/28/stats'
import { Icon28Archive } from '@telegram-apps/telegram-ui/dist/icons/28/archive'
import { Icon28Heart } from '@telegram-apps/telegram-ui/dist/icons/28/heart'


import traineepic from '../../img/trainee.png'
import junpic from '../../img/jun.png'
import middlepic from '../../img/mid.png'
import senpic from '../../img/sen.png'

// import styles from './Roadmap.module.css';

export const Roadmap: FC = () => {

const tabs = [
    {
      id:1,
      text:'Roadmap',
      Icon: Icon28Heart
    },
    {
      id:2,
      text:'Материалы',
      Icon: Icon28Devices
    },
    {
      id:3,
      text:'Шаблоны',
      Icon: Icon28Archive
    }

  ]

  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const navigate = useNavigate();

  function changePage(id:number){
    setCurrentTab(id);
    if (id === 1){
    navigate('/roadmap');
    } else if (id === 2){
      navigate('/materials');
    } else if (id === 3){
      navigate('/templates');
    } 
  }

  return (
    <Page back={false}>
      <List>
        <Section header="Roadmap разработчика чат-ботов">
          <Link to="/trainee">
            <Cell
              before={<Image size={48} src={traineepic}/>}
              after={<Icon16Chevron />}
              subtitle="только начал изучение"
            >
              Стажер (trainee)
            </Cell>
          </Link>

          <Divider />

         
          <Link to="/junior">
            <Cell
              // before={<Icon28Stats />}
              before={<Image size={48} src={junpic}/>}
              after={<Icon16Chevron />}
              subtitle="знает стандартные функции"
            >
              Начинающий (junior)
            </Cell>
          </Link>

          
        
          <Link to="/middle">
            <Cell
              before={<Image size={48} src={middlepic}/>}
              after={<Icon16Chevron />}
              subtitle="делает любые интеграции"
            >
              Средний (middle)
            </Cell>
          </Link>
        
          <Link to="/senior">
            <Cell
              before={<Image size={48} src={senpic}/>}
              after={<Icon16Chevron />}
              subtitle="разрабатывает mini app"
            >
              Профи (senior)
            </Cell>
          </Link>
        
        
        </Section>


      <Tabbar>
        {tabs.map(({
        id,
        text,
        Icon
      }) => <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={()=>changePage(id)}>
            <Icon/>
          </Tabbar.Item>)}
      </Tabbar>


      </List>





    </Page>
  );
};
