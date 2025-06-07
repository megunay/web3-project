export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">NFTcg - Collectible Card Game</h1>
      
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded mb-4">
        Connect Wallet
      </button>

      <div className="flex flex-col gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
          Buy Card Packs
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          View My Collection
        </button>
      </div>
    </main>
  );
}
