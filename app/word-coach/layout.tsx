import Header from "../components/Header";

export default function WordCoachLayout({ children }: LayoutProps<"/word-coach">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
