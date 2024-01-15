import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/Register';
import { MainPage } from '../pages/Main';
import { ListPage } from '../pages/List';
import { InvitePage } from '../pages/Invite';
import { GuestLoginPage } from '../pages/GuestLogin';

/**
 * 어느 url에 어떤 페이지를 보여줄지 정해주는 컴포넌트입니다.
 * Routes 안에 Route 컴포넌트를 넣어서 사용합니다.
 */
export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/list/:age" element={<ListPage />} />
      <Route path="/guest/login/:url" element={<GuestLoginPage />} />
      <Route path="/invite/:url" element={<InvitePage />} />
    </Routes>
  );
}
