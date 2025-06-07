import {
  standardPrincipalCV,
  uintCV,
} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

import {
  showConnect,
  openContractCall, 
} from '@stacks/connect';

let userAddress = null;

export function connectWallet() {
  return new Promise((resolve, reject) => {
    showConnect({
      appDetails: {
        name: 'NFTcg',
        icon: window.location.origin + '/favicon.ico',
      },
      redirectTo: '/',
      onFinish: (data) => {
        userAddress = data.stacksAddress;
        resolve(userAddress);
      },
      onCancel: () => reject('User cancelled'),
    });
  });
}

export function getUserAddress() {
  return userAddress;
}

export async function buyCardPack() {
  const network = StacksTestnet; // ✅ FIXED: StacksTestnet is not a constructor

  const options = {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'nftcg',
    functionName: 'buy-card-pack',
    functionArgs: [],
    network,
    appDetails: {
      name: 'NFTcg',
      icon: window.location.origin + '/favicon.ico',
    },
    onFinish: (data) => {
      console.log('Transaction finished:', data);
    },
  };

  await openContractCall(options);
}
