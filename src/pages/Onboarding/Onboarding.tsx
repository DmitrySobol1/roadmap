import { Section, List, Steps, Cell, Button } from '@telegram-apps/telegram-ui';

import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';

import onboardingImg1 from '../../img/onb1.jpg';
import onboardingImg2 from '../../img/onb2.jpg';
import onboardingImg3 from '../../img/onb3.jpg';

import styles from './Onboarding.module.css';

export const Onboarding: FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  function mainBtnListener() {
    setStep(step + 1);
    if (step == 3) {
      navigate('/roadmap');
    }
  }

  return (
    <Page back={true}>
      <List>
        <Section header="Что есть в приложении">
          <Steps count={3} progress={step} />
          {step == 1 && (
            <Cell multiline>
              <div className={styles.divImg}>
                <img src={onboardingImg1} className={styles.onboardingImg} />
              </div>
              <p>
                На вкладке «Roadmap» вы найдете подробную информацию для каждого
                уровня разработчика
              </p>
            </Cell>
          )}
          {step == 2 && (
            <Cell multiline>
              <div className={styles.divImg}>
                <img src={onboardingImg2} className={styles.onboardingImg2} />
              </div>
              <p>
                Провалившись в конкретный уровень вы найдете инструкции, как
                улучшить свои текущие навыки
              </p>
            </Cell>
          )}
          {step == 3 && (
            <Cell multiline>
              <div className={styles.divImg}>
                <img src={onboardingImg3} className={styles.onboardingImg} />
              </div>
              <p>
                На текущий момент полностью готов раздел «Roadmap разработчика».
                «Архив материалов» и «Шаблоны проектов» станут доступны в
                ближайшее время
              </p>
            </Cell>
          )}

          <div className={styles.btnDiv}>
            <div className={styles.nextBtn}>
              <Button
                mode="filled"
                size="m"
                stretched
                onClick={mainBtnListener}
              >
                Далее
              </Button>
            </div>
          </div>
        </Section>
      </List>
    </Page>
  );
};
