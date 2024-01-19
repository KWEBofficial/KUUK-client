import { Route, Routes } from 'react-router-dom';

import { TermPage } from '../pages/Term';
import { ResultPage } from '../pages/Result';
import { PrivacyPage } from '../pages/Privacy';
import { PollPage } from '../pages/Poll';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { JoinPage } from '../pages/Join';
import { InvitePage } from '../pages/Invite';
import { HistoryPage } from '../pages/History';
import { GuestLoginPage } from '../pages/GuestLogin';
import { FilterPage } from '../pages/Filter';
import { DonatePage } from '../pages/Donate';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/guest/login/:url" element={<GuestLoginPage />} />
      <Route path="/invite/:url" element={<InvitePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/poll" element={<FilterPage />} />
      <Route path="/poll/:pollId" element={<PollPage />} />
      <Route path="/poll/result/:pollId" element={<ResultPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/term" element={<TermPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}
