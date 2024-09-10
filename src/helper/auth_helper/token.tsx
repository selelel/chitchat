'use client';
import { getAccessToken, refreshToken } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import { LoginResponse } from "@/lib/graphql/graphqlTypes";
import { ReactNode, useEffect, useRef } from "react"

// The accesstoken is stored at the memory so whenever the user refreshes the page,
// imminidatetly the accesstoken value is set to undefined, so with this withRefreshToken function it  makes that 
// everytime the user firs time open or resfresh the page it then instantly refresh the token and store
// accesstoken value to the redux store. :)
export const withRefreshToken = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const dispatch = useAppDispatch();
    const requestMade = useRef(false);

    useEffect(() => {
      const fetchToken = async () => {
        if (!requestMade.current) {
          requestMade.current = true;
          try {
            await dispatch(refreshToken()).unwrap();
          } catch (error) {
            console.error("Failed to refresh token", error);
          }
        }
      };

      fetchToken();
    }, [dispatch]);

    return <WrappedComponent {...props} />;
  };
};

type useLoginUserT = { data :{ loginUser : LoginResponse} | undefined }
export function useLogInUser({ data } : useLoginUserT ) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data?.loginUser?.accesstoken) {
          dispatch(getAccessToken(data.loginUser.accesstoken));
        }
      }, [data, dispatch]);
    }
type useSignInUserT = { data :{ loginUser : LoginResponse} | undefined }
export function useSignInUser({ data } : useSignInUserT ) {
    const dispatch = useAppDispatch()
  
      useEffect(() => {
          if (data?.loginUser?.accesstoken) {
            dispatch(getAccessToken(data.loginUser.accesstoken));
          }
        }, [data, dispatch]);
      }