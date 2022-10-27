import { Link } from 'react-router-dom';

import logo from '../logo.svg';

function Home({ role }) {
  const getContent = () => {
    if (!role) {
      return '登陆后可访问更多链接，登陆后请刷新';
    }
    if (role === 'guest') {
      return '客人你没有访问其他页面的权限';
    }

    if (role === 'owner') {
      return (
        <div>
          <Link to="owner">跳转到 owner 可见链接</Link>
        </div>
      );
    }
    if (role === 'admin') {
      return (
        <div>
          <Link to="admin">跳转到 admin 可见链接</Link>
        </div>
      );
    }

    return (
      <div>
        <Link to="invite">跳转到 invite 可见链接</Link>
      </div>
    );
  };

  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      {/* <pre style={{ textAlign: 'left' }}>
        <code>window.blocklet = {JSON.stringify(window.blocklet, null, 2)}</code>
      </pre> */}
      <Link className="app-link" to="/about">
        About
      </Link>
      <div>{getContent()}</div>
    </header>
  );
}

export default Home;
