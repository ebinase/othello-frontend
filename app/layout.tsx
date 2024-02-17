import '../src/styles/globals.css';

export const metadata = {
  title: 'タカフミハピバ2024',
  description: 'タカフミハピバ2024',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
