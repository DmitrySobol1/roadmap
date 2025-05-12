import type { FC } from 'react';

import { Section, List, Cell, Divider, Image } from '@telegram-apps/telegram-ui';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import { Icon16Chevron } from '@telegram-apps/telegram-ui/dist/icons/16/chevron';

import traineepic from '../../img/trainee.png'
import junpic from '../../img/jun.png'
import middlepic from '../../img/mid.png'
import senpic from '../../img/sen.png'

// import styles from './Roadmap.module.css';

export const Roadmap: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section header="Roadmap разработчика чат-ботов">
          <Link to="/trainee">
            <Cell
              before={<Image size={40} src={traineepic}/>}
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
              before={<Image size={40} src={junpic}/>}
              after={<Icon16Chevron />}
              subtitle="знает стандартные функции"
            >
              Начинающий (junior)
            </Cell>
          </Link>

          
        
          <Link to="/middle">
            <Cell
              before={<Image size={40} src={middlepic}/>}
              after={<Icon16Chevron />}
              subtitle="делает любые интеграции"
            >
              Средний (middle)
            </Cell>
          </Link>
        
          <Link to="/senior">
            <Cell
              before={<Image size={40} src={senpic}/>}
              after={<Icon16Chevron />}
              subtitle="разрабатывает mini app"
            >
              Профи (senior)
            </Cell>
          </Link>
        
        
        </Section>
      </List>
    </Page>
  );
};
