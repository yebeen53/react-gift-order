import { css } from '@emotion/react';
import useCustomTheme from '../hooks/useCustomTheme';
import type { Theme } from '@/data/theme';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@/components/Button';
import GiftItem from '@/components/GiftItem';
import { useState } from 'react';

const tabs = ['전체', '여성이', '남성이', '청소년이'];
const subTabs = ['받고 싶어한', '많이 선물한', '위시로 받은'];

const products = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  brand: 'BBQ',
  name: 'BBQ',
  price: 29000,
  image:
    'https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg',
}));

const sectionStyle = (theme: Theme) => css`
  padding: ${theme.spacing.spacing5};
`;

const titleStyle = (theme: Theme) => css`
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  margin-bottom: ${theme.spacing.spacing4};
`;

const tabsStyle = (theme: Theme) => css`
  display: flex;
  gap: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing3};
`;

const subTabContainer = (theme: Theme) => css`
  display: flex;
  justify-content: space-around;
  margin-bottom: ${theme.spacing.spacing4};
  font-size: 14px;
`;

const gridStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.spacing4};
`;

const morestyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GiftRanking = () => {
  const theme = useCustomTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedTab = (() => {
    const genderFromSearchParams = searchParams.get('gender');
    if (genderFromSearchParams && tabs.includes(genderFromSearchParams)) {
      return genderFromSearchParams;
    }
    return '전체';
  })();

  const selectedSubTab = (() => {
    const categoryFromSearchParams = searchParams.get('category');
    if (
      categoryFromSearchParams &&
      subTabs.includes(categoryFromSearchParams)
    ) {
      return categoryFromSearchParams;
    }
    return '받고 싶어한';
  })();

  const onTabClick = (tab: string) => {
    setSearchParams(
      { gender: tab, category: selectedSubTab },
      { replace: true }
    );
  };

  const onSubTabClick = (subTab: string) => {
    setSearchParams(
      { gender: selectedTab, category: subTab },
      { replace: true }
    );
  };

  const [visible, setVisible] = useState(6);
  const handleMore = () => {
    setVisible((prev) => Math.min(prev + 3, products.length));
  };

  // 상품 클릭 시 주문 페이지로 이동 (예: /order)
  const handleProductClick = (id: number) => {
    // 필요하면 상품 id 전달 가능 (state나 쿼리)
    navigate('/order', { state: { productId: id } });
  };

  return (
    <section css={sectionStyle(theme)}>
      <h2 css={titleStyle(theme)}>실시간 급상승 선물랭킹</h2>

      <div css={tabsStyle(theme)}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            selected={tab === selectedTab}
            baseColor={theme.colors.blue400}
            selectedColor={theme.colors.blue900}
            onClick={() => onTabClick(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div css={subTabContainer(theme)}>
        {subTabs.map((subTab) => (
          <Button
            key={subTab}
            onClick={() => onSubTabClick(subTab)}
            selected={subTab === selectedSubTab}
            baseColor={theme.colors.blue400}
            selectedColor={theme.colors.blue900}
            transparent
          >
            {subTab}
          </Button>
        ))}
      </div>

      <div css={gridStyle(theme)}>
        {products.slice(0, visible).map((item) => (
          <div
            key={item.id}
            onClick={() => handleProductClick(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <GiftItem
              id={item.id}
              brand={item.brand}
              name={item.name}
              price={item.price}
              image={item.image}
              theme={theme}
            />
          </div>
        ))}
      </div>

      {visible < products.length && (
        <div css={morestyle}>
          <Button onClick={handleMore} baseColor="white" textColor="black">
            더보기
          </Button>
        </div>
      )}
    </section>
  );
};

export default GiftRanking;
