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
// import vklogo from '../../img/vklogo.png';
import senpic from '../../img/sen.png'

export const Senior: FC = () => {
  function openSite() {
    window.open('https://easydev-school.ru/tma', '_blank');
  }

  function showVideoTmaForAppointment(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://www.youtube.com/playlist?list=PL_IVHN220V2H5RXzSqz6WEX3GnCGUevxu',
        '_blank'
      );
    } else {
    //   window.open('https://vkvideo.ru/video-228193677_456239033', '_blank');
    }
  }

  function showVideoTmaOnLowcode(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://www.youtube.com/watch?v=8MIdWEPd7O8',
        '_blank'
      );
    } else {
    //   window.open('https://vkvideo.ru/playlist/-228193677_2', '_blank');
    }
  }

  

  return (
    <Page back={true}>
      <List>
        <Section>
          <Placeholder
            description="тот, кто умеет разрабатывать Telegram mini app любой сложности и с любым функционалом внутри"
            header="Профи (senior)"
          >
            <img
              alt="sticker"
              className={styles.levelimg}
              // src="https://xelene.me/telegram.gif"
              src={senpic}
            />
          </Placeholder>
        </Section>

        <Section header="Какие навыки нужны на данном уровне">
          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="1" />}
            description="знание на базовом уровне технологий HTML+CSS+JS"
            multiline
          >
            HTML+CSS+JS
          </Cell>

          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="1" />}
            description="часто (но не обязательно) знаком с несколькими low-code платформами"
            multiline
          >
            Разные low-code платформы
          </Cell>
        
        
</Section>
        <Section header="Как перейти на следующий уровень">
          <Banner
            before={<Icon28AddCircle />}
            //   callout="Urgent notification"
            header="Разработка TMA"
            description="на данной программе вы получите навык разработки кастомных мини аппов, т.е. аппок с любым функционалом и дизайном"
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
                description="запись эфира по созданию аппки в онлайн режиме, с пошаговой демострацией работы"
                multiline
              >
                TMA для записи на услуги
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoTmaForAppointment('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  {/* <div onClick={() => showVideoTmaForAppointment('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div> */}
                </div>
                <span className={styles.text}>
                  Смотреть плейлист «TMA для записи на услуги»
                </span>
              </div>
            </Section>
          </Modal>

          <Modal
            trigger={
              <Cell
                Component="label"
                before={<Icon16Chevron />}
                description="мини апп для проведения розыгрыша - запись эфира"
                multiline
              >
                TMA на low-code
              </Cell>
            }
          >
            <Section>
              <div className={styles.wrapperModal}>
                <div className={styles.wrapperIcons}>
                  <div onClick={() => showVideoTmaOnLowcode('yt')}>
                    <img src={youtubelogo} className={styles.logoimg} />
                    <Cell>на YouTube</Cell>
                  </div>
                  {/* <div onClick={() => showVideoCloseClub('vk')}>
                    <img src={vklogo} className={styles.logoimg2} />
                    <Cell>в ВКонтакте</Cell>
                  </div> */}
                </div>
                <span className={styles.text}>
                  Смотреть видео «TMA на low-code»
                </span>
              </div>
            </Section>
          </Modal>

         
        </Section>
      </List>
    </Page>
  );
};
