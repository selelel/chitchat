import { getAccessToken, refreshToken } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import { LoginResponse } from "@/modules/graphql/graphqlTypes";
import { ReactNode, useEffect, useRef } from "react"

export const InvokedRefreshPerRender = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const requestMade = useRef(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (!requestMade.current) {
        requestMade.current = true;
        try {
          await dispatch(refreshToken()).unwrap()
        } catch (error) {

        }
      }
    };

    fetchToken();
  }, [dispatch]);

  return <>{children}</>;
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