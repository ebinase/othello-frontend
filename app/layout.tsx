import '../src/styles/globals.css';

export const metadata = {
  title: 'ヨシダハピバ2024',
  description: 'ヨシダハピバ2024',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
