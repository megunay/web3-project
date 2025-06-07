import {
    callReadOnlyFunction,
    uintCV,
  } from '@stacks/transactions';
  import { StacksTestnet } from '@stacks/network';
  
  const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const contractName = 'nftcg';
  const network = new StacksTestnet();
  
  export async function getCardByRarity(rarity) {
    return await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-card-id-by-rarity',
      functionArgs: [uintCV(rarity)],
      senderAddress: contractAddress,
      network,
    });
  }
  