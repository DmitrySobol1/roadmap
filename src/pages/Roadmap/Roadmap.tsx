import type { FC } from 'react';

import { Section, List, Cell, Divider } from '@telegram-apps/telegram-ui';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import { Icon16Chevron } from '@telegram-apps/telegram-ui/dist/icons/16/chevron';
import { Icon28Edit } from '@telegram-apps/telegram-ui/dist/icons/28/edit';
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats';



// import styles from './Roadmap.module.css';

export const Roadmap: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section header="Roadmap разработчика чат-ботов">
          <Link to="/trainee">
            <Cell
              before={<Icon28Edit />}
              after={<Icon16Chevron />}
              subtitle="только начал изучение"
            >
              Стажер (Trainee)
            </Cell>
          </Link>

          <Divider />

         
          <Link to="/junior">
            <Cell
              before={<Icon28Stats />}
              after={<Icon16Chevron />}
              subtitle="стандартный функционал"
            >
              Начинающий (Junior)
            </Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
