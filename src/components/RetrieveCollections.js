import React from "react";
import axios from "axios";

export default class RetrieveCollections extends React.Component {
    state = {
        collections: [],
      }

    componentDidMount() {
        axios.get('https://api.opensea.io/api/v1/collections?asset_owner=0xF6429FaFDb6166D145f30372717a23B966373032&offset=0&limit=300')
          .then(res => {
            this.setState({ 
                collections: res.data,
            });
          })
      }
    render() {
      console.log(this.state.collections)
      return (
          <div>
            <ul>
            {
                this.state.collections
                    .map(collection =>
                    <li key={collection.id}>{collection.name} - {collection.owned_asset_count}</li>
                    )
            }
            </ul>
          </div>
      )
    }
  }