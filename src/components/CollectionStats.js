import React from 'react';
import axios from 'axios';

export default class CollectionStats extends React.Component {
  state = {
    data: [],
    name: "",
    address: "",
    discord_url: "",
    traits: [],
    stats: [],
  }

  componentDidMount() {
    axios.get(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`)
      .then(res => {
        this.setState({ 
            data: res.data,
            name: res.data.collection.name,
            address: res.data.collection.primary_asset_contracts.address,
            description: res.data.collection.description,
            discord_url: res.data.collection.discord_url,
            traits: res.data.collection.traits,
            stats: res.data.collection.stats,
        });
      })
  }

  render() {
    //console.log(this.state.discord_url)
    return (
        <div>
            {this.state.name}
            <p></p>
            {this.state.description}
        </div>
    )
  }
}