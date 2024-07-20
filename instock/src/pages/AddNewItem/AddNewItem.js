import React, { useState } from 'react';
import './AddNewItem.scss';
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import { Link, useParams } from "react-router-dom";

function AddNewItem() {
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
        console.log(data);
        const apiUrl = 'http://localhost:8080/inventories';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                console.log('Item added successfully!');
                alert('Item added successfully!');
                setItemName('');
                setDescription('');
                setCategory('Available');
                setAvailability('inStock');
                setQuantity(0);
                setWarehouse('');
                setShowQuantity(true);
            } else {
                console.log('Failed to add the item.');
                alert('Failed to add the item. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the item.');
        });
    };

    return (
        <>
            <section className='add-item-card'>
                <div className='add-item-page-header-container'>
                    <h1 className='add-item-page-header-text'>Add New Inventory Item</h1>
                </div>
                <section className='add-item-content-split'>
                    <section className='add-item-details-container'>
                        <div className='add-item-details__header'>
                            <h2 className='add-item-details__header-text'>Item Details</h2>
                        </div>
                        <div className='add-item-details__name'>
                            <p className='add-item-details__name-text'>Item Name</p>
                            <textarea
                                className='add-item-details__name-textarea'
                                onChange={handleItemNameChange}
                                placeholder="Item Name"
                            ></textarea>
                        </div>
                        <div className='add-item-details__description'>
                            <p className='add-item-details__description-text'>Description</p>
                            <textarea
                                className='add-item-details__description-textarea'
                                onChange={handleDescriptionChange}
                                placeholder="Please enter a brief item description..."
                            ></textarea>
                        </div>
                        <div className='add-item-details__catagory'>
                            <p className='add-item-details__catagory-text'>Category</p>
                            <select
                                className='add-item-details__catagory-select'
                                onChange={handleCategoryChange}
                            >
                                <option>Accessories</option>
                                <option>Apparel</option>
                                <option>Electronics</option>
                                <option>Gear</option>
                                <option>Health</option>
                            </select>
                        </div>
                    </section>
                    <section className='add-item-availability-container'>
                    <Link to={{ pathname: "/inventories" }}>
                    <img src={backIcon} alt="Back Icon" className='back-item-close-icon' />
                    </Link>
                        <h2 className='add-item-availability__header'>Item Availability</h2>
                        <div className='add-item-availability__status'>
                            <p className='add-item-availability__status-text'>Status</p>
                            <div className='add-item-availability__radio-options'>
                                <label className='add-item-availability__radio-options--one'>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="inStock"
                                        onChange={handleAvailabilityChange}
                                    />
                                    In stock
                                </label>
                                <label className='add-item-availability__radio-options--two'>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="outOfStock"
                                        onChange={handleAvailabilityChange}
                                    />
                                    Out of stock
                                </label>
                            </div>
                        </div>
                        <div className='add-item-availability__quantity' style={{ display: showQuantity ? 'block' : 'none' }}>
                            <p className='add-item-availability__quantity-text'>Quantity</p>
                            <input
                                type="number"
                                className='add-item-availability__quantity-input'
                                onChange={handleQuantityChange}
                            />
                        </div>
                        <div className='add-item-availability__warehouse'>
                            <p className='add-item-availability__warehouse-text'>Warehouse</p>
                            <select
                                className='add-item-availability__warehouse-select'
                                onChange={handleWarehouseChange}
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
                <div className='add-items-buttons'>
                <button className='edit-item-buttons__cancel'><Link to ="/inventories">Cancel</Link></button>
                    <button className='add-items-buttons__add-item' onClick={handleSave}>
                        Add Item
                    </button>
                </div>
            </section>
        </>
    );
}

export default AddNewItem;