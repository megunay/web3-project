export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="bg-gray-900 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">NFTcg</h2>
          <div className="space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/buy" className="hover:underline">Buy Packs</a>
            <a href="/collection" className="hover:underline">My Cards</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
