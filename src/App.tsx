import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import AppContainer from './pages/AppContainer';
import Login from './pages/Account/Login';
import Register from './pages/Account/Register';
import NavBar from './Components/NavBar';

function App() {
  const SignInRoute: React.FunctionComponent = () => {
    return (
      <Router>
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
      </Router>
    );
  };
  // const MainRoute:React.FunctionComponent = ()=>{
  //   return(
  //     <Routes>
  //       <Route
  //       path='/'
  //       element={
  //         <AppContainer>
  //           <
  //         </AppContainer>
  //       }
  //       />
  //     </Routes>
  //   )
  // }
  return (
    <div className="h-full w-full">
      {/* Welcome to Hank's House */}
      {/* if it is not signed in */}
      {/* <SignInRoute /> */}
      {/* if the user is signed in */}
      {/* <MainRoute/> */}
      <AppContainer>
        <NavBar />
      </AppContainer>
    </div>
  );
}

export default App;
