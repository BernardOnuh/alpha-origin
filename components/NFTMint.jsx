import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { formatEther, parseEther } from 'ethers';
import { contractAddress, contractABI } from '../contracts/BatchMintNFT';

export default function NFTMint() {
    const [quantity, setQuantity] = useState(1);
    const [mounted, setMounted] = useState(false);
    const { address } = useAccount();
    
    // Set mounted state
    useEffect(() => {
        setMounted(true);
    }, []);

    // Contract reads
    const { data: maxSupply } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'MAX_SUPPLY'
    });

    const { data: totalSupply } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'totalSupply'
    });

    const { data: isWhitelisted } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'whitelist',
        args: [address]
    });

    const { data: isTeamMember } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'team',
        args: [address]
    });

    const { data: whitelistPrice } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'whitelistPrice'
    });

    const { data: publicPrice } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'publicPrice'
    });

    const { data: teamPrice } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'teamPrice'
    });

    const { data: whitelistMintEnabled } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'whitelistMintEnabled'
    });

    const { data: publicMintEnabled } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'publicMintEnabled'
    });

    // Contract writes
    const { data: mintData, write: mint, isLoading: isMinting } = useContractWrite({
        address: contractAddress,
        abi: contractABI,
        functionName: 'mint'
    });

    const { isLoading: isTransactionPending } = useWaitForTransaction({
        hash: mintData?.hash,
    });

    const getCurrentPrice = () => {
        if (isTeamMember) return teamPrice || "0";
        if (isWhitelisted && whitelistMintEnabled) return whitelistPrice;
        return publicPrice;
    };

    const handleMint = async () => {
        const price = getCurrentPrice();
        const value = ((Number(price) * quantity).toString());
        
        mint({
            args: [quantity],
            value: value
        });
    };

    const getMintStatus = () => {
        if (!mounted) return "Loading...";
        if (!address) return "Please connect your wallet";
        if (isTeamMember) return "Team Member Mint";
        if (isWhitelisted && whitelistMintEnabled) return "Whitelist Mint";
        if (publicMintEnabled) return "Public Mint";
        return "Minting not enabled";
    };

    // Don't render anything until mounted
    if (!mounted) {
        return <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">BatchMintNFT</h2>
            
            <div className="mb-4">
                <p>Total Minted: {totalSupply?.toString() || '0'}/{maxSupply?.toString() || '0'}</p>
                <p>Status: {getMintStatus()}</p>
                <p>Price: {formatEther(getCurrentPrice() || '0')} ETH</p>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Quantity:</label>
                <input 
                    type="number" 
                    min="1" 
                    max="4"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border rounded px-2 py-1"
                />
            </div>

            <button
                onClick={handleMint}
                disabled={isMinting || isTransactionPending || !address}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
                {isMinting || isTransactionPending ? 'Processing...' : 'Mint'}
            </button>
        </div>
    );
}