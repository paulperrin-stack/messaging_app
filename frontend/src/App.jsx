import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import ConversationPage from './pages/ConversationPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

export default function App() {
  const { user } = useAuth();
  const [page, setPage] = useState('users');
  const [selectedUserId, setSelectUserId] = useState(null);

  if (!user) return <LoginPage />;

  const nav = (p, uid) => { setPage(p); if (uid) setSelectUserId(uid); };

  return (
    <>
      <nav>
        <button onClick={() => nav('users')}>Users</button>
        <button onClick={() => nav('profile')}>My Profile</button>
      </nav>
      {page === 'users'     && <UsersPage onOpenChat={(id) => nav('chat', id)} />}
      {page === 'chat'      && <ConversationPage userId={selectedUserId} />}
      {page === 'profile'   && <ProfilePage />}
    </>
  );
}