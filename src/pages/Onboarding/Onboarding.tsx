import { Section, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';


import { Page } from '@/components/Page.tsx';



export const Onboarding: FC = () => {


  return (
    <Page back={false}>
      <List>
        
        <Section
          header="Тут будет онбординг"
        //   footer="These pages help developer to learn more about current launch information"
        >
          
          
        </Section>
      </List>
    </Page>
  );
};
