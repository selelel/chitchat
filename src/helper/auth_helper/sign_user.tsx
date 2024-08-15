'use client'
import { LOCALSTORAGE } from "@/constants/localstorage";
import axios from "axios";
import { useEffect } from "react";
export const handleLogout = async () => {
  try {
    const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
    const response = await axios.get('http://localhost:8080/auth/google/logout', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).finally(() => {
      removeUserCache()
    });

    console.log(response.status)

    if (response.status !== 200) {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
  window.location.href = '/auth/login';
};

export const handleSignInUser = () => {
    window.location.href = 'http://localhost:8080/auth/google/login';
  };

// This will cause something!
export const cacheUser = ({ id, token } : { id?: string , token?: string }) => {
    !!token && localStorage.setItem(LOCALSTORAGE.TOKEN, token)
    !!id && localStorage.setItem(LOCALSTORAGE.USER_ID, id)
}

export const removeUserCache = () => {
  localStorage.removeItem(LOCALSTORAGE.TOKEN)
  localStorage.removeItem(LOCALSTORAGE.USER_ID)
}