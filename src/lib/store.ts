import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./features/app/appSlice";
import { baseApiWithGraphql } from "@/modules/graphql/graphqlBaseApi";
import { authMiddleware } from "@/modules/auth/authMiddleware";

const rootReducer = combineSlices(appSlice, baseApiWithGraphql);
export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(authMiddleware).concat(baseApiWithGraphql.middleware)
    },
  });
};


export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;