import { Counter } from "@/components/Counter";
import type { Metadata } from "next";

export default function IndexPage() {
  return <Counter />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
