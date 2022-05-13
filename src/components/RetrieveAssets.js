import React from "react";
import axios from "axios";
import "./RetrieveAssets.css"

export default class RetrieveAssets extends React.Component { 
    options = {
        method: 'GET',
        headers: {Accept: 'application/json', 'X-API-KEY': process.env.OS_API_KEY}
      };

    state = {
      assets: [],
      search_address: "0xF6429FaFDb6166D145f30372717a23B966373032",
    }

    componentDidMount() {
        axios.get('https://api.opensea.io/api/v1/assets?owner=' + this.state.search_address + '&order_direction=desc&limit=200&include_orders=false', this.state.options)
        .then(res => {
            this.setState({ 
                assets: res.data.assets,
            });
          })
      }
    
    render() {
      console.log(this.state.assets)
      return (
        <div className="card-container">
          {
            this.state.assets
              .map(asset =>
                [
                    <a className="asset-card" href={'https://opensea.io/assets/' + asset.asset_contract.address + '/' + asset.token_id} target="_blank" rel="noreferrer">
                      <img className="asset_img_container"
                        src={asset.image_url}
                        alt="asset_image"
                      />
                    </a>
                ]
              )
          }
        </div>
      )
    }
  }