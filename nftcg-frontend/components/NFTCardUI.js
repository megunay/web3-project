import React, { useState } from 'react';
import { connectWallet } from './connect-wallet';
import { getCardByRarity } from './contract-calls';

export default function NFTCardUI() {
  const [rarity, setRarity] = useState(1); // u1 = common, u2 = rare, etc.
  const [result, setResult] = useState('');

  const handleGetCard = async () => {
    const res = await getCardByRarity(rarity);
    setResult(JSON.stringify(res.value));
  };

  return (
    <div className="p-4">
      <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 mb-4">Connect Wallet</button>
      <div>
        <label>Enter Rarity (1=Common, 2=Rare, etc):</label>
        <input type="number" value={rarity} onChange={e => setRarity(Number(e.target.value))} className="border p-1 ml-2" />
        <button onClick={handleGetCard} className="bg-green-500 text-white px-4 py-1 ml-2">Get Card</button>
      </div>
      <div className="mt-4">
        <strong>Result:</strong>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
