import { z } from 'zod';

export const recipientSchema = z.object({
  name: z.string().min(1, '받는 사람 이름을 입력해주세요.'),
  phone: z
    .string()
    .regex(/^010\d{8}$/, '전화번호 형식이 올바르지 않아요. (예: 01012345678)'),
  quantity: z.coerce.number().min(1, '수량은 1개 이상이어야 해요.'),
});

export const orderSchema = z
  .object({
    message: z.string().min(1, '메시지를 입력해주세요.'),
    senderName: z.string().min(1, '보내는 사람 이름을 입력해주세요.'),
    selectedCardId: z
      .number()
      .nullable()
      .refine((v) => v !== null, {
        message: '카드를 선택해주세요.',
      }),
    recipients: z
      .array(recipientSchema)
      .min(1, '최소 1명 이상 입력해주세요.')
      .max(10, '최대 10명까지만 입력할 수 있어요.'),
  })
  .refine(
    (data) => {
      const phones = data.recipients.map((r) => r.phone);
      return new Set(phones).size === phones.length;
    },
    {
      message: '전화번호가 중복되었습니다.',
      path: ['recipients'],
    }
  );

export type OrderFormData = {
  message: string;
  senderName: string;
  selectedCardId: number | null;
  recipients: {
    name: string;
    phone: string;
    quantity: number;
  }[];
};
