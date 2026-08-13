import './global.css';

export const metadata = {
  title: 'TaskFlow - Digital Productivity',
  description: 'Experience digital calm. Organize tasks, track progress, and achieve peak productivity in a clutter-free, high-performance environment.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
