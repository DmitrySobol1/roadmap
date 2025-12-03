import { useState, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/axios';

import { Page } from '@/components/Page.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { CardList } from '@/components/CardList/CardList.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

import Inventory2Icon from '@mui/icons-material/Inventory2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CircularProgress } from '@mui/material';

interface StockItem {
  _id: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  longDescription?: string;
  text1?: string;
  text2?: string;
  orderNumber: number;
}

export const StockPage: FC = () => {
  const navigate = useNavigate();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const { data } = await axios.get('/stock');
        if (Array.isArray(data)) {
          setStockItems(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке stock:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  const handleToggle = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  if (loading) {
    return (
      <Page back={false}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress sx={{ color: '#4ade80' }} />
        </div>
      </Page>
    );
  }

  return (
    <Page back={false}>
      <Header2
        title="Хранилище"
        icon={<Inventory2Icon sx={{ color: '#4ade80', fontSize: 24 }} />}
      />

      {stockItems.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
          Записи ещё не добавлены
        </p>
      ) : (
        <CardList>
          {stockItems.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              subtitle={item.shortDescription || ''}
              badge={{
                isShown: true,
                text: <ArrowForwardIcon sx={{ fontSize: 18 }} />,
                color: '#4ade80',
              }}
              isAccordion={true}
              accordionContent={
                <p style={{ whiteSpace: 'pre-line' }}>
                  {item.longDescription}
                </p>
              }
              isOpen={openAccordion === item._id}
              onToggle={() => handleToggle(item._id)}
              onClick={() => navigate(`/stock_item/${item._id}`)}
            />
          ))}
        </CardList>
      )}

      <TabbarMenu />
    </Page>
  );
};
