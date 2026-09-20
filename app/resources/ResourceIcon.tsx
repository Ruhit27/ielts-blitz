import type { IconName } from "./data";

const paths: Record<IconName, string> = {
  book: "M4 5.5C6.5 4.6 9.5 4.8 12 6.2c2.5-1.4 5.5-1.6 8-.7v12c-2.5-.9-5.5-.7-8 .7-2.5-1.4-5.5-1.6-8-.7v-12ZM12 6.2v12",
  scroll: "M6 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 8h7M8 12h7M8 16h4",
  calculator: "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01",
  fees: "M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM14 3v4h4M9 12h6M9 16h4",
  news: "M4 6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v13H5a1 1 0 0 1-1-1V6ZM17 9h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2M7 8h7M7 12h7M7 15h4",
};

export default function ResourceIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
