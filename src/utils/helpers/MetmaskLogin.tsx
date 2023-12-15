import { ethers } from 'ethers';
import { getToken, verifyToken } from '@/utils/apis/user';
import { AlertType } from '../contexts/AlertContext';

const popUpToAddAndSwitchChain = async () => {
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: ethers.utils.hexValue(5001),
        rpcUrls: [process.env.NEXT_PUBLIC_MANTLE_RPC_URL],
        chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
        nativeCurrency: {
          name: 'BIT',
          symbol: 'BIT',
          decimals: 18,
        },
        blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCKCHAIN_URL_EXPLORER],
      },
    ],
  });
};

const popUpToSwitchChain = async (chainId: number) => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: ethers.utils.hexValue(chainId) }],
  });
};

const requestNetwork = async (chainId: number) => {
  console.log(window.ethereum.networkVersion);
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await popUpToSwitchChain(chainId);
    } catch (err: any) {
      if (err.code === 4902) {
        await popUpToAddAndSwitchChain();
      } else {
        console.log(err);
        return false;
      }
    }
  }
  return true;
};

export const connectToMetamask = async (
  dispatch: (action: any) => void,
  connectWalletModalHandler: () => void,
  showAlert: (type: AlertType, message: string) => void
) => {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    console.log('Metamask extension not present in the browser.');
    connectWalletModalHandler();
    showAlert('error', 'Metamask extension not present in the browser.');
    return false;
  }
  dispatch({ type: 'REQUEST_LOGIN' });

  const chainId = 5001;
  const requestNetworkSuccess = await requestNetwork(chainId);
  console.log(requestNetworkSuccess);
  if (!requestNetworkSuccess) {
    console.log('Not able to change network');
    dispatch({ type: 'LOGIN_ERROR', error: requestNetworkSuccess });
    connectWalletModalHandler();
    showAlert('error', 'Not able to change network');
    return false;
  }
  try {
    const web3 = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await web3.send('eth_requestAccounts', []);
    const signer = web3.getSigner();
    console.log('Account:', await signer.getAddress());
    const message = await getToken();

    const verifiedMessage = await verifyToken({
      wallet_address: await web3.getSigner().getAddress(),
      signature: await web3.getSigner().signMessage(message),
      nounce: message,
    });

    console.log(verifiedMessage);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        accessToken: verifiedMessage.accessToken,
        refreshToken: verifiedMessage.refreshToken,
        user: verifiedMessage.newUser || verifiedMessage.userExist,
      },
    });
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        accessToken: verifiedMessage.accessToken,
        refreshToken: verifiedMessage.refreshToken,
        user: verifiedMessage.newUser || verifiedMessage.userExist,
      })
    );
    connectWalletModalHandler();
    showAlert('success', 'Metamask wallet connected successfully.');
    return true;
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOGIN_ERROR', error: error });
    connectWalletModalHandler();
    showAlert('error', 'Something went wrong while logging in.');
    return false;
  }
};
