import React, { Component } from 'react';
import ImageInput from './ImageInput'
import { Link } from 'react-router-dom'

class CreateContact extends Component {
    render() { return (
        <div>
            <Link className='close-create-contact' to='/'/>
            <form className='create-contact-form'>
                <ImageInput
                    className='create-contact-avatar-input'
                    name='avatarUrl'
                    maxHeight={64}
                />
                <div className='create-contact-details'>

                    {/* My solution:
                        <p><label>First Name</label> <input type='text'/></p>
                        <p><label>Last Name</label> <input type='text'/></p>
                    */}
                    <input type='text' name='name' placeholder='Name'/>
                    <input type='text' name='email' placeholder='Email'/>

                    <p><button>Add Contact</button></p>
                </div>
            </form>
        </div>)
    }
}

export default CreateContact;