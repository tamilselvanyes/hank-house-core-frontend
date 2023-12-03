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
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import Products from './pages/Products/Products';
import Footer from './components/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import ProductPage from './pages/Products/Product';
import { CarouselCustomNavigation } from './pages/Products/Carousel';
import Test from './pages/Products/Test';
import BuyNow from './pages/Cart/BuyNow';
import Checkout from './pages/Checkout';
import ConfirmationPage from './pages/ConfirmationPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './pages/Profile';

function App() {
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
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
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
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            </AppContainer>
          }
        />
        <Route
          path="/buy-now"
          element={
            <AppContainer>
              <BuyNow />
            </AppContainer>
          }
        />
        <Route
          path="/checkout"
          element={
            <AppContainer>
              <Checkout />
            </AppContainer>
          }
        />
        <Route
          path="/confirmation"
          element={
            <AppContainer>
              <ConfirmationPage />
            </AppContainer>
          }
        />
        <Route
          path="/profile"
          element={
            <AppContainer>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </AppContainer>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AppContainer>
              <ProductPage />
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
      <div className="fixed top-0 left-0 right-0">
        <NavBar />
      </div>
      <div style={{ paddingTop: '70px' }}>
        <AppContainer>
          <MainRoute />
        </AppContainer>
      </div>
      <div className="pt-9 bottom-0 left-0 right-0">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
