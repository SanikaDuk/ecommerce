import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../store/slices/authApiSlice';
import { logout } from '../store/slices/authSlice';

const navItems = [
  {
    name: 'Profile',
    path: '/profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: 'My Orders',
    path: '/orders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    name: 'Wishlist',
    path: '/wishlist',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: 'Addresses',
    path: '/addresses',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const DashboardLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-[260px] flex-shrink-0 fixed top-[72px] left-0 h-[calc(100vh-72px)] z-30"
        style={{
          background: 'linear-gradient(180deg, #EAE3D6, #DDD4C0)',
          boxShadow: '4px 0 16px #C0B8A8',
        }}
      >
        {/* Avatar */}
        <div className="p-8 text-center" style={{ borderBottom: '2px dashed #C4B99A' }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{
              background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
              boxShadow: '4px 4px 10px #C8BFB0, -3px -3px 8px #FDFAF5, inset 0 0 0 2px #C4B99A',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3 className="font-heading font-semibold text-base text-text">{userInfo?.name}</h3>
          <p className="font-mono text-[10px] text-muted tracking-wider mt-1">{userInfo?.email}</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-grow py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/profile'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 font-body text-sm ${
                  isActive
                    ? 'text-accent font-normal'
                    : 'text-muted hover:text-text'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: '#E4DDD0',
                      boxShadow: 'inset 3px 3px 7px #C8BFB0, inset -2px -2px 5px #F5F0E8',
                      borderLeft: '3px solid #8B6914',
                    }
                  : {}
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4" style={{ borderTop: '2px dashed #C4B99A' }}>
          <button
            onClick={logoutHandler}
            className="flex items-center gap-3 px-4 py-3 w-full font-body text-sm text-red-700 hover:bg-red-50/20 transition-all rounded-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around py-3"
        style={{
          background: 'linear-gradient(180deg, #EAE3D6, #DDD4C0)',
          boxShadow: '0 -4px 16px #C0B8A8',
          borderTop: '1px solid #D4C9B0',
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/profile'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-mono transition-colors ${
                isActive ? 'text-accent' : 'text-muted'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Content Area */}
      <main className="flex-grow lg:ml-[260px] p-6 lg:p-12 pb-24 lg:pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
