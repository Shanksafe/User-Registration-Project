"use client";
import { ReactNode } from "react";

export type BannerKind = "ideal" | "warning" | "failure" | "success";
export default function StatusBanner({
  kind,
  children,
}: {
  kind: BannerKind;
  children: ReactNode;
}) {
  if (kind === "ideal") return null;
  const cls =
    kind === "warning"
      ? "banner warn"
      : kind === "failure"
      ? "banner err"
      : "banner ok";
  return <div className={cls}>{children}</div>;
}
