import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/app/appSlice";
import { baseApiWithGraphql } from "@/modules/graphql/graphqlBaseApi";

const rootReducer = combineSlices(counterSlice, baseApiWithGraphql);
export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(baseApiWithGraphql.middleware);
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
