import "./InventoryList.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import deleteImage from "../../assets/icons/delete_outline-24px.svg";
import pencilImage from "../../assets/icons/edit-24px.svg";
import titleImage from "../../assets/icons/sort-24px.svg";
import inventoryIcon from "../../assets/icons/chevron_right-24px.svg";

function InventoryList() {
	const [inventory, setInventory] = useState([]);
	const [error, setError] = useState(null);

	const fetchInventory = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/inventories"
			);
			setInventory(response.data);
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		fetchInventory();
	}, []);

	return (
		<div className="inventorylist">
			<div className="inventorylist__container">
				<div className="inventorylist__container-titlebox">
					<h1 className="inventorylist__container-title">
						Inventory
					</h1>
					<form className="inventorylist__container-form">
						<input
							type="text"
							name="search"
							className="inventorylist__container-search"
							placeholder="Search..."
						/>
						<Link to={`/addnewitem`}>
							<button className="inventorylist__container-button">
								+ Add New Item
							</button>
						</Link>
					</form>
				</div>
				<div className="inventorylist__table">
					<div className="inventorylist__table-headers">
						<p className="inventorylist__table-titles">
							Inventory Item
							<img
								src={titleImage}
								alt=""
								className="inventorylist__table-image"
							/>
						</p>
						<p className="inventorylist__table-titles">
							Category
							<img
								src={titleImage}
								alt=""
								className="inventorylist__table-image"
							/>
						</p>
						<p className="inventorylist__table-titles">
							Status
							<img
								src={titleImage}
								alt=""
								className="inventorylist__table-image"
							/>
						</p>
						<p className="inventorylist__table-titles">
							Qty
							<img
								src={titleImage}
								alt=""
								className="inventorylist__table-image"
							/>
						</p>
						<p className="inventorylist__table-titles">
							Warehouse
							<img
								src={titleImage}
								alt=""
								className="inventorylist__table-image"
							/>
						</p>
						<p className="inventorylist__table-titles">Actions</p>
					</div>
					<>
						{inventory.map((item) => (
							<div
								key={item.id}
								className="inventorylist__table-itemlist">
								<div className="inventorylist__table-columnbox">
									<div className="inventorylist__table-column">
										<p className="inventorylist__table-headertitle">
											Inventory Item
										</p>
										<Link
											to={`/inventories/${item.id}`}
											className="inventorylist__table-link">
											<p className="inventorylist__table-item">
												{item.item_name}
												<img
													src={inventoryIcon}
													alt=""
													className="inventorylist__table-itemimage"></img>
											</p>
										</Link>
										<p className="inventorylist__table-headertitle">
											Category
										</p>
										<p className="inventorylist__table-items">
											{item.category}
										</p>
									</div>
									<div className="inventorylist__table-column">
										<p className="inventorylist__table-headertitle">
											Status
										</p>
										<p
											className={`inventorylist__table-stock ${
												item.status === "Out of Stock"
													? "outofstock"
													: "instock"
											}`}>
											{item.status}
										</p>
										<p className="inventorylist__table-headertitle">
											Quantity
										</p>
										<p className="inventorylist__table-items">
											{item.quantity}
										</p>
										<p className="inventorylist__table-headertitle">
											Warehouse
										</p>
										<p className="inventorylist__table-items">
											{item.warehouse_name}
										</p>
									</div>
								</div>
								<div className="inventorylist__table-items">
									<div className="inventorylist__table-imagebox">
										<Link
											to={`/deleteitem/${item.id}`}
											className="inventorylist__table-link">
											<img
												src={deleteImage}
												className="inventorylist__table-icons"></img>
										</Link>
										<Link
											to={{
												pathname: `/edititem/${item.id}`,
												state: { item },
											}}
											className="inventorylist__table-link">
											<img
												src={pencilImage}
												className="inventorylist__table-icons"
												alt="Edit"
											/>
										</Link>
									</div>
								</div>
							</div>
						))}
					</>
				</div>
			</div>
		</div>
	);
}

export default InventoryList;
