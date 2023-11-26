import { useEffect } from "react";
import { useAppContainerSlice } from "./slice/index";
import { useDispatch } from "react-redux";
import Login from "../Account/Login";
import Register from "../Account/Register";
import NavBar from "../../components/NavBar";
import { useCookies } from "react-cookie";

interface IProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: IProps) {
  const { appContainerActions } = useAppContainerSlice();
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const userId = cookies.user_id;

  useEffect(() => {
    if (userId) {
      dispatch(appContainerActions.getWishList(userId));
    }
  }, []);

  return (
    <div className="font-bold flex justify-center items-center flex-col w-full">
      {/* <NavBar /> */}
      {children}
    </div>
  );
}
