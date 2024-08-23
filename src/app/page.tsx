import Hero from "@/components/pages/home/hero";
import type { Metadata } from "next";

export default function IndexPage() {
  return <Hero/>;
}

export const metadata: Metadata = {
  title: 'ChitChat',
};
