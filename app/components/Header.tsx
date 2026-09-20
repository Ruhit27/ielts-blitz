import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import type { ReactNode } from "react";
import { difficultyDot, questionTypes } from "../reading/data";
import WritingIcon from "../writing/WritingIcon";
import { writingTasks } from "../writing/data";
import { speakingPages } from "../speaking/data";
import ResourceIcon from "../resources/ResourceIcon";
import { resourceSections } from "../resources/data";
import { topics, words } from "../word-coach/data";
import NavItem from "./NavItem";
import XpBadge from "./XpBadge";

const navItems = [
  { label: "Reading", href: "/reading", dropdown: true },
  { label: "Listening", href: "/listening" },
  { label: "Writing", href: "/writing", dropdown: true },
  { label: "Speaking", href: "/speaking", dropdown: true },
  { label: "Resources", href: "/resources", dropdown: true },
  { label: "Dashboard", href: "/dashboard" },
  { label: "League", href: "/league" },
  { label: "Word Coach", href: "/word-coach", dropdown: true },
];

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="IELTS Masters home">
      <span className="grid size-10 place-items-center rounded-full border-2 border-brand bg-white text-brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 6.5C10 5 7 4.6 4 5v12c3-.4 6 0 8 1.5 2-1.5 5-1.9 8-1.5V5c-3-.4-6 0-8 1.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M12 6.5V18.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight text-ink">
        IELTS<span className="text-brand"> Masters</span>
      </span>
    </Link>
  );
}

function ReadingMenu() {
  return (
    <div className="p-2">
      <p className="px-2 text-xs font-extrabold tracking-[0.18em] text-brand">QUESTION TYPES</p>
      <ul className="mt-3 grid grid-cols-2 gap-1">
        {questionTypes.map((t) => (
          <li key={t.id}>
            <Link href={`/reading/${t.id}`} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-surface">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-[11px] font-extrabold text-ink" aria-hidden="true">
                {t.short}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{t.name}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <span className={`size-1.5 rounded-full ${difficultyDot[t.difficulty]}`} aria-hidden="true" />
                  {t.difficulty}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WritingMenu() {
  return (
    <ul>
      {writingTasks.map((p) => (
        <li key={p.id}>
          <Link href={`/writing/${p.id}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-surface hover:text-brand">
            <span className="text-brand">
              <WritingIcon d={p.icon} />
            </span>
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SpeakingMenu() {
  return (
    <ul>
      {speakingPages.map((p) => (
        <li key={p.href}>
          <Link href={p.href} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface">
            <span className="block whitespace-nowrap text-[15px] font-semibold text-ink">{p.name}</span>
            <span className="block text-xs text-muted">{p.detail}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ResourcesMenu() {
  return (
    <ul>
      {resourceSections.map((s) => (
        <li key={s.href}>
          <Link href={s.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface">
            <span className="shrink-0 text-brand">
              <ResourceIcon name={s.icon} />
            </span>
            <span>
              <span className="block whitespace-nowrap text-[15px] font-semibold text-ink">{s.name}</span>
              <span className="block text-xs text-muted">{s.detail}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function WordCoachMenu() {
  const links = [
    { href: "/word-coach/practice", name: "Daily Practice", detail: "Spaced-repetition drills" },
    { href: "/word-coach/library", name: "Word Library", detail: `All ${words.length} words` },
    { href: "/word-coach/progress", name: "My Progress", detail: "Boxes and review dates" },
  ];
  return (
    <div className="p-2">
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex items-baseline gap-2 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface">
              <span className="text-[15px] font-semibold text-ink">{l.name}</span>
              <span className="text-xs text-muted">{l.detail}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-2 border-t border-line px-3 pb-1 pt-3 text-xs font-extrabold tracking-[0.18em] text-brand">TOPIC PACKS</p>
      <ul className="grid grid-cols-2 gap-1">
        {topics.map((t) => (
          <li key={t.id}>
            <Link href={`/word-coach/packs/${t.id}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-brand">
              <span className="size-2 shrink-0 rounded-full" style={{ background: t.color }} aria-hidden="true" />
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const menus: Record<string, ReactNode> = {
  Reading: <ReadingMenu />,
  Writing: <WritingMenu />,
  Speaking: <SpeakingMenu />,
  Resources: <ResourcesMenu />,
  "Word Coach": <WordCoachMenu />,
};

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[90rem] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden min-w-0 items-center gap-0.5 xl:flex 2xl:gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              href={item.href}
              dropdown={item.dropdown}
              panelWidth={item.label === "Reading" ? "w-[36rem]" : item.label === "Word Coach" ? "w-[30rem]" : item.label === "Speaking" || item.label === "Resources" ? "w-80" : "w-72"}
            >
              {menus[item.label]}
            </NavItem>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <Show when="signed-out">
            <SignInButton>
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Sign in
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <XpBadge />
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
