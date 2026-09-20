import Header from "../components/Header";

export default function ResourcesLayout({ children }: LayoutProps<"/resources">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
