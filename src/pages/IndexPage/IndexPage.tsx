import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';


export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        
        <Section
          header="Roadmap разработчика чат-ботов"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link to="/roadmap">
            <Cell subtitle="уровни развития разработчика">Изучить roadmap</Cell>
          </Link>
          
        </Section>
      </List>
    </Page>
  );
};
