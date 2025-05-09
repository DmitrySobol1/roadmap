import {
    Section,
    List,
    Cell,
    Placeholder,
    Banner,
    Button
    
  } from '@telegram-apps/telegram-ui';
  import type { FC } from 'react';
  
  
  import { Page } from '@/components/Page.tsx';
  
  import styles from './Roadmap.module.css';
  

  import { Icon28AddCircle } from '@telegram-apps/telegram-ui/dist/icons/28/add_circle';
  import { Icon16Chevron } from '@telegram-apps/telegram-ui/dist/icons/16/chevron';
//   import youtubelogo from '../../img/youtubelogo.png';
//   import vklogo from '../../img/vklogo.png';
  
  export const Junior: FC = () => {
    
    function openSite() {
      
        window.open(
          'https://easydev-school.ru/bootcamp',
          '_blank'
        );
      }
    
  
    return (
      <Page back={true}>
        <List>
          <Section>
            <Placeholder
              description="тот, кто владеет стандартным функционалом ноу-код платформы"
              header="Начинающий (Junior)"
            >
              <img
                alt="sticker"
                className={styles.levelimg}
                src="https://xelene.me/telegram.gif"
              />
            </Placeholder>
          </Section>
  
          <Section header="Какие навыки нужны на данном уровне">
            <Cell multiline>- знать базовые блоки платформы (цепочка сообщений, условия, операция над переменной)</Cell>
            <Cell multiline>- понимать, что такое «переменные», «теги» и для чего они могут использоваться</Cell>
          </Section>
  
          <Section header="Как перейти на следующий уровень">
            <Banner
              before={<Icon28AddCircle />}
              //   callout="Urgent notification"
              header="Программа «Буткемп»"
              description="чтобы быстро освоить навыки для перехода на следующий уровень, достаточно пройти нашу программу «Буткемп»"
              type="section"
            >
              
  
             <Button size="s" before={<Icon16Chevron />} onClick={openSite}>Узнать подробнее</Button>
             
  
  
            </Banner>
          </Section>
  
          
        </List>
      </Page>
    );
  };
  