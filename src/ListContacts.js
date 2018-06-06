import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeStringRegexp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component {

    static propTypes = {
      parent: PropTypes.object.isRequired,
      contacts: PropTypes.array.isRequired,
      OnRemoveContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    searchQuery = (newQuery) => {
        this.setState({ query: newQuery.trim() })
    }

    showAll = () => {
        this.setState({ query: '' })
    }

    render() {
        let showingContacts // if i use 'const' insetad of 'let' i must set its value here..!!

        if (this.state.query !== '') {
            const contactQuery = new RegExp(escapeStringRegexp(this.state.query), 'i')
            showingContacts = this.props.contacts.filter((contact) => contactQuery.test(contact.name))
        } else {
            showingContacts = this.props.contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts' type='text'
                        placeholder='Search contacts'
                        value={this.state.query}
                        onChange={(event) =>this.searchQuery(event.target.value)}
                    />
                </div>
                { showingContacts.length < this.props.contacts.length &&
                    <div className='showing-contacts'>
                        {/* My solution:
                          * Now showing {showingContacts.length} of {this.props.contacts.length} total
                          **** We don't need arrow function because showAll is defined in ListContacts and not in App
                          * <button onClick={() => this.showAll()}>Show all</button>
                          */}
                        <span>
                            Now showing {showingContacts.length} of {this.props.contacts.length} total
                        </span>
                        <button onClick={this.showAll}>Show all</button>
                    </div>
                }
                <ol className='contact-list'>
                    {showingContacts.map(contact => {
                        return (
                            <li className='contact-list-item' key={contact.id}>

                                <img className='contact-avatar' alt={"Avatar Image of " + contact.name} src={contact.avatarURL}/>
                                {/* Teachers solution:
                                  * <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                                  */}

                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>

                                {/* if we don't use arrow functin, 'this' will refer to button element: */}
                                <button onClick={() => {this.props.OnRemoveContact.call(this.props.parent, contact)}} className='contact-remove'/>
                                    {/* if App.removeContact is written as arrow function we don't have to use call() :
                                      *  <button onClick={function() {props.OnRemoveContact(contact)}} className='contact-remove'/>
                                      *
                                      * or even better:
                                      * <button onClick={() => props.OnRemoveContact(contact)} className='contact-remove'/>
                                      */}
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }
}

export default ListContacts