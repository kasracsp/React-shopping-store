import React from 'react'
import './App.scss';
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import Orders from './components/Orders';
import DataContextProvider from './context/DataContextProvider';
import CardContextProvider from './context/CardContextProvider';
import FilteredContextProvider from './context/FilteredContextProvider';


function App() {
  
  return (
    <div>
      <DataContextProvider>
        <CardContextProvider>
          <FilteredContextProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Products/>} />
              <Route path='/:item' element={<Product/>} />
              <Route path='/orders' element={<Orders/>} />
            </Routes>
          </FilteredContextProvider>
        </CardContextProvider>
      </DataContextProvider>  
    </div>
  );
}

export default App;
