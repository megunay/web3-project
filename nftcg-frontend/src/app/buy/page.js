'use client';
import { useState, useEffect } from 'react';
import { showConnect, openContractCall } from '@stacks/connect';
import { AppConfig, UserSession } from '@stacks/auth';
import { StacksTestnet } from '@stacks/network';
import { bufferCVFromString } from '@stacks/transactions';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function BuyPage() {
  const [walletAddress, setWalletAddress] = useState(null);

  // Load wallet if already connected
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const address =
        userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet;
      setWalletAddress(address);
    }
  }, []);

  const connectWallet = () => {
    const iconUrl =
      typeof window !== 'undefined'
        ? window.location.origin + '/logo.png'
        : '/logo.png';

    showConnect({
      appDetails: {
        name: 'NFTcg',
        icon: iconUrl,
      },
      userSession,
      onFinish: () => {
        const userData = userSession.loadUserData();
        const address =
          userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet;
        setWalletAddress(address);
      },
      onCancel: () => {
        console.log('User cancelled wallet connection');
      },
    });
  };

  const buyCardPack = async () => {
    if (!walletAddress) return;

    await openContractCall({
      network: new StacksTestnet(),
      anchorMode: 1, // 1 = Any (allows post conditions)
      contractAddress: 'YOUR_CONTRACT_ADDRESS',
      contractName: 'nftcg', // or whatever yours is
      functionName: 'buy_pack', // replace with actual function
      functionArgs: [], // or args if needed
      appDetails: {
        name: 'NFTcg',
        icon: window.location.origin + '/logo.png',
      },
      onFinish: data => {
        console.log('Transaction submitted!', data);
        alert('Transaction sent! Check your wallet.');
      },
      onCancel: () => {
        console.log('User canceled transaction.');
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Buy Card Packs</h1>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-6"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="mb-4 text-green-400">Wallet: {walletAddress}</p>
      )}

      <button
        onClick={buyCardPack}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        disabled={!walletAddress}
      >
        Buy 1 Pack (50 STX)
      </button>
    </main>
  );
}
