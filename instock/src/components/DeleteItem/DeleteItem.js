import "./DeleteItem.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import deleteImage from "../../assets/icons/delete_outline-24px.svg";
import pencilImage from "../../assets/icons/edit-24px.svg";
import titleImage from "../../assets/icons/sort-24px.svg";
import inventoryIcon from "../../assets/icons/chevron_right-24px.svg";
import closeIcon from "../../assets/icons/close-24px.svg";


function DeleteItem() {
    const { id } = useParams();
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);
    const [itemName, setItemName] = useState("");

    const fetchInventory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/inventories");
            setInventory(response.data);


            const selectedItem = response.data.find(item => item.id === parseInt(id, 10));

            if (selectedItem) {
                setItemName(selectedItem.item_name);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteItem = async () => {
        try {
            await axios.delete(`http://localhost:8080/inventories/${id}`);
        } catch (err) {
            setError(err.message);
            console.log(`${id}`);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [id]);
    return (
        
        <div className="inventorylist">
          
            <div className="inventorylist__container-delete">
                <div className="inventorylist__container-titlebox">
                    <h1 className="inventorylist__container-title">Inventory</h1>
                    <form className="inventorylist__container-form">
                        <input type="text" name="search" className="inventorylist__container-search" placeholder="Search..." />
                        <button className="inventorylist__container-button">+ Add New Item</button>
                    </form>
                </div>
                <div className="inventorylist__table">
                    <div className="inventorylist__table-headers">
                        <p className="inventorylist__table-titles">
                            Inventory Item
                            <img src={titleImage} alt="" className="inventorylist__table-image" />
                        </p>
                        <p className="inventorylist__table-titles">
                            Category
                            <img src={titleImage} alt="" className="inventorylist__table-image" />
                        </p>
                        <p className="inventorylist__table-titles">
                            Status
                            <img src={titleImage} alt="" className="inventorylist__table-image" />
                        </p>
                        <p className="inventorylist__table-titles">
                            Qty
                            <img src={titleImage} alt="" className="inventorylist__table-image" />
                        </p>
                        <p className="inventorylist__table-titles">
                            Warehouse
                            <img src={titleImage} alt="" className="inventorylist__table-image" />
                        </p>
                        <p className="inventorylist__table-titles">Actions</p>
                    </div>
                    <>
                        {inventory.map((item) => (
                            <div key={item.id} className="inventorylist__table-itemlist">
                                <div className="inventorylist__table-columnbox">
                                <div className="inventorylist__table-column">
                                <p className="inventorylist__table-headertitle">Inventory Item</p>
                                <Link to={`/inventories/${item.item_name}`} className="inventorylist__table-link">
                                    <p className="inventorylist__table-item">
                                        {item.item_name}
                                        <img src={inventoryIcon} alt="" className="inventorylist__table-itemimage"></img>
                                    </p>
                                </Link>
                                <p className="inventorylist__table-headertitle">Category</p>
                                <p className="inventorylist__table-items">{item.category}</p>
                                </div>
                                <div className="inventorylist__table-column">
                                <p className="inventorylist__table-headertitle">Status</p>
                                <p className={`inventorylist__table-stock ${item.status === "Out of Stock" ? "outofstock" : "instock"}`}>{item.status}</p>
                                <p className="inventorylist__table-headertitle">Quantity</p>
                                <p className="inventorylist__table-items">{item.quantity}</p>
                                <p className="inventorylist__table-headertitle">Warehouse</p>
                                <p className="inventorylist__table-items">{item.warehouse_name}</p>
                                </div> 
                                 </div>
                                <div className="inventorylist__table-items">
                                    <div className="inventorylist__table-imagebox">
                                        <img src={deleteImage} className="inventorylist__table-icons"></img>
                                        <img src={pencilImage} className="inventorylist__table-icons"></img>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                </div>
            </div>
        
            <section className="delete-item-card">
                <div className="delete-item-card-body">
                    <div>
                        <Link to={{ pathname: "/inventories" }}>
                        <img src={closeIcon} alt="Close Icon" className='add-item-close-icon' />
                        </Link>
                        <h1 className="delete-item-card__title">Delete {itemName} inventory item?</h1>
                        <p className="delete-item-card__text">Please confirm that you'd like to delete {itemName} from the inventory list. You won't be able to undo this action.</p>
                    </div>
                    <div className="delete-item-card__buttons">
                        <Link to="/inventories" className="delete-item-card__link">
                            <button className="delete-item-card__button--one">Cancel</button>
                        </Link>
                        <Link to="/inventories" className="delete-item-card__link">
                        <button onClick={deleteItem} className="delete-item-card__button--two">Delete</button>
                        </Link>
                    </div>
                </div>
            </section>
        
        
        </div>
    
    
    
    
    );
}

export default DeleteItem;