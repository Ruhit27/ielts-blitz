"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NavItem({
  label,
  href,
  dropdown,
  panelWidth = "w-72",
  children,
}: {
  label: string;
  href: string;
  dropdown?: boolean;
  panelWidth?: string;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="group relative">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:text-brand 2xl:px-3.5 2xl:text-[15px] ${
          active
            ? "text-brand after:absolute after:inset-x-2.5 after:-bottom-[18px] 2xl:after:inset-x-3.5 after:h-0.5 after:rounded-full after:bg-brand"
            : "text-muted"
        }`}
      >
        {label}
        {dropdown && <Chevron />}
      </Link>
      {children && (
        <div
          className={`invisible absolute left-1/2 top-full z-50 ${panelWidth} -translate-x-1/2 pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100`}
        >
          <div className="rounded-2xl border border-line bg-white p-3 shadow-[0_12px_32px_rgba(17,24,39,0.12)]">{children}</div>
        </div>
      )}
    </div>
  );
}
