'use client'
import { LOCALSTORAGE } from "@/constants/localstorage";
import { removeAccessToken } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useLogOutMutation } from "@/modules/auth/authApi";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const handleLogout = async () => {
  const [logOut, { data }] = useLogOutMutation()
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    logOut()
  }, [])

  
  useEffect(() => {
    if(data) {
      dispatch(removeAccessToken())
      redirect('/auth/login')
    }
  }, [dispatch, data])

};

export const handleSignInUser = () => {
    window.location.href = 'http://localhost:8080/auth/google/login';
  };

// This will cause something!
// export const cacheUser = ({ id, token } : { id?: string , token?: string }) => {
//     !!token && localStorage.setItem(LOCALSTORAGE.TOKEN, token)
//     !!id && localStorage.setItem(LOCALSTORAGE.USER_ID, id)
// }

export const removeUserCache = () => {
  localStorage.removeItem(LOCALSTORAGE.TOKEN)
  localStorage.removeItem(LOCALSTORAGE.USER_ID)
}