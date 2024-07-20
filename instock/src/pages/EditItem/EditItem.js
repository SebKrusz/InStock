import React, { useState } from 'react';
import './EditItem.scss';
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import { Link, useParams } from "react-router-dom";

function EditItem() {
    
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Available');
    const [availability, setAvailability] = useState('inStock');
    const [quantity, setQuantity] = useState(0);
    const [warehouse, setWarehouse] = useState('1');
    const [showQuantity, setShowQuantity] = useState(true);

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAvailabilityChange = (event) => {
        const selectedAvailability = event.target.value;
        setAvailability(selectedAvailability);
        if (selectedAvailability === 'inStock') {
            setShowQuantity(true);
        } else {
            setShowQuantity(false); 
        }
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleWarehouseChange = (event) => {
        const selectedWarehouseId = event.target.value;
        setWarehouse(selectedWarehouseId);
    };

    const handleSave = () => {
        const status = availability === 'inStock' ? 'In Stock' : 'Out of Stock';
    
        const data = {
            "warehouse_id": warehouse,
            "item_name": itemName,
            "description": description,
            "category": category,
            "status": status,
            "quantity": availability === 'inStock' ? String(quantity) : "0"
        };
        
        const itemId = window.location.pathname.split('/').pop();
    
        const apiUrl = `http://localhost:8080/inventories/${itemId}`;
    
        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                console.log('Item updated successfully!');
                alert('Item saved successfully!');
                setItemName('');
                setDescription('');
                setCategory('Available');
                setAvailability('inStock');
                setQuantity(0);
                setWarehouse('1');
                setShowQuantity(true);
    
                document.querySelector('.edit-item-details__name-textarea').value = '';
                document.querySelector('.edit-item-details__description-textarea').value = '';
                document.querySelector('.edit-item-details__category-select').selectedIndex = 0;
                document.querySelector('input[name="availability"][value="inStock"]').checked = true;
                document.querySelector('.edit-item-availability__quantity-input').value = '';
                document.querySelector('.edit-item-availability__warehouse-select').selectedIndex = 0;
            } else {
                console.log('Failed to update the item.');
                alert('Failed to save the item. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the item.');
        });
    };
    return (
        <>
            <section className='edit-item-card'>
                <div className='edit-item-page-header-container'>
                    <Link to={{ pathname: "/inventories" }}>
                    <img src={backIcon} alt="Back Icon" className='back-item-close-icon-two' />
                    </Link>
                    <h1 className='edit-item-page-header-text'>Edit Inventory Item</h1>
                </div>
                <section className='edit-item-content-split'>
                    <section className='edit-item-details-container'>
                        <div className='edit-item-details__header'>
                            <h2 className='edit-item-details__header-text'>Item Details</h2>
                        </div>
                        <div className='edit-item-details__name'>
                            <p className='edit-item-details__name-text'>Item Name</p>
                            <textarea
                                className='edit-item-details__name-textarea'
                                placeholder="Item Name"
                                onChange={handleItemNameChange}
                                required
                            ></textarea>
                        </div>
                        <div className='edit-item-details__description'>
                            <p className='edit-item-details__description-text'>Description</p>
                            <textarea
                                className='edit-item-details__description-textarea'
                                placeholder="Please enter a brief item description..."
                                onChange={handleDescriptionChange}
                                required
                            ></textarea>
                        </div>
                        <div className='edit-item-details__category'>
                            <p className='edit-item-details__category-text'>Category</p>
                            <select
                                className='edit-item-details__category-select'
                                onChange={handleCategoryChange}
                                required
                            >
                                <option>Accessories</option>
                                <option>Apparel</option>
                                <option>Electronics</option>
                                <option>Gear</option>
                                <option>Health</option>
                            </select>
                        </div>
                    </section>
                    <section className='edit-item-availability-container'>
                        <h2 className='edit-item-availability__header'>Item Availability</h2>
                        <div className='edit-item-availability__status'>
                            <p className='edit-item-availability__status-text'>Status</p>
                            <div className='edit-item-availability__radio-options'>
                                <label className='edit-item-availability__radio-options--one'>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="inStock"
                                        onChange={handleAvailabilityChange}
                                        required
                                    />
                                    In stock
                                </label>
                                <label className='edit-item-availability__radio-options--two'>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="outOfStock"
                                        onChange={handleAvailabilityChange}
                                        required
                                    />
                                    Out of stock
                                </label>
                            </div>
                        </div>
                        <div className='edit-item-availability__quantity' style={{ display: showQuantity ? 'block' : 'none' }}>
                    <p className='edit-item-availability__quantity-text'>Quantity</p>
                    <input
                        className='edit-item-availability__quantity-input'
                        type="number"
                        onChange={handleQuantityChange}/>
                </div>
                        <div className='edit-item-availability__warehouse'>
                            <p className='edit-item-availability__warehouse-text'>Warehouse</p>
                            <select
                            className='edit-item-availability__warehouse-select'
                            onChange={handleWarehouseChange}
                            required
                            >
                            <option value="1">Boston</option>
                            <option value="2">Miami</option>
                            <option value="3">New Jersey</option>
                            <option value="4">New York</option>
                            <option value="5">San Francisco</option>
                            <option value="6">Santa Monica</option>
                            <option value="7">Seattle</option>
                            <option value="8">Washington</option>
                        </select>
                        </div>
                    </section>
                </section>
                <div className='edit-item-buttons'>
                    <button className='edit-item-buttons__cancel'><Link to ="/inventories">Cancel</Link></button>
                    <button className='edit-item-buttons__add-item' onClick={handleSave}>
                        Save
                    </button>
                </div>
            </section>
        </>
    );
}

export default EditItem;
