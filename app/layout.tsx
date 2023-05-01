import Footer from "../src/components/shared/elements/Footer";
import Header from "../src/components/shared/elements/Header";
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
        <div className="h-screen">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
