import React, { Component } from 'react';
import ImageInput from './ImageInput'
import { Link } from 'react-router-dom'
import formSerialize from 'form-serialize'

class CreateContact extends Component {

    onSubmitForm = (e) => {
        e.preventDefault();

        // teacher's solution
        const values = formSerialize(e.target, {hash: true}) // the event target is the form
        if (this.props.OnAddContact) { // check if there is an OnAddContact prop
            this.props.OnAddContact(values)
        }
        /* My solution:
        let serialize = require('form-serialize');
        let form = document.querySelector('.create-contact-form');
        this.props.OnAddContact(serialize(form, {hash: true}))
        */
    }

    render() { return (
        <div>
            <Link className='close-create-contact' to='/'/>
            <form className='create-contact-form'
                  onSubmit={this.onSubmitForm}>
                <ImageInput
                    className='create-contact-avatar-input'
                    name='avatarURL'
                    maxHeight={64}
                />
                <div className='create-contact-details'>

                    {/* My solution:
                        <p><label>First Name</label> <input type='text'/></p>
                        <p><label>Last Name</label> <input type='text'/></p>
                    */}
                    <input type='text' name='name' placeholder='Name'/>
                    <input type='text' name='email' placeholder='Email'/>

                    <button>Add Contact</button>
                </div>
            </form>
        </div>)
    }
}

export default CreateContact;