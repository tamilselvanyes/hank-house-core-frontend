/**
 *
 * Asynchronously loads the component for AppContainer
 *
 */
import { lazyLoad } from "../../service/loadable";
export const AppContainer = lazyLoad(
  () => import("./index"),
  (module) => module.default
);
