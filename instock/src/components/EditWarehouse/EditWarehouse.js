import "./EditWarehouse.scss";
import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Back from "../../assets/icons/arrow_back-24px.svg";

const EditWarehouse = () => {

    function isValidEmail(email) {
        var pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }
    const isValidPhoneNumber = (phoneNumber) => {
        const pattern = /^\+?\d{11}$/;
        return pattern.test(phoneNumber);
    };
    const [warehouseName, setWarehouseName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [contactName, setContactName] = useState('');
    const [position, setPosition] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleWarehouseNameChange = (event) => {
        setWarehouseName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleContactNameChange = (event) => {
        setContactName(event.target.value);
    };

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };

    const handlePhoneChange = (event) => {
        const inputPhone = event.target.value;
        setPhone(inputPhone);
        const isValid = isValidPhoneNumber(inputPhone);
        event.target.classList.toggle('error', !isValid);
    };

    const handleEmailChange = (event) => {

        const inputEmail = event.target.value;
        setEmail(inputEmail);
        const isValid = isValidEmail(inputEmail);
        event.target.classList.toggle('error', !isValid);
    };

    const handleSave = () => {

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!isValidPhoneNumber(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        const warehouseId = parseInt(window.location.pathname.split('/').pop());
        const data = {
            "id":warehouseId,
            "warehouse_name": warehouseName,
            "address": address,
            "city": city,
            "country": country,
            "contact_name": contactName,
            "contact_position": position,
            "contact_phone": phone,
            "contact_email":email,
        };

        const apiUrl = `http://localhost:8080/warehouses/${warehouseId}`;

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                console.log('Warehouse updated successfully!');
                alert('Warehouse saved successfully!');
                setWarehouseName('');
                setAddress('');
                setCity('');
                setCountry('');
                setContactName('');
                setPosition('');
                setPhone('');
                setEmail('');


            } else {
                console.log('Failed to update the warehouse');
                alert('Failed to save the warehouse. Please try again.');

            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the warehouse.');

        })
    };

    return (
        <>
        <main className="edit">
           
            <section className="edit__header">
                <Link to =  "/warehouses">
                <img className="edit__header-icon" src = {Back}
                alt = "Back Arrow"
                ></img>
                </Link>
                <h1 className="edit__header-text">Edit Warehouse</h1>
            </section>

            <section className="edit__main">
                <section className="edit__main-detail">
               
                    <div className="edit__main-detail-title">
                        <h2 className="edit__main-detail-title-text">Warehouse Details</h2>
                    </div>

                    <form className="edit__main-detail-form">
                        <article className="edit__main-detail-form-article">
                            <label className="edit__main-detail-form-article-label">Warehouse Name</label>
                            <input className="edit__main-detail-form-article-input"
                                type="text"
                                id="name"
                                placeholder="Warehouse Name"
                                onChange={handleWarehouseNameChange}
                                required
                            />
                        </article>
                        <article className="edit__main-detail-form-article">
                            <label className="edit__main-detail-form-article-label">Street Address</label>
                            <input className="edit__main-detail-form-article-input"
                                type="text"
                                id="Address"
                                placeholder="Street Address"
                                required
                                onChange={handleAddressChange}
                            />
                        </article>
                        <article className="edit__main-detail-form-article">
                        <label className="edit__main-detail-form-article-label">City</label>
                            <input className="edit__main-detail-form-article-input"
                                type="text"
                                id="City"
                                placeholder="City"
                                onChange={handleCityChange}
                                required
                            />
                        </article>
                        <article className="edit__main-detail-form-article">
                            <label className="edit__main-detail-form-article-label">Country</label>
                            <input className="edit__main-detail-form-article-input"
                                id = "Country"
                                type="text"
                                placeholder="Country"
                                onChange={handleCountryChange}
                                required
                            />
                        </article>
                    </form>

                </section>
           
                <section className="edit__main-detail">
                    <div className="edit__main-detail-title">
                        <h2 className="edit__main-detail-title-text">Contact Details</h2>
                    </div>

                    <form className="edit__main-detail-form">
                        <article className="edit__main-detail-form-article">
                            <label className="edit__main-detail-form-article-label">Contact Name</label>
                            <input className="edit__main-detail-form-article-input"
                                id = "Contact_name"
                                type="text"
                                placeholder="Contact Name"
                                onChange={handleContactNameChange}
                                required
                            />
                        </article>

                        <article className="edit__main-detail-form-article">
                            <label className="edit__main-detail-form-article-label">Position</label>
                            <input className="edit__main-detail-form-article-input"
                                id = "Position"
                                type="text"
                                placeholder="Position"
                                required
                                onChange={handlePositionChange}
                            />
                        </article>

                        <article className="edit__main-detail-form-article">
                            <label className="edit__main-detail-form-article-label">Phone Number</label>
                            <input className="edit__main-detail-form-article-input"
                                id = "Phone_number"
                                type="text"
                                placeholder="Phone Number"
                                onChange={handlePhoneChange}
                                required
                            />
                        </article>

                        <article className="edit__main-detail-form-article">
                            <label className="edit__main-detail-form-article-label"
                            >Email</label>
                            <input className="edit__main-detail-form-article-input"
                                id = "Email"
                                type="text"
                                placeholder="Email"
                                onChange={handleEmailChange}
                                required
                            />
                        </article>
                    </form>
                </section>
            </section>  

            <section className="edit__footer">
                
                <button className="edit__footer-cancel"><Link to="/warehouses">Cancel</Link></button>
                
                <button className="edit__footer-save" onClick={handleSave}>Save</button>
            </section>
   
        </main>
        </>
    )
}

export default EditWarehouse;