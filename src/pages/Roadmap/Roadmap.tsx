import { Section, List, Cell } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Icon16Chevron } from '@telegram-apps/telegram-ui/dist/icons/16/chevron';
import { Icon28Edit } from '@telegram-apps/telegram-ui/dist/icons/28/edit';
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats';

// import { useState } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

// import { AdditionalInfo } from './AdditionalInfo';

export const Roadmap: FC = () => {
//   const [isShown, setShown] = useState(true);
//   const [level, setLevel] = useState('trainee');

//   function showAdditionalInfo(lev:string) {
//     setLevel(lev);
//     // setShown(!isShown)

//   }

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
          

          <Link to="/junior">
          <Cell
            before={<Icon28Stats />}
            after={<Icon16Chevron />}
            subtitle="стандартный функционал"
            
          >
            Новичок (Junior)
          </Cell>
          </Link>
        </Section>

        {/* {isShown && (
          <Section>
            <AdditionalInfo level={level} />
          </Section>
        )} */}
      </List>
    </Page>
  );
};
