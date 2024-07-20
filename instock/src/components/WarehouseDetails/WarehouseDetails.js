import "./WarehouseDetails.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import buttonImage from "../../assets/icons/editwhite-23px.svg";
import titleImage from "../../assets/icons/sort-24px.svg";
import deleteImage from "../../assets/icons/delete_outline-24px.svg";
import pencilImage from "../../assets/icons/edit-24px.svg";
import inventoryIcon from "../../assets/icons/chevron_right-24px.svg";
import backImage from "../../assets/icons/arrow_back-24px.svg";

function WarehouseDetails() {
    const [warehouseDetail, setWarehouseDetail] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();
    async function getWarehouseDetails() {
        try {
            const response = await axios.get(`http://localhost:8080/warehouses/${id}`);
            setWarehouseDetail(response.data);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        getWarehouseDetails();
    }, []);

    async function DeleteWarehouse() {
        try {
            const response = await axios.delete(`http://localhost:8080/warehouses/${id}`);
            setWarehouseDetail(response.data);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        getWarehouseDetails();
    }, []);

    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/warehouses/${id}/inventories`);
            setInventory(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [id]);

    return (
        <main className="warehousedetails">
            <div className="warehousedetails-container">
                {warehouseDetail && (
                    <section className="warehousedetails__container">
                        <div className="warehousedetails__container-headingbox">
                            <div className="warehousedetails__container-titlebox">
                                <Link to="/warehouses">
                                    <img src={backImage} alt="back arrow" className="warehousedetails__container-back" />
                                </Link>
                                <h1 className="warehousedetails__container-title">{warehouseDetail.warehouse_name}</h1>
                            </div>
                            <Link to="/EditWarehouse/:id">
                            <button type="submit" className="inventorydetails__container-button">
                                <img src={buttonImage} alt="pencil icon" className="inventorydetails__container-buttonimage" />
                                <span className="inventorydetails__container-buttontext">Edit</span>
                            </button>
                            </Link>
                        </div>

                        <div className="warehousedetails-table">
                            <div className="warehousedetails-table__leftitems">
                                <h3 className="warehousedetails-table__heading">Warehouse Address:</h3>
                                <p className="warehousedetails-table__addresstext">{warehouseDetail.address}, {`${warehouseDetail.city}, ${warehouseDetail.country}`}</p>
                            </div>
                            <div className="warehousedetails-table__rightitems">
                                <div className="warehousedetails-table__box">
                                    <div className="warehousedetails-table-text">
                                        <h3 className="warehousedetails-table__heading">Contact Name:</h3>
                                        <p className="warehousedetails-table__text">{warehouseDetail.contact_name}</p>
                                        <p className="warehousedetails-table__text">{warehouseDetail.contact_position}</p>
                                    </div>
                                    <div className="warehousedetails-table-text">
                                        <h3 className="warehousedetails-table__heading">Contact Information:</h3>
                                        <p className="warehousedetails-table__text">{warehouseDetail.contact_phone}</p>
                                        <p className="warehousedetails-table__text">{warehouseDetail.contact_email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
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
                    <p className="inventorylist__table-titles">Actions</p>
                </div>
                <>
                    {inventory.map((item) => (
                        <div key={item.id} className="inventorylist__table-itemlist">
                            <div className="inventorylist__table-columnbox">
                                <div className="inventorylist__table-column">
                                    <p className="inventorylist__table-headertitle">Inventory Item</p>
                                    <Link to={`/inventories/${item.id}`} className="inventorylist__table-link">
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
                                </div>
                            </div>
                            <div className="inventorylist__table-items">
                                <div className="inventorylist__table-imagebox">
                                <Link to={`/deleteitem/${item.id}`} className="inventorylist__table-link">
                                        <img src={deleteImage} className="inventorylist__table-icons"></img>
                                    </Link>
                                    <Link to={`/EditWarehouse/${item.id}`}>
                                        <img src={pencilImage} className="inventorylist__table-icons" alt="Edit" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            </div>
        </main>
    );
}
export default WarehouseDetails;
