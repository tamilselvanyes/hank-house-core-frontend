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
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import ProductCard from './Components/ProductCard';
import Products from './pages/Products/Products';

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
        <Route
          path="/wishlist"
          element={
            <AppContainer>
              <WishList />
            </AppContainer>
          }
        />
        <Route
          path="/products"
          element={
            <AppContainer>
              <Products />
            </AppContainer>
          }
        />
        <Route
          path="/products/:id"
          element={
            <AppContainer>
              <Products />
            </AppContainer>
          }
        />
        <Route
          path="/cart"
          element={
            <AppContainer>
              <Cart />
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
        </AppContainer>
      </div>
    </div>
  );
}

export default App;
