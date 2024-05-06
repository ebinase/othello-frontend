import "../src/styles/globals.css";

const siteName= 'オセロ | Othello';
const description = 'とにかくスッキリしたデザインのオセロのページです。オフライン対戦とCPU対戦モードを搭載。一度読み込めばオフラインでもプレイ可能です! UIにはニューモーフィズムを取り入れ、モダンかつシンプルなデザインの無料ボードゲーム。';
const url = 'https://othello.ebinas.dev';

export const metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: url,
  },
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
