import type { Viewport } from "next";
import { generateConfiguration } from "@/app/[gameId]/steps/generate-configuration.utils";
import { Client } from "@/app/[gameId]/steps/client";

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function Page() {
  return <Client config={generateConfiguration()} />;
}
