import "./globals.css";

export const metadata = {
  title: "JWT Authentication System",
  description: "Role-Based Access Control with MERN Stack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
