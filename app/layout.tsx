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
      <body>{children}</body>
    </html>
  );
}
