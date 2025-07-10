import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema } from '@/schemas/orderSchema';
import type { OrderFormData } from '@/schemas/orderSchema';
import orderCard from '../data/orderCard';
import useRequireAuth from '@/hooks/useRequireAuth';
import useCustomTheme from '@/hooks/useCustomTheme';
import type { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
const OrderPage = () => {
  const theme = useCustomTheme();
  const navigate = useNavigate();
  const user = useRequireAuth();

  if (!user) return null;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      message: '',
      senderName: '',
      selectedCardId: null,
      recipients: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recipients',
  });

  const selectedCardId = watch('selectedCardId');
  const recipients = watch('recipients');
  const selectedCard =
    selectedCardId !== null
      ? orderCard.find((c) => c.id === selectedCardId)
      : undefined;

  const productPrice = 29000;
  const totalQuantity = recipients.reduce(
    (sum, r) => sum + (r.quantity || 0),
    0
  );
  const totalPrice = totalQuantity * productPrice;

  const handleSelectCard = (cardId: number) => {
    const isSelected = selectedCardId === cardId;
    setValue('selectedCardId', (isSelected ? null : cardId) as number | null);
    setValue(
      'message',
      isSelected
        ? ''
        : orderCard.find((c) => c.id === cardId)?.defaultTextMessage || ''
    );
  };

  const onSubmit: SubmitHandler<OrderFormData> = (data) => {
    alert(
      `🎉 주문 완료! 총 ${totalPrice.toLocaleString()}원\n보내는 분: ${data.senderName}`
    );
    navigate('/');
  };

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={{ maxWidth: 480, margin: 'auto', padding: theme.spacing.spacing5 }}
    >
      <h1 css={{ marginBottom: theme.spacing.spacing4 }}>선물하기</h1>
      <section>
        <h3>메시지 카드 선택</h3>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 8,
            margin: '8px 0 16px',
          }}
        >
          {orderCard.slice(0, 12).map((card) => (
            <img
              key={card.id}
              src={card.thumbUrl}
              alt="card"
              onClick={() => handleSelectCard(card.id)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                cursor: 'pointer',
                border:
                  selectedCardId === card.id
                    ? `2px solid ${theme.colors.blue900}`
                    : '1px solid #ccc',
              }}
            />
          ))}
        </div>
        {selectedCard && (
          <img
            src={selectedCard.imageUrl}
            style={{ width: '100%', borderRadius: 12 }}
          />
        )}
        {errors.selectedCardId && (
          <p style={{ color: 'red' }}>{errors.selectedCardId.message}</p>
        )}
      </section>

      <div style={{ margin: '12px 0' }}>
        <label>메시지</label>
        <textarea {...register('message')} rows={3} style={{ width: '100%' }} />
        {errors.message && (
          <p style={{ color: 'red' }}>{errors.message.message}</p>
        )}
      </div>
      <div>
        <label>보내는 사람 이름</label>
        <input {...register('senderName')} style={{ width: '100%' }} />
        {errors.senderName && (
          <p style={{ color: 'red' }}>{errors.senderName.message}</p>
        )}
      </div>
      <section
        style={{
          marginTop: 16,
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 16,
          backgroundColor: '#fafafa',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>받는 사람</h3>

        {fields.length === 0 ? (
          <p style={{ color: '#888' }}>아직 추가된 받는 사람이 없습니다.</p>
        ) : (
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            {fields.map((field, index) => (
              <li key={field.id}>
                {watch(`recipients.${index}.name`) || '이름 없음'} /{' '}
                {watch(`recipients.${index}.phone`) || '번호 없음'} /{' '}
                {watch(`recipients.${index}.quantity`) || 1}개
              </li>
            ))}
          </ul>
        )}

        <Button baseColor="black" onClick={() => setModalOpen(true)}>
          추가
        </Button>

        {errors.recipients && typeof errors.recipients.message === 'string' && (
          <p style={{ color: 'red', marginTop: 8 }}>
            {errors.recipients.message}
          </p>
        )}
      </section>
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: 24,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            borderRadius: 16,
            width: '100%',
            maxWidth: 480,
            maxHeight: '90vh',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          <h2 style={{ fontWeight: 700, marginBottom: 8 }}>받는 사람</h2>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
            * 최대 10명까지 추가할 수 있어요.
            <br />* 받는 사람의 전화번호를 중복으로 입력할 수 없어요.
          </p>

          <button
            type="button"
            onClick={() => {
              if (fields.length < 10) {
                append({ name: '', phone: '', quantity: 1 });
              }
            }}
            style={{
              marginBottom: 16,
              padding: '6px 12px',
              backgroundColor: '#eee',
              borderRadius: 6,
              border: 'none',
              cursor: fields.length < 10 ? 'pointer' : 'not-allowed',
            }}
            disabled={fields.length >= 10}
          >
            추가하기
          </button>

          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{
                borderTop: '1px solid #ddd',
                paddingTop: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <strong>받는 사람 {index + 1}</strong>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  style={{
                    border: '1px solid #ccc',
                    fontSize: 16,
                    cursor: 'pointer',
                    color: '#888',
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ marginTop: 8 }}>
                <input
                  {...register(`recipients.${index}.name` as const)}
                  placeholder="이름을 입력하세요."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    marginBottom: 4,
                  }}
                />
                {errors.recipients?.[index]?.name && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: 0,
                      marginBottom: 8,
                      fontSize: 12,
                    }}
                  >
                    {errors.recipients[index]?.name?.message}
                  </p>
                )}

                <input
                  {...register(`recipients.${index}.phone` as const)}
                  placeholder="전화번호를 입력하세요."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    marginBottom: 4,
                  }}
                />
                {errors.recipients?.[index]?.phone && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: 0,
                      marginBottom: 8,
                      fontSize: 12,
                    }}
                  >
                    {errors.recipients[index]?.phone?.message}
                  </p>
                )}
                <input
                  type="number"
                  min={1}
                  {...register(`recipients.${index}.quantity` as const)}
                  placeholder="수량"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 8,
                  }}
                />
                {errors.recipients?.[index]?.quantity && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: 0,
                      marginBottom: 8,
                      fontSize: 12,
                    }}
                  >
                    {errors.recipients[index]?.quantity?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ccc',
                background: '#fff',
              }}
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: 'none',
                backgroundColor: '#ffeb00',
                fontWeight: 'bold',
              }}
            >
              {fields.length}명 완료
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <strong>총 금액: {totalPrice.toLocaleString()}원</strong>
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          marginTop: 12,
          padding: 12,
          backgroundColor: theme.colors.semantic.kakaoYellow,
          fontWeight: 'bold',
          borderRadius: 8,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {totalPrice.toLocaleString()}원 주문하기
      </button>
    </form>
  );
};

export default OrderPage;
