import React from 'react';
import './ContactUs.css'; // Import the CSS file for styling

function ContactUs({ onClose }) {
    return (
        <div className="modal-content">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Contact Us</h2>
            <p>
                {/* Add the content for your contact us page here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                interdum dui. Quisque a cursus lorem. Sed commodo ex ut lacus malesuada,
                vel interdum risus aliquam. Phasellus condimentum mi et velit pretium,
                sit amet facilisis purus congue. Duis vestibulum, felis eu blandit convallis,
                dui ipsum viverra purus, non luctus nulla mi sed velit.
            </p>
        </div>
    );
}

export default ContactUs;
