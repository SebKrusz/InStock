// import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AddNewItem from './pages/AddNewItem/AddNewItem';
import EditItem from './pages/EditItem/EditItem';
import DeleteItem from './components/DeleteItem/DeleteItem';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InventoryList from "./components/InventoryList/InventoryList";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";
import WarehouseList from './components/WarehouseList/WarehouseList';
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails';
import DeleteWarehouse from './components/DeleteWarehouse/DeleteWarehouse';
import EditWarehouse from './components/EditWarehouse/EditWarehouse';
import AddWarehouse from "./components/AddNewWarehouse/AddNewWarehouse"
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path= "/" element={<HomePage />} />
        <Route path="/EditWarehouse/:id" element={<EditWarehouse/>}/>
        <Route path="/AddWarehouse" element={<AddWarehouse />} />
        <Route path= "/inventories" element={<InventoryList />} />
        <Route path= "/inventories/:id" element={<InventoryDetails />} />
        <Route path= "/warehouses" element={<WarehouseList />} />
        <Route path= "/warehouses/:id" element={<WarehouseDetails />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/AddNewItem" element={<AddNewItem />} />
        <Route path="/EditItem/:id" element={<EditItem />} />
        <Route path="/deleteitem/:id" element={<DeleteItem />} />
        <Route path="/deletewarehouse/:id" element={<DeleteWarehouse />} />
      </Routes>
      <Footer/>
    </BrowserRouter>


  );
}
export default App;