'use client';

import { getAccessToken, refreshToken } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import { LoginResponse } from "@/lib/graphql/graphqlTypes";
import { ReactNode, useEffect, useRef } from "react";

// The accesstoken is stored at the memory so whenever the user refreshes the page,
// imminidatetly the accesstoken value is set to undefined, so with this withRefreshToken function it  makes that 
// everytime the user firs time open or resfresh the page it then instantly refresh the token and store
// accesstoken value to the redux store. :)

// Higher-order component to refresh token
const withRefreshToken = (WrappedComponent: React.ComponentType<any>) => {
  const WithRefreshToken = (props: any) => {
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

  WithRefreshToken.displayName = `withRefreshToken(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithRefreshToken;
};

// Custom hook to log in user
const useLogInUser = ({ data }: { data: { loginUser: LoginResponse } | undefined }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.loginUser?.accesstoken) {
      dispatch(getAccessToken(data.loginUser.accesstoken));
    }
  }, [data, dispatch]);
};

useLogInUser.displayName = "useLogInUser";

// Custom hook to sign in user
const useSignInUser = ({ data }: { data: { loginUser: LoginResponse } | undefined }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.loginUser?.accesstoken) {
      dispatch(getAccessToken(data.loginUser.accesstoken));
    }
  }, [data, dispatch]);
};

useSignInUser.displayName = "useSignInUser";

export { withRefreshToken, useLogInUser, useSignInUser };
