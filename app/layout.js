import "./globals.css";

export const metadata = {
  title: "LLM Wiki Story Workbench",
  description: "Local-first operations console for the bilingual LLM Wiki Story project."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
