import React, { Component } from 'react';
import ListContacts from './ListContacts'; //import ListContacts from './ListContacts.js';
import CreateContact from './CreateContact';

import * as ContactsAPI from './utils/ContactsAPI';

import { Route } from 'react-router-dom';

// My error code for import:
// import ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

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
        <Route exact path='/' render={() => (
          <ListContacts
            /*  Teacher's solution.. He added the function here..!!!
            OngoToCreate={(screen) =>
              this.setState({screen})
            }
            */

            parent={this}
            contacts={this.state.contacts}
            OnRemoveContact={this.removeContact}/>
          )}/>
        <Route path='/create' component={
          CreateContact
        }/>
      </div>
    )
  }
}

export default App;



