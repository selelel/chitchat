import HomePage from "@/components/pages/home/homePage";
import type { Metadata } from "next";

export default function IndexPage() {
  return <HomePage/>;
}

export const metadata: Metadata = {
  title: 'ChitChat',
};
