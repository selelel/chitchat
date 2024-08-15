import Hero from "@/components/heroPage/hero";
import type { Metadata } from "next";

export default function IndexPage() {
  return <Hero/>;
}

export const metadata: Metadata = {
  title: 'ChitChat',
};
