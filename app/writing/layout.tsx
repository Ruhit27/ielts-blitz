import Header from "../components/Header";

export default function WritingLayout({ children }: LayoutProps<"/writing">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
