import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <button className={location.pathname === '/' ? 'active' : ''} onClick={() => navigate('/')}>Home</button>
      <button className={location.pathname === '/search' ? 'active' : ''} onClick={() => navigate('/search')}>Search</button>
      <button className={location.pathname === '/inbox' ? 'active' : ''} onClick={() => navigate('/inbox')}>Inbox</button>
      <button className={location.pathname === '/help' ? 'active' : ''} onClick={() => navigate('/help')}>Help</button>
    </div>
  );
};

export default BottomNav;
