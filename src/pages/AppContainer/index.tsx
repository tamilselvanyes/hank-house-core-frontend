import { useEffect } from 'react';
import { useAppContainerSlice } from './slice/index';
import { useDispatch } from 'react-redux';
import Login from '../Account/Login';
import Register from '../Account/Register';

interface IProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: IProps) {
  const { appContainerActions } = useAppContainerSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Called once');
    dispatch(appContainerActions.getProduct());
  }, []);

  return (
    <div className="font-bold flex justify-center items-center flex-col w-full">
      {children}
    </div>
  );
}
