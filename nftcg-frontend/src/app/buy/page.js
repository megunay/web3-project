'use client';

import { useEffect, useState } from 'react';
import { showConnect } from '@stacks/connect';
import { AppConfig, UserSession } from '@stacks/auth';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function BuyPage() {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    // If already signed in
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const address = userData.profile.stxAddress?.mainnet || userData.profile.stxAddress?.testnet;
      setWalletAddress(address);
    }

    // If sign-in is pending
    else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => {
        const userData = userSession.loadUserData();
        const address = userData.profile.stxAddress?.mainnet || userData.profile.stxAddress?.testnet;
        setWalletAddress(address);
      });
    }
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'NFTcg',
        icon: window.location.origin + '/logo.png',
      },
      userSession,
      onFinish: () => {
        const userData = userSession.loadUserData();
        const address = userData.profile.stxAddress?.mainnet || userData.profile.stxAddress?.testnet;
        setWalletAddress(address);
      },
      onCancel: () => {
        console.log('User cancelled wallet connection');
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
        <p className="mb-4 text-green-400">Wallet Connected: {walletAddress}</p>
      )}

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        disabled={!walletAddress}
      >
        Buy 1 Pack (50 STX)
      </button>
    </main>
  );
}
