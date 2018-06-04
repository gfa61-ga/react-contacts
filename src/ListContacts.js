import React from 'react';

function ListContacts(props) {
    return (
        <ol className='contact-list'>
            {props.contacts.map(contact =>
                <li className='contact-list-item' key={contact.id}>
                    <img className='contact-avatar' src={contact.avatarURL}/>
                {/* Teachers solution:
                    <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                */}
                    <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                    </div>
                    <button className='contact-remove'/>
                </li>
            )}
        </ol>
    )
}

export default ListContacts;