import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import theme from '@/data/theme';
import App from '@/App.tsx';
import GlobalStyles from '@/components/GlobalStyles';
import '@fontsource/pretendard/400.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>
);
