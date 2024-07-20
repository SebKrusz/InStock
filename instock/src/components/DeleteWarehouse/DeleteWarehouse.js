import "./DeleteWarehouse.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import deleteImage from "../../assets/icons/delete_outline-24px.svg";
import pencilImage from "../../assets/icons/edit-24px.svg";
import titleImage from "../../assets/icons/sort-24px.svg";
import inventoryIcon from "../../assets/icons/chevron_right-24px.svg";
import closeIcon from "../../assets/icons/close-24px.svg";
import { Navigate } from "react-router-dom";
import WarehouseList from "../WarehouseList/WarehouseList";

function DeleteWarehouse() {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState([]);
    const [error, setError] = useState(null);
    const [del,setDel] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const fetchWarehouse = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/warehouses/${id}`);
            setWarehouse(response.data);

            
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteWarehouse = async () => {
        try {
            await axios.delete(`http://localhost:8080/warehouses/${id}`);
            setLoading(false);
            
        } catch (err) {
            setError(err.message);
        }
    };
    

    useEffect(() => {
        fetchWarehouse();
    }, [id]);
    if(isLoading===false){
        return <Navigate to="/warehouses" />;
    }
    return (
<main>

<div className="warehouse-list">
<div className="overlay">
<WarehouseList/>
</div>
</div>
            <section className="delete-item-card">
                <div className="delete-item-card-body">
                    <div>
                        <Link to={{ pathname: "/warehouses" }}>
                        <img src={closeIcon} alt="Close Icon" className='add-item-close-icon' />
                        </Link>
                        <h1 className="delete-item-card__title">Delete {warehouse.warehouse_name} Warehouse?</h1>
                        <p className="delete-item-card__text">Please confirm that you'd like to delete {warehouse.warehouse_name} from the warehouse list. You won't be able to undo this action.</p>
                    </div>
                    <div className="delete-item-card__buttons">
                        <Link to="/warehouses" className="delete-item-card__link">
                            <button className="delete-item-card__button--one">Cancel</button>
                        </Link>
                        
                        <button onClick={deleteWarehouse} className="delete-item-card__button--two">Delete</button>
                        
                    </div>
                </div>
            </section>
            </main>
    );
}

export default DeleteWarehouse;