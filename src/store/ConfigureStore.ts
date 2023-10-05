/**
 * Create the store with dynamic reducers
 */
import {
  configureStore,
  getDefaultMiddleware,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createInjectorsEnhancer } from "redux-injectors";
import createSagaMiddleware from "redux-saga";
import { createReducer } from "./reducers";
export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware({
    ...reduxSagaMonitorOptions,
    onError: (err: any) => {
      console.log("Error", err);
      toast.error(
        "Oops, something went wrong. Please try again. If this issue persists, please contact support",
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
          className: "text-sm",
          theme: "colored",
        }
      );
    },
  });
  const { run: runSaga } = sagaMiddleware;
  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];
  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];
  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== "production",
    enhancers,
  });
  return store;
}
