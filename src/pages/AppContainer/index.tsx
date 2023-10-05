import { useAppContainerSlice } from "./slice/index";
export default function AppContainer() {
  const actions = useAppContainerSlice();
  return <div>Testing</div>;
}
