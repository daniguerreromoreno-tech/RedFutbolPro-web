export const metadata = {
  title: "RedFutbolPro",
  description: "Fútbol base y amateur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
