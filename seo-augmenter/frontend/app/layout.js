export const metadata = {
  title: "SEO Content Augmenter",
  description: "Generate FAQ, Myth vs Fact & Key Takeaways",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
