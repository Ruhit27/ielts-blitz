import Header from "../components/Header";

export default function ListeningLayout({ children }: LayoutProps<"/listening">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
