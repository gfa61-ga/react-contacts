import React from 'react';
import PropTypes from 'prop-types';


function ListContacts(props) {
    return (
        <ol className='contact-list'>
            {props.contacts.map(contact =>
                <li className='contact-list-item' key={contact.id}>
                    <img className='contact-avatar' alt={"Avatar Image of " + contact.name} src={contact.avatarURL}/>
                {/* Teachers solution:
                    <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                */}
                    <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                    </div>
                    <button onClick={function() {props.OnRemoveContact.call(props.parent, contact)}} className='contact-remove'/>
{/* if App.removeContact is written as arrow function we don't have to use call() :
                    <button onClick={function() {props.OnRemoveContact(contact)}} className='contact-remove'/>

                    // or even better:
                    <button onClick={() => props.OnRemoveContact(contact)} className='contact-remove'/>
*/}
                </li>
            )}
        </ol>
    )
}

ListContacts.propTypes = {
  parent: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  OnRemoveContact: PropTypes.func.isRequired
}

export default ListContacts;