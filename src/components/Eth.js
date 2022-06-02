import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import axios from 'axios';
import { BsFillBriefcaseFill, BsFillCollectionFill } from "react-icons/bs";
import { IoIosPhotos } from "react-icons/io";
import { FaCoins, FaEthereum } from "react-icons/fa";
import './Eth.css'

function Eth() {
    const [assets, setAssets] = useState([]);
    const [collections, setCollections] = useState([]);
    const [ethPrice, setEthPrice] = useState();
    const [nftFilter, setNftFilter] = useState('collections')
    // const [totalEthNft, setTotalEthNft] = useState(0);
    const [walletAddress, setWalletAddress] = useState(null);

    const [data, setdata] = useState({
        address: "",
        balance: null,
    });

    const btnhandler = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => accountChangeHandler(res[0]));
        } else {
            alert("Install Metamask Extension!");
        }
    };

    const getbalance = (address) => {
        window.ethereum
            .request({ 
                method: "eth_getBalance", 
                params: [address, "latest"] 
            })
            .then((balance) => {
                setdata({
                    balance: ethers.utils.formatEther(balance),
                });
            });
    };
    
    const accountChangeHandler = (account) => {
        setWalletAddress(account);
        setdata({
            address: account,
        });
        
        getbalance(account);
    };

    const options = {
        method: 'GET',
        headers: {Accept: 'application/json', 'X-API-KEY': 'd164f34100f24f3bab3cc79302606609'}
    };
      
    useEffect(() => {
        axios.get('https://api.opensea.io/api/v1/assets?owner=' + walletAddress + '&order_direction=desc&limit=200&include_orders=false', options)
        .then(res => {
            setAssets(res.data.assets);
        })
        axios.get('https://api.opensea.io/api/v1/collections?asset_owner=' + walletAddress + '&offset=0&limit=300', options)
        .then(res => {
            setCollections(res.data);
        })
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(res => {
            setEthPrice(res.data.ethereum.usd)
        })
    })

    // const fetchFloor = (slug) => {
    //     axios.get('https://api.opensea.io/api/v1/collection/' + slug + '/stats', options)
    //     .then(res => {
    //         setTotalEthNft(totalEthNft + res.data.stats.floor_price)
    //     })
    // }

    const nftFilterAssets = () => {
        setNftFilter('assets')
    }

    const nftFilterCollections = () => {
        setNftFilter('collections')
    }

    if (data.address === "") {
        return (
            <button onClick={btnhandler}>
                Connect to wallet
            </button>
        )
    } else return (
        <div>
            <div className='tokens-container'>
                <div className='header-text'>
                    <p className='nfts-text'>TOKENS</p> 
                    <p className='wallet-address'>{walletAddress}</p>
                </div>
                <div className="nft-stats-container-1">
                    <div className='stat-box'><BsFillBriefcaseFill className='stat-image'/> VALUE: ${Math.round(data.balance * ethPrice * 100) / 100}</div>
                    <div className='stat-box'><FaCoins className='stat-image'/> TOKENS: XXX</div>
                    <div className='stat-box'><FaCoins className='stat-image'/> DOMINANT TOKEN: XXX </div>
                </div>
                <div>
                    Eth {data.balance}
                </div>
            </div>

            <div className="nfts-container">
                <div className='header-text'>
                    <p className='nfts-text'>NFTS</p> 
                    <p className='wallet-address'>{walletAddress}</p>
                </div>
                <div className="nfts-container-header">
                    <div className="nft-stats-container-1">
                        <div className='stat-box'><BsFillBriefcaseFill className='stat-image'/> VALUE: $xxx</div>
                        <div className='stat-box'><BsFillCollectionFill className='stat-image'/> COLLECTIONS: {collections.length}</div>
                        <div className='stat-box'><IoIosPhotos className='stat-image'/> NFTS: {assets.length}</div>
                    </div>
                    <div className="nft-stats-container-2">
                        <div className='filter-container'>
                            <IoIosPhotos className='filter-single' onClick={nftFilterAssets}/> 
                            <BsFillCollectionFill className='filter-collection' onClick={nftFilterCollections}/>
                        </div>
                    </div>
                </div>
                <div className="card-container" >
                    {collections.map(collection => {
                        if (nftFilter === 'collections')
                        if (!collection.name.includes('Unidentified contract'))
                        // fetchFloor(collection.slug)
                        return (
                            <div className='collection-contents'>
                                <a className="asset-card" href={'https://opensea.io/collection/' + collection.slug} target="_blank" rel="noreferrer">
                                    <img className="asset_img_container"
                                        src={collection.image_url}
                                        alt="collection_image"
                                    />
                                    <div className='card-info'>
                                        {collection.name}
                                        <div>Quantity: {collection.owned_asset_count}</div>
                                        <div>Floor: {collection.floor_price}</div>
                                        <div className='card-value'>
                                            <div className='eth-val'><FaEthereum /> xxx</div>
                                            <div className='dollar-val'>$xxx</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                    {assets.map(asset => {
                        if (nftFilter === 'assets')
                        if (!asset.collection.name.includes('Unidentified contract'))
                        return (
                            <div className="card-contents">
                                <a className="asset-card" href={asset.permalink} target="_blank" rel="noreferrer">
                                    <img className="asset_img_container"
                                        src={asset.image_url}
                                        alt="asset_image"
                                    />
                                    <div className='card-info'>
                                        {asset.name}
                                        <div className='card-value'>
                                            <div className='eth-val'><FaEthereum /> xxx</div>
                                            <div className='dollar-val'>$xxx</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Eth