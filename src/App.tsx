import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Chat from './components/chat';
import Login from './components/login';
import './App.css';

const ProtectedRoute: React.FC<{ component: React.FC; path: string; exact?: boolean }> = ({
  component: Component,
  path,
  exact = false,
}) => {
  const { user } = useAuth();
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App: React.FC = () => {
  const { login } = useAuth();

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const userCookie = cookies.find((row) => row.startsWith('user='));
    if (userCookie) {
      const user = userCookie.split('=')[1];
      login(user);
    }
  }, [login]);

  return (
    <Router>
      <Switch>
        <Route path="/login" Component={Login} />
        <ProtectedRoute path="/" exact component={Chat} />
      </Switch>
    </Router>
  );
};

const AppWrapper: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
