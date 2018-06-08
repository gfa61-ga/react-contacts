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


  addContact = (contact) => {

    // My first solution:
    /*
    contact.id = contact.name.split(" ").join("-").toLowerCase();
    this.setState((prevState) => {
        prevState.contacts.push(contact);
        return {contacts: prevState.contacts}
    })
    */

    // My solution.. there was an error..!!
    // ContactsAPI.create(contact).then(() => ContactsAPI.getAll).then((contacts) => this.setState({contacts}))

    // My second solution:
    /*
    ContactsAPI.create(contact).then((contact) =>  // create() adds a contact to the database and returns it
    this.setState((prevState) => {
        prevState.contacts.push(contact);
        return {contacts: prevState.contacts}
    }))
    */

    // Teacher's solution
    ContactsAPI.create(contact).then((contact) =>
      this.setState((prevState) => (
        {contacts: prevState.contacts.concat(contact)} // {contacts: prevState.contacts.concat([contact])}
      )
    ))
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
            OnRemoveContact={this.removeContact}
          />
          )}/>
        <Route path='/create' render={({ history }) => ( // render() gets {history} value from route object..!!
          <CreateContact
            OnAddContact={(contact) => {/*My solution
                                        * OnAddContact={this.addContact}
                                        */
              this.addContact(contact)
              history.push('/') // this changes the url to '/'
              // console.log(history)
            }}
          />
        )}/>

        <Route path='/' render={({history}) => { return (
          <div>
            {JSON.stringify(history)}
          </div>
          )
          }
        }/>
      </div>
    )
  }
}

export default App;



