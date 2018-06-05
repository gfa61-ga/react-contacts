import React, { Component } from 'react';
import ListContacts from './ListContacts'; //import ListContacts from './ListContacts.js';

class App extends Component {
  state = {contacts: [
    {
      "id": "ryan",
      "name": "Ryan Florence",
      "email": "ryan@reacttraining.com",
      "avatarURL": "http://localhost:5001/ryan.jpg"
    },
    {
      "id": "michael",
      "name": "Michael Jackson",
      "email": "michael@reacttraining.com",
      "avatarURL": "http://localhost:5001/michael.jpg"
    },
    {
      "id": "tyler",
      "name": "Tyler McGinnis",
      "email": "tyler@reacttraining.com",
      "avatarURL": "http://localhost:5001/tyler.jpg"
    }
  ], inputValue: 5}

  removeContact = function(contact) { // if we write mevoveContact as arrow function
                                      // we dont' have to pass 'this' to ListContacts Component
    this.setState((prevState) => (
      {contacts: prevState.contacts.filter(c => c.id !== contact.id)
      }
    ))
  }

  hundleInput = (event) => {

    this.setState({inputValue: (event.target.value)/2})
  }

  render() {
    return (
      <div>
        <ListContacts parent={this} contacts={this.state.contacts} OnRemoveContact={this.removeContact}/>
        <form><input onChange={this.hundleInput} value={this.state.inputValue}/></form>
      </div>
    )
  }
}

export default App;



