import React, { Component } from 'react';
import ListContacts from './ListContacts'; //import ListContacts from './ListContacts.js';

import * as ContactsAPI from './utils/ContactsAPI';

// My error code for import:
// import ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {contacts: []}

  componentDidMount() {
    // My solution:
 // ContactsAPI.getAll().then((data) => this.setState({contacts : data}))
    // Teacher's solution:
    ContactsAPI.getAll().then((contacts) => this.setState({contacts}))
    // Which is equivalent to:
 // ContactsAPI.getAll().then((contacts) => this.setState({contacts : contacts}))
  }

  removeContact = function(contact) { // if we write mevoveContact as arrow function
                                      // we dont' have to pass 'this' to ListContacts Component
    this.setState((prevState) => (
      {contacts: prevState.contacts.filter(c => c.id !== contact.id)
      }
    ))

    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>
        <ListContacts parent={this} contacts={this.state.contacts} OnRemoveContact={this.removeContact}/>
      </div>
    )
  }
}

export default App;



