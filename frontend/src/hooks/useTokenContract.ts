import { useEffect, useMemo, useState } from "react";
import { chain, useSigner } from "wagmi";
import { useAccount, useContract } from "wagmi";
import localHostAddress from '../contracts/localhost/contract-address.json'
import localHostContract from '../contracts/localhost/Token.json'
import goerliHostAddress from '../contracts/goerli/contract-address.json'
import goerilHostContract from '../contracts/goerli/Token.json'
import { Contract, ContractInterface, providers, Signer } from "ethers";
import { ExtractAbiFunctions } from 'abitype'



type GetContractArgs = {
  /** Contract address or ENS name */
  addressOrName: string
  /** Contract interface or ABI */
  contractInterface: ContractInterface
  /** Signer or provider to attach to contract */
}




const getContractAddressAndAbi = (chainId: number | undefined): GetContractArgs| null => {
if (!chainId) return null;

if (chainId === chain.localhost.id) {
      return {
        addressOrName: localHostAddress.Token,
        contractInterface: localHostContract.abi
      }
      }

      if (chainId === chain.goerli.id) {
        return {
        addressOrName: goerliHostAddress.Token,
        contractInterface: goerilHostContract.abi
        }
      }

      throw new Error("invalid chain id")
}

export function getContract<T = Contract>({
  addressOrName,
  contractInterface,
}: GetContractArgs) {
  return <T>(
    (<unknown>(
      new Contract(
        addressOrName,
        contractInterface,
      )
    ))
  )
}

const useTokenContract = () => {

  const { connector: activeConnector, isConnected } = useAccount()

  const signerResult = useSigner();

  const [contractArgs, setContractArgs] = useState<GetContractArgs | null>(null);

  useEffect(() => {
    (async () => {
      const chainId = await activeConnector?.getChainId();
    
      const addressAndAbi = getContractAddressAndAbi(chainId);
    
      setContractArgs(addressAndAbi);
    })();
  }, [activeConnector, isConnected])


  const contract = useMemo(() => {
    if (!contractArgs) return null;
    return getContract<Contract>(
      contractArgs
    )
  }
  , [contractArgs]);

  return contract;
};

export default useContract;