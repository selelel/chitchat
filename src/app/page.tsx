
import Hero from "@/components/heroPage/hero";
import { METADATA } from "@/constants/metadata";
import type { Metadata } from "next";

export default function IndexPage() {
  return <Hero/>;
}

export const metadata: Metadata = {
  title: METADATA.CHITCHAT,
};
