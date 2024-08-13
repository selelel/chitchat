import { LogIn } from "@/components/login";
import SignIn from "@/components/signin";
import { LOCALSTORAGE } from "@/constants/localstorage";
import { METADATA } from "@/constants/metadata";
import type { Metadata } from "next";

export default function IndexPage() {
  return <LogIn /> && <SignIn/>;
}

export const metadata: Metadata = {
  title: METADATA.CHITCHAT,
};
