import './style/App.css';
import useRoutes from './routes';
import useAuth from "./hooks/auth.hook";
import AuthContext from "./context/AuthContext";

function App() {

  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <></>;
  }

  localStorage.clear();

  return (
    <div className="app">
      <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
        { routes }
      </AuthContext.Provider>
    </div>
  );
}

export default App;