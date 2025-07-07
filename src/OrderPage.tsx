import { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '@/AuthContext';
import orderCard from './orderCard';
import useCustomTheme from '@/useCustomTheme';

const OrderPage = () => {
  const theme = useCustomTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Navigate
        to="/homepage/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const productPrice = 29000;
  const productName = 'BBQ 양념치킨+크림치즈볼+콜라1.25L';
  const totalPrice = quantity * productPrice;

  const selectedCard = orderCard.find((c) => c.id === selectedCardId);

  const isValidMessage = message.trim().length > 0;
  const isValidSender = senderName.trim().length > 0;
  const isValidRecipient = recipientName.trim().length > 0;
  const isValidPhone = /^010\d{8}$/.test(recipientPhone);
  const isValidQuantity = quantity >= 1;

  const isFormValid =
    selectedCardId &&
    isValidMessage &&
    isValidSender &&
    isValidRecipient &&
    isValidPhone &&
    isValidQuantity;

  const handleSelectCard = (cardId: number) => {
    if (selectedCardId === cardId) {
      setSelectedCardId(null);
      setMessage('');
    } else {
      const card = orderCard.find((c) => c.id === cardId);
      if (card) {
        setSelectedCardId(card.id);
        setMessage(card.defaultTextMessage);
      }
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    alert(
      `주문이 완료되었습니다!\n` +
        `상품명: ${productName}\n` +
        `구매 수량: ${quantity}\n` +
        `발신자 이름: ${senderName}\n` +
        `메시지: ${message}`
    );

    navigate('/');
  };

  return (
    <section
      css={{
        maxWidth: 480,
        margin: 'auto',
        padding: theme.spacing.spacing5,
      }}
    >
      <h1 css={{ marginBottom: theme.spacing.spacing4 }}>선물하기</h1>

      <div css={{ marginBottom: theme.spacing.spacing4 }}>
        <h3>메시지 카드 선택</h3>
        <div
          style={{
            overflowX: 'auto',
            display: 'flex',
            gap: 8,
            padding: '8px 0',
            borderBottom: '1px solid #ddd',
            marginBottom: 16,
          }}
        >
          {orderCard.slice(0, 12).map((card) => (
            <img
              key={card.id}
              src={card.thumbUrl}
              alt="card-thumbnail"
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                cursor: 'pointer',
                border:
                  selectedCardId === card.id
                    ? `2px solid ${theme.colors.blue900}`
                    : '1px solid #ccc',
                boxShadow:
                  selectedCardId === card.id
                    ? `0 0 6px ${theme.colors.blue900}`
                    : 'none',
              }}
              onClick={() => handleSelectCard(card.id)}
            />
          ))}
        </div>

        {selectedCard && (
          <img
            src={selectedCard.imageUrl}
            alt="selected-card"
            style={{
              width: '100%',
              borderRadius: 15,
              marginBottom: 12,
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      <div css={{ marginBottom: theme.spacing.spacing2 }}>
        <label>메시지 내용</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="카드 메시지를 입력하세요."
          style={{
            width: '100%',
            padding: 8,
            fontSize: 14,
            borderRadius: 8,
            border: '1px solid #ccc',
            resize: 'vertical',
            marginTop: 6,
          }}
        />
        {!isValidMessage && (
          <div style={{ color: 'red', fontSize: 12 }}>
            메시지는 반드시 입력되어야 해요.
          </div>
        )}
      </div>

      <div css={{ marginBottom: theme.spacing.spacing2 }}>
        <label>보내는 사람 이름</label>
        <input
          type="text"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="보내는 분 이름"
          style={{ width: '100%', padding: 8, marginTop: 6 }}
        />
        {!isValidSender && (
          <div style={{ color: 'red', fontSize: 12 }}>
            보내는 사람 이름이 필요해요.
          </div>
        )}
      </div>

      <div css={{ marginBottom: theme.spacing.spacing2 }}>
        <label>받는 사람 이름</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="받는 분 이름"
          style={{ width: '100%', padding: 8, marginTop: 6 }}
        />
        {!isValidRecipient && (
          <div style={{ color: 'red', fontSize: 12 }}>
            받는 사람 이름이 필요해요.
          </div>
        )}
      </div>

      <div css={{ marginBottom: theme.spacing.spacing2 }}>
        <label>받는 사람 전화번호</label>
        <input
          type="tel"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
          placeholder="01012341234"
          style={{ width: '100%', padding: 8, marginTop: 6 }}
        />
        {!isValidPhone && (
          <div style={{ color: 'red', fontSize: 12 }}>
            전화번호 형식이 올바르지 않아요. (예: 01012345678)
          </div>
        )}
      </div>

      <div css={{ marginBottom: theme.spacing.spacing2 }}>
        <label>수량</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ width: '100%', padding: 8, marginTop: 6 }}
        />
        {!isValidQuantity && (
          <div style={{ color: 'red', fontSize: 12 }}>
            수량은 1개 이상이어야 해요.
          </div>
        )}
      </div>

      <div style={{ textAlign: 'right', marginBottom: 12 }}>
        <strong>총 금액: {totalPrice.toLocaleString()}원</strong>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isFormValid}
        style={{
          backgroundColor: theme.colors.semantic.kakaoYellow,
          color: 'black',
          border: 'none',
          padding: '12px 20px',
          borderRadius: 10,
          cursor: 'pointer',
          fontWeight: 'bold',
          opacity: isFormValid ? 1 : 0.6,
        }}
      >
        {totalPrice.toLocaleString()}원 주문하기
      </button>
    </section>
  );
};

export default OrderPage;
