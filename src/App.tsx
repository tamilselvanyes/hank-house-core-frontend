import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AppContainer from './pages/AppContainer';
import Login from './pages/Account/Login';
import Register from './pages/Account/Register';
import NavBar from './Components/NavBar';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import CategoryCard from './Components/CategoryCard';

function App() {
  const SignInRoute: React.FunctionComponent = () => {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <AppContainer>
              <Login />
            </AppContainer>
          }
        />
        <Route
          path="/register"
          element={
            <AppContainer>
              <Register />
            </AppContainer>
          }
        />
      </Routes>
    );
  };
  const MainRoute: React.FunctionComponent = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <AppContainer>
              <Home />
            </AppContainer>
          }
        />
        <Route
          path="/login"
          element={
            <AppContainer>
              <Login />
            </AppContainer>
          }
        />
        <Route
          path="/register"
          element={
            <AppContainer>
              <Register />
            </AppContainer>
          }
        />
      </Routes>
    );
  };
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [cookies] = useCookies();

  useEffect(() => {
    UserAuth();
  }, []);
  const UserAuth = () => {
    if (cookies.token) {
      setIsSignedIn(true);
    }
  };

  return (
    <div className="h-full w-full relative">
      {/* Welcome to Hank's House */}
      {/* if it is not signed in */}
      {/* <SignInRoute /> */}
      {/* if the user is signed in */}
      {/* <MainRoute/> */}
      <div className="fixed top-0 left-0 right-0">
        <NavBar />
      </div>
      <div style={{ paddingTop: '70px' }}>
        <AppContainer>
          {/* {!isSignedIn ? <SignInRoute /> : <MainRoute />} */}
          <MainRoute />
          {/* <CategoryCard/> */}
        </AppContainer>
      </div>
    </div>
  );
}

export default App;
