import {
  Section,
  List,
  Cell,
  Placeholder,
  Banner,
  Button,
  Checkbox,
  Modal
  
} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';

import styles from './Roadmap.module.css';

import { Icon28AddCircle } from '@telegram-apps/telegram-ui/dist/icons/28/add_circle';
import { Icon16Chevron } from '@telegram-apps/telegram-ui/dist/icons/16/chevron';


import youtubelogo from '../../img/youtubelogo.png';
import vklogo from '../../img/vklogo.png';

export const Middle: FC = () => {
  function openSite() {
    window.open('https://easydev-school.ru/bootcamp', '_blank');
  }

  function showVideoAIinLichka(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://youtu.be/7gQXexCbnqI?si=SJhc_gf1EdFosTnF',
        '_blank'
      );
    } else {
      window.open('https://vkvideo.ru/video-228193677_456239033', '_blank');
    }
  }

  function showVideoCloseClub(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://youtu.be/Tz-56DwbLM0?si=z0Cj7tT_9SeG5WKV',
        '_blank'
      );
    } else {
      window.open('https://vkvideo.ru/playlist/-228193677_2', '_blank');
    }
  }

  function showVideoConnectPayment(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://youtu.be/WZbH_aE9Xsc?si=FOl0i-q5yWBM8MMz',
        '_blank'
      );
    } else {
      window.open('https://vkvideo.ru/video-228193677_456239017', '_blank');
    }
  }

  return (
    <Page back={true}>
      <List>
        <Section>
          <Placeholder
            description="тот, кто умеет интегрировать бота с любым сервисом по API"
            header="Средний (middle)"
          >
            <img
              alt="sticker"
              className={styles.levelimg}
              src="https://xelene.me/telegram.gif"
            />
          </Placeholder>
        </Section>

        <Section header="Какие навыки нужны на данном уровне">
          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="1" />}
            description="знание работы блоков «http запрос», «JS интерпретатор», «входящий вебхук»"
            multiline
          >
            Продвинутые блоки платформы
          </Cell>

          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="1" />}
            description="умение интегрировать ботов со сторонними сервисами по API"
            multiline
          >
            Интеграции по API
          </Cell>
        

          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="1" />}
            description="использование в работе API Telegram и API Jetbot"
            multiline
          >
            API Telegram и Jetbot
          </Cell>
        
</Section>
        <Section header="Как перейти на следующий уровень">
          <Banner
            before={<Icon28AddCircle />}
            //   callout="Urgent notification"
            header="Программа «Буткемп»"
            description="на программе «Буткемп» вы закрепите знания по текущему уровню и заложите фундамент для перехода на следующий"
            type="section"
          >
            <Button size="s" before={<Icon16Chevron />} onClick={openSite}>
              Узнать подробнее
            </Button>
          </Banner>
        </Section>

        <Section header="Полезно изучить на данном уровне">
          <Modal
            // header={<Icon20ChevronDown/>}
            
            trigger={
              <Cell
                Component="label"
                before={<Icon16Chevron />}
                description="готовый шаблон по интеграции ИИ для ответов в личке по своей базе данных"
                multiline
              >
                Бот с ИИ в личке
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoAIinLichka('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  <div onClick={() => showVideoAIinLichka('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div>
                </div>
                <span className={styles.text}>
                  Смотреть видео «Бот с ИИ в личке»
                </span>
              </div>
            </Section>
          </Modal>

          <Modal
            trigger={
              <Cell
                Component="label"
                before={<Icon16Chevron />}
                description="готовый шаблон для создания закрытого клуба в Телеграм"
                multiline
              >
                Закрытый клуб
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoCloseClub('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  <div onClick={() => showVideoCloseClub('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div>
                </div>
                <span className={styles.text}>
                  Смотреть видео по созданию «Закрытого клуба»
                </span>
              </div>
            </Section>
          </Modal>

          <Modal
            trigger={
              <Cell
                Component="label"
                before={<Icon16Chevron />}
                description="готовый шаблон по подключению платежных систем"
                multiline
              >
                Подключение любой платежки
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoConnectPayment('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  <div onClick={() => showVideoConnectPayment('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div>
                </div>
                <span className={styles.text}>
                  Смотреть видео «Подключение любой платежной системы»
                </span>
              </div>
            </Section>
          </Modal>
        </Section>
      </List>
    </Page>
  );
};
