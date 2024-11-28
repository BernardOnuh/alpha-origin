import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { formatEther } from 'ethers';
import { contractAddress, contractABI } from '../contracts/BatchMintNFT';

const Alert = ({ variant, children }) => (
    <div className={`${
        variant === 'destructive' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
    } rounded-md p-4 mb-4 border`}>
        {children}
    </div>
);

const MintModal = () => {
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState('');
    const [mintSuccess, setMintSuccess] = useState(false);
    const [mintedTokenId, setMintedTokenId] = useState(null);
    const { address } = useAccount();
    
    useEffect(() => {
        setMounted(true);
    }, []);

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

    const { data: mintData, write: mint, isLoading: isMinting } = useContractWrite({
        address: contractAddress,
        abi: contractABI,
        functionName: 'mint',
        onError(error) {
            if (error.message.includes('insufficient funds')) {
                setError('Insufficient funds to complete the transaction');
            } else {
                setError('Error during minting. Please try again.');
            }
        }
    });

    const { isLoading: isTransactionPending } = useWaitForTransaction({
        hash: mintData?.hash,
        onSuccess(data) {
            try {
                const event = data.logs[0];
                const tokenId = parseInt(event.topics[3], 16);
                setMintedTokenId(tokenId);
                setMintSuccess(true);
                setError('');
            } catch (err) {
                console.error('Error extracting token ID:', err);
                setMintSuccess(true);
                setError('');
            }
        }
    });

    const getCurrentPrice = () => {
        if (isTeamMember) return teamPrice || "0";
        if (isWhitelisted && whitelistMintEnabled) return whitelistPrice;
        return publicPrice;
    };

    const handleMint = async () => {
        setError('');
        setMintSuccess(false);
        setMintedTokenId(null);
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

    if (!mounted) return null;

    return (
        <div className="w-[91%] xl:max-w-[1080px] mx-auto relative mt-[1px] sm:mt-[1px] text-center bg-primary-vdark">
            <div className="max-w-[838px] mx-auto p-6">
                <h3 className="font-medium text-xl md:text-2xl text-primary">
                    Mint to Alpha Origins
                </h3>
                <p className="text-primary-dark text-tiny md:text-lg mt-[10px]">
                    Alpha Origins is a web3 Company that brings value to our community through the blockchain and its emerging technologies
                </p>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="my-8 w-[162px] h-[52px] rounded-[58px] bg-primary text-primary-vdark text-tiny hover:bg-primary-light transition-colors duration-300"
                >
                    Mint
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="bg-primary-vdark p-6 rounded-xl w-full max-w-md mx-4 relative border-2 border-primary">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-primary hover:text-primary-light"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            <h2 className="text-xl font-bold mb-4 text-primary">Alpha Origin Survivors</h2>
                            
                            {error && (
                                <Alert variant="destructive">{error}</Alert>
                            )}
                            
                            {mintSuccess && (
                                <Alert>
                                    NFT minted successfully! 
                                    <a 
                                        href={`https://testnets.opensea.io/assets/base-sepolia/${contractAddress}/${mintedTokenId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline ml-1"
                                    >
                                        View on OpenSea
                                    </a>
                                </Alert>
                            )}

                            <div className="mb-4 text-primary-dark">
                                <p>Total Minted: <span className="text-primary">{totalSupply?.toString() || '0'}/{maxSupply?.toString() || '0'}</span></p>
                                <p>Status: <span className="text-primary-light">{getMintStatus()}</span></p>
                                <p>Price: <span className="text-primary">{formatEther(getCurrentPrice() || '0')} ETH</span></p>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-primary-dark">Quantity:</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="4"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="border-2 border-primary-dark bg-primary-vdark text-primary rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-primary-light"
                                />
                            </div>

                            <button
                                onClick={handleMint}
                                disabled={isMinting || isTransactionPending || !address}
                                className="w-full py-3 rounded-[58px] bg-primary text-primary-vdark font-bold 
                                    hover:bg-primary-light 
                                    disabled:bg-primary-dark disabled:cursor-not-allowed
                                    transition-colors duration-300"
                            >
                                {isMinting || isTransactionPending ? 'Processing...' : 'Mint'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MintModal;