import { authMiddleware } from "@/modules/auth/authMiddleware";
import { Middleware } from "@reduxjs/toolkit";

export const controlledMiddleware: Middleware = storeAPI => next => action => {
    authMiddleware(storeAPI)(next)(action);
    return next(action);
  };