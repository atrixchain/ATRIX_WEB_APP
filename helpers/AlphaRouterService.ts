import { Fetcher, Route, Token, TokenAmount, Trade, TradeType } from "../sdk";
const { ethers } = require("ethers");
import ERC20ABI from "../abi.json";
import routerABI from "../router.abi.json";

const V3_SWAP_ROUTER_ADDRESS = "0xC6F1Ea85655Fd0cACAB491b7569285A5B6Db1789";
const REACT_APP_TESTNET = "https://testnet.atrixchain.com/";

const chainId = 266;

const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_TESTNET);

const name0 = "My token 2";
const symbol0 = "MTK2";
const decimals0 = 18;
const address0 = "0x7076d1bC2B6197028542dD7c605d33A06246a759";

const name1 = "My token";
const symbol1 = "MTK";
const decimals1 = 18;
const address1 = "0x9df341764580037A6A166B2D40798EEb507F1B6C";

const name3 = "WETH";
const symbol3 = "WETH";
const decimals3 = 18;
const address3 = "0xC5198C95d7f76081dA83698a128404361E0Dfd80";

const routerAddress = "0xfEE938f75ad47655561F7e5b03dF526566B054ca";

const MTK2 = new Token(chainId, address0, decimals0, symbol0, name0);
const MTK = new Token(chainId, address1, decimals1, symbol1, name1);
const WETH = new Token(chainId, address3, decimals3, symbol3, name3);

export const getWethContract = () =>
  new ethers.Contract(address0, ERC20ABI, web3Provider);
export const getMTKContract = () =>
  new ethers.Contract(address1, ERC20ABI, web3Provider);

export const getRouterContract = (signer: object) =>
  new ethers.Contract(routerAddress, routerABI, signer);

export const getPrice = async (
  firstSymbol: any,
  secondSymbol: any,
  inputAmount: number,
  slippageAmount: number,
  deadline: number,
  walletAddress: string,
  provider: any
) => {
  try {
    const { ethereum }: any = window;
    if (ethereum) {
      const wei = ethers.utils.parseEther(inputAmount.toString());

      const pair = await Fetcher.fetchPairData(
        firstSymbol === "MTK" ? MTK : MTK2,
        secondSymbol === "MTK2" ? MTK2 : MTK,
        provider
      );
      const route = new Route([pair], secondSymbol === "MTK2" ? MTK2 : MTK);

      const trade = new Trade(
        route,
        new TokenAmount(secondSymbol === "MTK2" ? MTK2 : MTK, wei),
        TradeType.EXACT_INPUT
      );

      const executionPrice = trade.executionPrice.toSignificant(6);
      const nextMidPrice = trade.nextMidPrice.toSignificant(6);

      const transaction = {
        amountIn: ethers.utils.parseEther(inputAmount.toString()),
        amountOutMin: ethers.utils.parseEther(executionPrice),
        tokenIn: firstSymbol === "MTK" ? MTK.address : MTK2.address,
        tokenOut: secondSymbol === "MTK2" ? MTK2.address : MTK.address,
        deadline: deadline,
        gasLimit: 1000000,
        gasPrice: ethers.utils.parseUnits("5", "gwei"),
      };

      return [transaction, executionPrice, nextMidPrice];
    }
  } catch (e) {
    console.log(e);
  }
};

export const runSwap = async (transaction: any, signer: any) => {
  const { ethereum }: any = window;
  try {
    if (ethereum) {
      const contract0 = await getRouterContract(signer);
      const { tokenIn, tokenOut, amountIn, amountOutMin, deadline } =
        transaction;
      const tx = await contract0.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        [tokenIn, tokenOut],
        signer.getAddress(),
        deadline,
        { gasLimit: 1000000, gasPrice: ethers.utils.parseUnits("5", "gwei") }
      );
      return tx;
    }
  } catch (e) {
    console.log(e);
  }
};
