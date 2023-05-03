import Footer from "../src/components/shared/elements/Footer/Footer";
import Header from "../src/components/shared/elements/Header/Header";
import "../src/styles/globals.css";

export const metadata = {
  title: "Othello",
  description: "Othello app developed with next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
