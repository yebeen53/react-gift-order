import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from '@/components/GlobalStyles';
import Navibar from '@/components/Navibar';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Homepage from '@/pages/Homepage';
import { AuthProvider } from './context/AuthContext';
import MyPage from './pages/MyPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <Navibar />
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/homepage/login" element={<Login />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
