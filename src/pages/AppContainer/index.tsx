import { useEffect } from "react";
import { useAppContainerSlice } from "./slice/index";
import { useDispatch } from "react-redux";

export default function AppContainer() {
  const { appContainerActions } = useAppContainerSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Called once");
    dispatch(appContainerActions.getProduct());
  }, []);

  return <div>Testing</div>;
}
