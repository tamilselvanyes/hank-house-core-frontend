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
    <div className="h-full w-full">
      {/* Welcome to Hank's House */}
      {/* if it is not signed in */}
      {/* <SignInRoute /> */}
      {/* if the user is signed in */}
      {/* <MainRoute/> */}
      <AppContainer>
        {/* {!isSignedIn ? <SignInRoute /> : <MainRoute />} */}
        <MainRoute />
      </AppContainer>
    </div>
  );
}

export default App;
