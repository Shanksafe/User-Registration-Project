import "./globals.css";

export const metadata = {
  title: "User Registration",
  description: "UI Internship Registration Form",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f9",
        }}
      >
        {children}
      </body>
    </html>
  );
}
