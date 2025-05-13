import {
  Section,
  List,
  Cell,
  Placeholder,
  Banner,
  Button,
  Modal,
} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';

import styles from './Roadmap.module.css';

import { Icon24QR } from '@telegram-apps/telegram-ui/dist/icons/24/qr';
import youtubelogo from '../../img/youtubelogo.png';
import vklogo from '../../img/vklogo.png';
import traineepic from '../../img/trainee.png'


export const Trainee: FC = () => {

  const navigate = useNavigate();
  function showVideo(platform: string) {
    if (platform === 'yt') {
      window.open(
        'https://www.youtube.com/playlist?list=PLRNHYuZu4T1V_OQ0GE-CtZ9HsyRzuaV6k',
        '_blank'
      );
    } else {
      window.open('https://vkvideo.ru/playlist/-228193677_3', '_blank');
    }
  }

  function backBtnListener(){
navigate('/roadmap');
  }


  return (
    <Page back={true}>
      <List>
        <Section>
          <Placeholder
            description="тот, кто только только начал изучение разработки"
            header="Стажер (Trainee)"
          >
            <img
              alt="sticker"
              className={styles.levelimg}
              // src="https://xelene.me/telegram.gif"
              src={traineepic}
            />
          </Placeholder>
        </Section>

        <Section header="Какие навыки нужны на данном уровне">
          <Cell multiline>- навыков в разработке практически нет</Cell>
        </Section>

        <Section header="Как перейти на следующий уровень">
          <Banner
            before={<Icon24QR />}
            //   callout="Urgent notification"
            header="Бесплатный курс «Первый интенсив»"
            description="Чтобы быстро стартануть в теме разработки, достаточно изучить наш бесплатный мини-курс «Первый интенсив». В нем есть вся нужная информация для перехода на уровень «Junior» "
            type="section"
          >
            

            <Modal trigger={<Button size="s">Начать изучение</Button>}>
          <Section>
            <div className={styles.wrapperModal}>
              <div className={styles.wrapperIcons}>
                <div onClick={() => showVideo('yt')}>
                  <img src={youtubelogo} className={styles.logoimg} />
                  <Cell>на YouTube</Cell>
                </div>
                <div onClick={() => showVideo('vk')}>
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


          </Banner>
        </Section>

<div className={styles.btnDiv}>
            <div className={styles.backBtn}>
              <Button
                mode="filled"
                size="m"
                stretched
                onClick={backBtnListener}
              >
                назад
              </Button>
            </div>
          </div>
        
      </List>
    </Page>
  );
};
