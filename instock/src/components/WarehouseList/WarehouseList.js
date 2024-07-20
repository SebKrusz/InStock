import "./WarehouseList.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteImage from "../../assets/icons/delete_outline-24px.svg";
import pencilImage from "../../assets/icons/edit-24px.svg";
import titleImage from "../../assets/icons/sort-24px.svg";
import inventoryIcon from "../../assets/icons/chevron_right-24px.svg";
function WarehouseList() {
    const [warehouses, setWarehouses] = useState([]);
    const [error, setError] = useState(null);
    async function getWarehouses() {
        try {
            const response = await axios.get("http://localhost:8080/warehouses");
            setWarehouses(response.data);
        } catch (err) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getWarehouses();
    }, []);

    return (
        <main className="warehouselist">
            <div className="warehouselist__container">
                <div className="warehouselist__container-titlebox">
                    <h1 className="warehouselist__container-title">Warehouses</h1>
                    <form className="warehouselist__container-form">
                        <input type="text" name="search" className="warehouselist__container-search" placeholder="Search..." />
                        <Link to="/AddWarehouse"><button className="warehouselist__container-button">+ Add New Warehouse</button></Link>
                    </form>
                </div>
                <div className="warehouselist__container-table">
                    <div className="warehouselist__container-headers">
                        <p className="warehouselist__container-titles">
                            Warehouse
                            <img src={titleImage} alt="Up & down arrow" className="warehouselist__container-image" />
                        </p>
                        <p className="warehouselist__container-titles">
                            Address
                            <img src={titleImage} alt="Up & down arrow" className="warehouselist__container-image" />
                        </p>
                        <p className="warehouselist__container-titles">
                            Contact Name
                            <img src={titleImage} alt="Up & down arrow" className="warehouselist__container-image" />
                        </p>
                        <p className="warehouselist__container-titles">
                            Contact Information
                            <img src={titleImage} alt="Up & down arrow" className="warehouselist__container-image" />
                        </p>
                        <p className="warehouselist__container-titles">Actions</p>
                    </div>
                </div>

                {warehouses.map((item) => (
                    <div key={item.id} className="warehouselist__container-itemlist">
                        <div className="warehouselist__container-columnbox">
                            <div className="warehouselist__container-column">
                                <p className="warehouselist__container-headertitle">Warehouse</p>
                                <Link to={`/warehouses/${item.id}`} className="warehouselist__container-link">
                                    <p className="warehouselist__container-item">
                                        {item.warehouse_name}
                                        <img src={inventoryIcon} alt="" className="warehouselist__container-itemimage"></img>
                                    </p>
                                </Link>
                                <p className="warehouselist__container-headertitle">Address</p>
                                <p className="warehouselist__container-items">
                                    {item.address} {item.city} {item.country}
                                </p>
                            </div>
                            <div className="warehouselist__container-column">
                                <p className="warehouselist__container-headertitle">Contact Name</p>
                                <p className="warehouselist__container-items">{item.contact_name}</p>
                                <p className="warehouselist__container-headertitle">Contact Information</p>
                                <div>
                                    <p className="warehouselist__container-items">{item.contact_phone}</p>
                                    <p className="warehouselist__container-items">{item.contact_email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="warehouselist__container-items">
                            <div className="warehouselist__container-imagebox">
                            <Link to={`/deletewarehouse/${item.id}`} className="warehouselist__container-link">
                                       
                                <img src={deleteImage} className="warehouselist__container-icons"></img>
                                </Link>
                                <Link to={`/EditWarehouse/${item.id}`}>
                                <img src={pencilImage} className="warehouselist__container-icons"></img>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default WarehouseList;
