import React, { useState } from 'react'
import { ethers } from "ethers";
import axios from 'axios';
import { BsFillBriefcaseFill, BsFillCollectionFill } from "react-icons/bs";
import { IoIosPhotos } from "react-icons/io";
import { FaCoins, FaEthereum } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import nftPlaceholder from './nft-placeholder.jpg'
import './Eth.css'

function Eth() {
    const [assets, setAssets] = useState([]);
    const [collections, setCollections] = useState([]);
    const [ethPrice, setEthPrice] = useState();
    const [nftFilter, setNftFilter] = useState('assets')
    const [walletAddress, setWalletAddress] = useState(null);
    const [data, setData] = useState({
        address: "",
        balance: null
    });
    let totalNftValue = 0;

    const btnhandler = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => accountChangeHandler(res[0]));
        } else {
            alert("Install Metamask Extension!");
        }
    };

    const getBalance = (address) => {
        window.ethereum
            .request({ 
                method: "eth_getBalance", 
                params: [address, "latest"] 
            })
            .then((balance) => {
                setData({
                    balance: ethers.utils.formatEther(balance),
                });
            });
    };
    
    const accountChangeHandler = (account) => {
        setWalletAddress(account);
        setData({ address: account });
        getBalance(account);

        axios.get('https://api.opensea.io/api/v1/assets?owner=' + account + '&order_direction=desc&limit=200&include_orders=false', options)
        .then(res => {
            setAssets(res.data.assets);
        })
        axios.get('https://api.opensea.io/api/v1/collections?asset_owner=' + account + '&offset=0&limit=300', options)
        .then(res => {
            setCollections(res.data);
        })
        getTotalNftValue();
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(res => {
            setEthPrice(res.data.ethereum.usd)
        })
    };

    const options = {
        method: 'GET',
        headers: {Accept: 'application/json', 'X-API-KEY': 'd164f34100f24f3bab3cc79302606609'}
    };

    const nftFilterAssets = () => {
        setNftFilter('assets')
    }

    const nftFilterCollections = () => {
        setNftFilter('collections')
    }

    const inputHandler = (e) => {
        setWalletAddress(e.target.value)
        console.log(e.target.value)
    }

    const getTotalNftValue = () => {
        collections.forEach(collection => {
            console.log(collection.stats.one_day_average_price)
        })
    }

    if (collections.length !== 0 && data.address !== "") {
        collections.map(collection => {
            totalNftValue = totalNftValue + (((collection.stats.one_day_average_price + collection.stats.seven_day_average_price) * collection.owned_asset_count / 2) * 100) / 100;
        })
    }

    if (data.address === "") {
        return (
            <div>
                <img src={nftPlaceholder} alt='nothing'/>
                <button onClick={btnhandler}>
                    Connect to wallet
                </button>
                <div>
                    <input
                        type="text"
                        onChange={inputHandler}
                        placeholder="Wallet Address"
                        value={walletAddress}
                    />
                    {/* <button onClick={accountChangeHandler(walletAddress)}>Search</button> */}
                </div>
            </div>
        )
    } else return (
        <div>
            <div className='portfolio-container'>
                <div className='header-text'>
                    <p className='nfts-text'>PORTFOLIO</p> 
                    <p className='wallet-address'>{walletAddress}</p>
                </div>
                <div className="nft-stats-container-1">
                    <div className='stat-box'><BsFillBriefcaseFill className='stat-image'/> NET WORTH: ${Math.round(data.balance * ethPrice * 100) / 100 + Math.round(totalNftValue * ethPrice * 100) / 100}</div>
                    <div className='stat-box'><FaCoins className='stat-image'/> TOKENS: ${Math.round(data.balance * ethPrice * 100) / 100}</div>
                    <div className='stat-box'><GiToken className='stat-image'/> NFTS: ${Math.round(totalNftValue * ethPrice * 100) / 100} </div>
                </div>
            </div>


            <div className='tokens-container'>
                <div className='header-text'>
                    <p className='nfts-text'>TOKENS</p> 
                    <p className='wallet-address'>{walletAddress}</p>
                </div>
                <div className="nft-stats-container-1">
                    <div className='stat-box'><BsFillBriefcaseFill className='stat-image'/> VALUE: ${Math.round(data.balance * ethPrice * 100) / 100}</div>
                    <div className='stat-box'><FaCoins className='stat-image'/> TOKENS: 1</div>
                    <div className='stat-box'><GiToken className='stat-image'/> DOMINANT TOKEN: Ethereum </div>
                </div>
                <div className='token-list'>
                    <div className='token-container'>
                        <FaEthereum /> | Ethereum {Math.round(data.balance * 100) / 100}
                    </div>
                </div>
            </div>

            <div className="nfts-container">
                <div className='header-text'>
                    <p className='nfts-text'>NFTS</p> 
                    <p className='wallet-address'>{walletAddress}</p>
                </div>
                <div className="nfts-container-header">
                    <div className="nft-stats-container-1">
                        <div className='stat-box'><BsFillBriefcaseFill className='stat-image'/> VALUE: ${Math.round(totalNftValue * ethPrice * 100) / 100}</div>
                        <div className='stat-box'><IoIosPhotos className='stat-image'/> NFTS: {assets.length}</div>
                        <div className='stat-box'><BsFillCollectionFill className='stat-image'/> COLLECTIONS: {collections.length}</div>
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
                        return (
                            <div className='card-contents'>
                                <a className="asset-card" href={'https://opensea.io/collection/' + collection.slug} target="_blank" rel="noreferrer">
                                    {collection.image_url !== null
                                        ? <img className="asset_img_container"
                                            src={collection.image_url}
                                            alt='collection'
                                        />                                            
                                        : <img className="asset_img_container"
                                            src={nftPlaceholder}
                                            alt='collection'
                                        />
                                    }
                                    <div className='card-info'>
                                        {collection.name}
                                        <div>Quantity: {collection.owned_asset_count}</div>
                                        {(collection.stats.one_day_average_price !== 0 && collection.stats.seven_day_average_price !== 0) 
                                            ? <div>
                                                <div className='eth-val'>Avg. Price:<FaEthereum />{Math.round(((collection.stats.one_day_average_price + collection.stats.seven_day_average_price) / 2) * 100) / 100}</div>
                                                <div className='card-value'>
                                                    <div className='eth-val'><FaEthereum /> {Math.round(((collection.stats.one_day_average_price + collection.stats.seven_day_average_price) * collection.owned_asset_count / 2) * 100) / 100}</div>
                                                    <div className='dollar-val'>${Math.round(((collection.stats.one_day_average_price + collection.stats.seven_day_average_price) / 2) * collection.owned_asset_count * ethPrice * 100) / 100}</div>
                                                </div>
                                            </div>
                                            : <div>
                                                {/* {setTotalNftValue(totalNftValue + collection.stats.thirty_day_average_price * collection.owned_asset_count)}
                                                {console.log(totalNftValue)} */}
                                                <div>Avg. Price:<FaEthereum />{Math.round(collection.stats.thirty_day_average_price * 100) / 100}</div>
                                                <div className='card-value'>
                                                    <div className='eth-val'><FaEthereum /> {Math.round(collection.stats.thirty_day_average_price * collection.owned_asset_count * 100) / 100}</div>
                                                    <div className='dollar-val'>${Math.round(collection.stats.thirty_day_average_price * collection.owned_asset_count * ethPrice * 100) / 100}</div>
                                                </div>
                                            </div>
                                        }
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
                                    {asset.image_url !== null
                                        ? <img className="asset_img_container"
                                            src={asset.image_url}
                                            alt='asset'
                                        />                                            
                                        : <img className="asset_img_container"
                                            src={nftPlaceholder}
                                            alt='asset'
                                        />
                                    }
                                    <div className='card-info'>
                                        {asset.name !== null
                                            ? <div>{asset.name}</div>
                                            : <div>{asset.collection.name}</div>
                                        }
                                        {collections.map(collection => {
                                            if (!collection.name.includes('Unidentified contract'))
                                            if (collection.slug === asset.collection.slug)
                                            return (
                                                <div>
                                                    {(collection.stats.one_day_average_price !== 0 && collection.stats.seven_day_average_price !== 0)
                                                        ? <div className='card-value'>
                                                            <div className='eth-val'><FaEthereum /> {Math.round(((collection.stats.one_day_average_price + collection.stats.seven_day_average_price) / 2) * 100) / 100}</div>
                                                            <div className='dollar-val'>${Math.round(((collection.stats.one_day_average_price + collection.stats.seven_day_average_price) / 2) * ethPrice * 100) / 100}</div>
                                                        </div>
                                                        : <div className='card-value'>
                                                            <div className='eth-val'><FaEthereum /> {Math.round(collection.stats.thirty_day_average_price * 100) / 100}</div>
                                                            <div className='dollar-val'>${Math.round(collection.stats.thirty_day_average_price * ethPrice * 100) / 100}</div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })}
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