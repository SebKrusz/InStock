import "./InventoryDetails.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import buttonImage from "../../assets/icons/editwhite-23px.svg";
import titleImage from "../../assets/icons/arrow_back-24px.svg";

function InventoryDetails() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);

    const fetchItem = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/inventories/${id}`);
            setItem(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchItem();
    }, [id]);

    return (
        <div className="inventorydetails">
            <>
                {item && (
                    <section className="inventorydetails__container">
                        <div className="inventorydetails__container-headingbox">
                            <div className="inventorydetails__container-titlebox">
                                <Link to="/inventories">
                                    <img src={titleImage} alt="back arrow" className="inventorydetails__container-image" />
                                </Link>
                                <h1 className="inventorydetails__container-title">{item.item_name}</h1>
                            </div>
                            <Link to={{ pathname: `/edititem/${item.id}`, state: { item } }} className="inventorylist__table-link">
                            <button type="submit" className="inventorydetails__container-button">
                                <img src={buttonImage} alt="pencil icon" className="inventorydetails__container-buttonimage" />
                                <span className="inventorydetails__container-buttontext">Edit</span>
                            </button>
                            </Link>
                        </div>

                        <div className="inventorydetails__table">
                            <div className="inventorydetails__table-leftitems">
                                <h3 className="inventorydetails__table-heading">Item Description:</h3>
                                <p className="inventorydetails__table-text">{item.description}</p>
                                <h3 className="inventorydetails__table-heading">Category:</h3>
                                <p className="inventorydetails__table-text">{item.category}</p>
                            </div>
                            <div className="inventorydetails__table-rightitems">
                                <div className="inventorydetails__table-box">
                                    <h3 className="inventorydetails__table-heading">Status:</h3>
                                    <p className={`inventorydetails__table-stock ${item.status === "Out of Stock" ? "outofstock" : "instock"}`}>{item.status}</p>
                                    <h3 className="inventorydetails__table-heading">Warehouse:</h3>
                                    <p className="inventorydetails__table-text">{item.warehouse_name}</p>
                                </div>
                                <div className="inventorydetails__table-quantitybox">
                                    <h3 className="inventorydetails__table-heading">Quantity:</h3>
                                    <p className="inventorydetails__table-text">{item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </>
        </div>
    );
}

export default InventoryDetails;
