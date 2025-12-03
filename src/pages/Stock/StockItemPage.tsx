import { useState, useEffect, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/axios';

import { Page } from '@/components/Page.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
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

export const StockItemPage: FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  const navigate = useNavigate();
  const [stockItem, setStockItem] = useState<StockItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockItem = async () => {
      try {
        const { data } = await axios.get(`/stock/${stockId}`);
        setStockItem(data);
      } catch (error) {
        console.error('Ошибка при загрузке stock item:', error);
      } finally {
        setLoading(false);
      }
    };

    if (stockId) {
      fetchStockItem();
    }
  }, [stockId]);

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

  if (!stockItem) {
    return (
      <Page back={false}>
        <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
          Запись не найдена
        </p>
      </Page>
    );
  }

  return (
    <Page back={false}>
      <Header2 subtitle={stockItem.title} />

      <div style={{ padding: '0 16px', marginBottom: '80px' }}>
        {stockItem.longDescription && (
          <p style={{ color: '#ccc', whiteSpace: 'pre-line', marginBottom: '16px' }}>
            {stockItem.longDescription}
          </p>
        )}

        {stockItem.text1 && (
          <div
            style={{
              backgroundColor: '#1a1a1a',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '12px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#4ade80',
              overflowX: 'auto',
            }}
          >
            {stockItem.text1}
          </div>
        )}

        {stockItem.text2 && (
          <div
            style={{
              backgroundColor: '#1a1a1a',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '12px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#4ade80',
              overflowX: 'auto',
            }}
          >
            {stockItem.text2}
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '16px',
          right: '16px',
          backgroundColor: '#4ade80',
          color: '#000',
          border: 'none',
          borderRadius: '12px',
          padding: '14px 24px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
          font: 'inherit'
        }}
      >
        Назад
      </button>
    </Page>
  );
};
