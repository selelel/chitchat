import { useAppDispatch } from "@/lib/hooks";
import { useLogOutMutation } from "@/lib/features/auth/authApi";
import { removeAccessToken } from "@/lib/features/app/appSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCALSTORAGE } from "@/constants/localstorage";

export const useHandleLogout = () => {
  const [logOut, { data }] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await logOut();
    };
    performLogout();
  }, [logOut]);

  useEffect(() => {
    if (data) {
      dispatch(removeAccessToken());
      router.push('/auth/login');
    }
  }, [data, dispatch, router]);
};

export const handleSignInUser = () => {
  window.location.href = 'http://localhost:8080/auth/google/login';
};

export const removeUserCache = () => {
  localStorage.removeItem(LOCALSTORAGE.TOKEN);
  localStorage.removeItem(LOCALSTORAGE.USER_ID);
};
