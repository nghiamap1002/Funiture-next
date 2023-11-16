import {
  Action,
  AnyAction,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { AuthInitState } from "./auth/authModel";
import { authReducer } from "./auth/authSlice";
import { HYDRATE } from "next-redux-wrapper";

export interface State {
  auth: AuthInitState;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    let nextState = {
      ...state,
      ...action.payload,
    };

    if (typeof window !== "undefined" && state?.router) {
      nextState.router = state.router;
      nextState = { ...nextState };
    }
    return rootReducer(nextState, action);
  } else {
    return rootReducer(state, action);
  }
};

const reHydrateStore = () => {
  return {};
};
// const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer,
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(),
  devTools: process.env.NODE_ENV === "development" && true,
});

export const makeStore = () => {
  // ;(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
