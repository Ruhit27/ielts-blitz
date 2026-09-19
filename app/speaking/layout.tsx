import Header from "../components/Header";

export default function SpeakingLayout({ children }: LayoutProps<"/speaking">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
