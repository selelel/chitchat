import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { AppDispatch } from '@/lib/store';
import { refreshToken } from '@/lib/features/app/appSlice';
import { Parse_Message } from '@/helper/error';

export const authMiddleware: Middleware = (store) => (next) => async (action: any) => {
  if (isRejectedWithValue(action)) {
    const parsedMessage = await Parse_Message(action.payload);
    
    if (parsedMessage === 'jwt expired') {
      const dispatch = store.dispatch as AppDispatch;

      try {
        await dispatch(refreshToken()).unwrap();
        return next(action);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        return;
      }
    }
  }

  return next(action);
};
