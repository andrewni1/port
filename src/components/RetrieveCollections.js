import React from "react";
import axios from "axios";

export default class RetrieveCollections extends React.Component { 
    state = {
      collections: [],
      search_address: "0xF6429FaFDb6166D145f30372717a23B966373032",
      floor: 0,
    }

    componentDidMount() {
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
          return res.data.stats.floor_price
      })
    }
    
    render() {
      console.log(this.state.collections)
      return (
        <div>
          {
            this.state.collections
              .map(collection =>
                <ul key={collection.slug}>
                  <img 
                    src={collection.image_url}
                    alt="collection_image"
                  />
                  {collection.name} - 
                  {collection.owned_asset_count}
                  {/* {this.getCollectionFloor(collection.slug)} */}
                </ul>
              )
          }
        </div>
      )
    }
  }