import axios from "axios";
import {useEffect, useState} from "react";

function NFTs2(props) {
    const [asset, setAsset] = useState([]);

    const options = {
        method: 'GET',
        url: 'https://api.opensea.io/api/v1/assets',
        params: {
          owner: props.walletAddress,
          order_direction: 'desc',
          limit: '20',
          include_orders: 'false'
        },
        headers: {Accept: 'application/json', 'X-API-KEY': process.env.OS_API_KEY}
      };
      
    useEffect(() => {
        axios.request(options).then(function (res) {
            console.log(res.data);
            // setAsset(res.data.assets)
        }).catch(function (error) {
            console.error(error);
        });
    })

    return (
        console.log(asset)
    )
}

export default NFTs2