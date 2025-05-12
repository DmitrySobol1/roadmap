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

export const Junior: FC = () => {
  function openSite() {
    window.open('https://easydev-school.ru/bootcamp', '_blank');
  }

  function showVideoIntensive(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://www.youtube.com/playlist?list=PLRNHYuZu4T1V_OQ0GE-CtZ9HsyRzuaV6k',
        '_blank'
      );
    } else {
      window.open('https://vkvideo.ru/playlist/-228193677_3', '_blank');
    }
  }

  function showVideoTlgShop(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://www.youtube.com/playlist?list=PLRNHYuZu4T1UnR52kzDpBwZM3SXoVL2cr',
        '_blank'
      );
    } else {
      window.open('https://vkvideo.ru/playlist/-228193677_2', '_blank');
    }
  }

  function showVideoOnlineSchool(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://www.youtube.com/playlist?list=PLRNHYuZu4T1VJBSDuXpO2fRMg5PLqRgPx',
        '_blank'
      );
    } else {
      window.open('https://vkvideo.ru/playlist/-228193677_4', '_blank');
    }
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
          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="1" />}
            description="знать блоки цепочка сообщений, условия,
            операция над переменной"
            multiline
          >
            Базовые блоки платформы
          </Cell>

          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="1" />}
            description="понимать, что такое «переменные», «теги» и для чего они могут
            использоваться"
            multiline
          >
            Основные понятия
          </Cell>
        </Section>

        <Section header="Как перейти на следующий уровень">
          <Banner
            before={<Icon28AddCircle />}
            //   callout="Urgent notification"
            header="Программа «Буткемп»"
            description="чтобы быстро освоить навыки для перехода на следующий уровень, достаточно пройти нашу программу «Буткемп»"
            type="section"
          >
            <Button size="s" before={<Icon16Chevron />} onClick={openSite}>
              Узнать подробнее
            </Button>
          </Banner>
        </Section>

        <Section header="Полезно изучить на данном уровне">
          <Modal
            // header={<Icon16Chevron/>}
            style = {{backgroundColor:'#ebebeb'}}
            trigger={
              <Cell
                Component="label"
                before={<Icon16Chevron />}
                description="«база» по работе на платформе"
                multiline
              >
                Первый интенсив
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoIntensive('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  <div onClick={() => showVideoIntensive('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div>
                </div>
                <span className={styles.text}>
                  Смотреть бесплатный курс «Первый интенсив»
                </span>
              </div>
            </Section>
          </Modal>

          <Modal
            trigger={
              <Cell
                Component="label"
                before={<Icon16Chevron />}
                description="готовый шаблон и обучение созданию магазина с оплатой, реферальной системой и розыгрышем"
                multiline
              >
                Телеграм магазин
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoTlgShop('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  <div onClick={() => showVideoTlgShop('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div>
                </div>
                <span className={styles.text}>
                  Смотреть плейлист создание «Telegram магазина»
                </span>
              </div>
            </Section>
          </Modal>

          <Modal
            trigger={
              <Cell
                Component="label"
                before={<Icon16Chevron />}
                description="готовый шаблон и обучение созданию проекта для онлайн образования"
                multiline
              >
                Онлайн школа в боте
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoOnlineSchool('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  <div onClick={() => showVideoOnlineSchool('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div>
                </div>
                <span className={styles.text}>
                  Смотреть плейлист бот для «Онлайн школы»
                </span>
              </div>
            </Section>
          </Modal>
        </Section>
      </List>
    </Page>
  );
};
