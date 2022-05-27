import React from "react";
import axios from "axios";
import "./NFTs.css"

export default class NFTs extends React.Component { 
  constructor(props) {
    super(props)
    this.options = {
      method: 'GET',
      headers: {Accept: 'application/json', 'X-API-KEY': process.env.OS_API_KEY}
    };

    this.state = {
      assets: [],
      collections: [],
      stats: [],
      floor_prices: [],
      search_address: "0xF6429FaFDb6166D145f30372717a23B966373032",
    }
  }

  componentDidMount() {
    axios.get('https://api.opensea.io/api/v1/assets?owner=' + this.state.search_address + '&order_direction=desc&limit=200&include_orders=false', this.state.options)
    .then(res => {
        this.setState({ 
          assets: res.data.assets,
        });
      })
    axios.get('https://api.opensea.io/api/v1/collections?asset_owner=' + this.state.search_address + '&offset=0&limit=300')
    .then(res => {
      this.setState({ 
          collections: res.data,
          stats: res.data.stats
      });
    })
  }

  getCollectionFloor(slug){
    axios.get('https://api.opensea.io/api/v1/collection/' + slug + '/stats')
    .then(res => {
        console.log(res.data.stats.floor_price)
        this.setState({ 
          floor_prices: [...this.state.floor_prices, res.data.stats.floor_price]
        });
        return this.state.floor_prices;
    })
  }

  render() {
    return (
      <div>
        <div>
          {this.state.search_address}
        </div>
        <div className="card-container">
          {this.state.assets.map(asset => {
            if (!asset.collection.name.includes('Unidentified contract'))
            return (
              <div className="card-contents">
                <a className="asset-card" href={asset.permalink} target="_blank" rel="noreferrer">
                  <img className="asset_img_container"
                    src={asset.image_url}
                    alt="asset_image"
                  />
                  <div>{asset.name}</div>
                  <div>{asset.collection.name}</div>
                  {/* <div className="words">
                    {this.getCollectionFloor(asset.collection.slug)}
                  </div> */}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}