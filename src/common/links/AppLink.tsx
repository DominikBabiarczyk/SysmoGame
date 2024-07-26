import Link from "next/link";
import React, { ReactNode } from "react";
import { UrlObject } from "url";

type Url = string | UrlObject;

interface AppLinkProps {
  href: Url;
  children: ReactNode;
}

export const AppLink = ({ href, children }: AppLinkProps) => {
  return <Link href={href}>{children}</Link>;
};
