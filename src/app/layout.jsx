import 'antd/dist/reset.css';
import './globals.css';

export const metadata = {
  title: 'Medical Professional Course Dashboard',
  description: 'Dashboard for medical professionals to track course progress and tasks.',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
