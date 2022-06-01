import React,{useContext,useState} from 'react'
import Card from './Card'
import './Products.scss'
import { DataContext } from '../context/DataContextProvider'
import FilterCard from './FilterCard'
import { FilteredContext } from '../context/FilteredContextProvider'
import { filterData } from './helper/filterData'

const Products = () => {
  const state=useContext(DataContext)
  const {filterState}=useContext(FilteredContext)
  
  const [back,setBack]=useState(false)

  return (
    <div className='products_container'>
      {state.isLoading?
      <div className='loading'>
        <span className='loading_logo'></span>
        <span className='loading_logo'></span>
        <span className='loading_logo'></span>
      </div>
      :
      <div className='product-wrapper'>
        <div className='product-filter'>
          <button onClick={()=>setBack(!back)}className='filterButton'>Filter</button>
          <FilterCard isActive={back} setActive={()=>setBack(!back)}/>
        </div>
        <div className='product_container'>
          {filterData(state.data,filterState).map(item=><Card key={item.id} productData={item}/>)
          }
          {state.error && <h1>Fail to connect</h1>}
        </div>
      </div>
      }
    </div>
  )
}

export default Products