import { useEffect } from 'react';
import { useAppContainerSlice } from './slice/index';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { selectAppContainerState } from './slice/selector';

interface IProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: IProps) {
  const { appContainerActions } = useAppContainerSlice();
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appContainerActions.getProduct());
    const userId = cookies.user_id;
    if (userId) {
      dispatch(appContainerActions.getWishList(userId));
      dispatch(appContainerActions.getCartItem(userId));
    }
  }, []);

  return (
    <>
      <div className="font-bold flex justify-center items-center flex-col w-full">
        {children}
      </div>
    </>
  );
}
