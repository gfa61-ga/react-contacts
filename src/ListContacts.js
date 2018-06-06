import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import sortBy from 'sort-by';


class ListContacts extends Component {

    static propTypes = {
      parent: PropTypes.object.isRequired,
      contacts: PropTypes.array.isRequired,
      OnRemoveContact: PropTypes.func.isRequired
    }

    state = {query: ''}

    searchQuery = (event) => {
        this.setState({query: event.target.value})
    }

    render() {
        return (
            <div className='list-contacts'>
                <form className='list-contacts-top'>
                    <input className='search-contacts' type='text'
                        placeholder='Search contacts'
                        value={this.state.query}
                        onChange={this.searchQuery}
                    />
                </form>
                <ol className='contact-list'>
                    {this.props.contacts.sort(sortBy('name')).map(contact => {
                        if (contact.name.match(new RegExp(escapeStringRegexp(this.state.query), 'i'))) { return (

                        <li className='contact-list-item' key={contact.id}>
                            <img className='contact-avatar' alt={"Avatar Image of " + contact.name} src={contact.avatarURL}/>
                        {/* Teachers solution:
                            <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                        */}
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            {/* if we don't use arrow functin, 'this' will refer to button element: */}
                            <button onClick={() => {this.props.OnRemoveContact.call(this.props.parent, contact)}} className='contact-remove'/>
        {/* if App.removeContact is written as arrow function we don't have to use call() :
                            <button onClick={function() {props.OnRemoveContact(contact)}} className='contact-remove'/>

                            // or even better:
                            <button onClick={() => props.OnRemoveContact(contact)} className='contact-remove'/>
        */}
                        </li> )
                    } else {return ''}
                    }
                    )}
                </ol>
            </div>
        )
    }
}

export default ListContacts;