import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function DisplayItem(props) {
  return (
<div>
      {props.name} - {props.id}
    </div>
  );
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {allEvents : [] }
  }
  componentDidMount() {
    const that = this;

    fetch('https://staging-graphql-service.onrewind.tv/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-account-key': 'ryHvne_jFV',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'application/json',
          'DNT' : '1',
        },
        body: JSON.stringify({query:`{
              allEvents(tags: "vod", limit: 10)
              { items {
                  name
                  id
                }
              }
            }`})
      })
      .then(res => res.json())
      .then(function(response) {

          console.log("result ok", response)
          that.setState({
            allEvents: response.data.allEvents.items
          })

        },function(error) {
          console.log("error",error)
        })
  }



  render() {

    return (
        <div>
         {this.state.allEvents.map((item, index) => ( <DisplayItem name={item.name} id={item.id} /> ))}
         </div>

    );
  }
}

export default App;
