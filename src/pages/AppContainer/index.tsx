import { useEffect } from 'react';
import { useAppContainerSlice } from './slice/index';
import { useDispatch } from 'react-redux';
import Login from '../Account/Login';
import Register from '../Account/Register';

export default function AppContainer() {
  const { appContainerActions } = useAppContainerSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Called once');
    dispatch(appContainerActions.getProduct());
  }, []);

  return (
    <div>
      {/* <Login /> */}
      <Register />
    </div>
  );
}
