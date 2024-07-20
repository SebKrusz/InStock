import "./Header.scss";
import {Link} from "react-router-dom";
import InstockLogo from "../../assets/logos/InStock-Logo_1x.png";
import { useState } from "react";

const Header = () => {
    const [selectedLink, setSelectedLink] = useState(null);

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    return (
       <header className="header">
            <div className="header__box">
                <Link to = "/">
                <div className="header__box-logo">
                    <img
                        src = {InstockLogo}
                        alt = "Instock Logo"
                    >
                    </img>
                </div>  
                </Link>
            </div>
            <nav className="header__container">
                <ul className="header__container-nav">
                    <li className="header__container-nav-box">
                    <Link
                        to={`/warehouses`}
                        className="header__container-nav-box-link"
                    > 
                        <button className={`header__container-nav-box-link ${
                            selectedLink === 'warehouses' 
                            ? 'header__container-nav-box-link--selected' 
                            : ''
                            }`}
                            onClick={() => handleLinkClick('warehouses')}
                        >
                            Warehouses
                        </button>
                    </Link>
                    </li>
                    <li className="header__container-nav-box">
                    <Link
                        to={`/inventories`}
                        className="header__container-nav-box-link"
                    > 
                        <button className={`header__container-nav-box-link ${
                            selectedLink === 'inventory' 
                            ? 'header__container-nav-box-link--selected' 
                            : ''
                            }`}
                            onClick={() => handleLinkClick('inventory')}
                            
                        >
                            Inventory
                        </button>
                        </Link>
                    </li>
                </ul>
            </nav>
       </header>
    )
}

export default Header;