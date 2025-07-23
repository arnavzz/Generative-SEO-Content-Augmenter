export const metadata = {
  title: "Generative SEO Content Augmenter",
  description: "Keyword → Unique SEO blocks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
