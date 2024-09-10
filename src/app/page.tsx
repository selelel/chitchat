import HomePage from "@/components/pages/dashboard/homePage";
import type { Metadata } from "next";

export default function IndexPage() {
  return <HomePage/>;
}

export const metadata: Metadata = {
  title: 'ChitChat',
};
