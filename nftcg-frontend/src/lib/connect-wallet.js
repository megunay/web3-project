const connectWallet = () => {
  // Run only on the client
  const iconUrl = typeof window !== 'undefined'
    ? window.location.origin + '/logo.png'
    : '/logo.png'; // fallback

  showConnect({
    appDetails: {
      name: 'NFTcg',
      icon: iconUrl,
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
