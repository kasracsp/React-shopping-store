import React,{useContext} from 'react'

import { DataContext } from '../context/DataContextProvider'
import { FilteredContext } from '../context/FilteredContextProvider'
import { categoryItems } from './helper/suggestion'
import { isInFilter } from './helper/suggestion'
import './FilterCard.scss'

const FilterCard = ({isActive,setActive}) => {
  const state=useContext(DataContext)
  const {filterState,filterDispatch}=useContext(FilteredContext)
  const category=categoryItems(state)

  return (
    <div className={`filterContainer ${isActive && 'active'}`}>
      {
        isActive && <button onClick={setActive}>back to product</button>
      }
      <div className='priceFilters'>
        <div className='priceFilter'>
          <p className='filter-intro'>Sort</p>
          <input type="radio" name="sort" id="Ascending" onChange={()=>filterDispatch({type:'SORT_BY_PRICE',payload:'Ascending'})} checked={filterState.sort==='Ascending'?true:false}/>
          <label htmlFor="Ascending">Ascending</label>
        </div>
        <div className='priceFilter'>
          <input type="radio" name="sort" id="Descending" onChange={()=>filterDispatch({type:'SORT_BY_PRICE',payload:'Descending'})} checked={filterState.sort==='Descending'?true:false}/>
          <label htmlFor="Descending">Descending</label>
        </div>
        <div className='priceFilter'>
          <input type="radio" name="sort" id="ByRate" onChange={()=>filterDispatch({type:'SORT_BY_PRICE',payload:'ByRate'})} checked={filterState.sort==='ByRate'?true:false}/>
          <label htmlFor="ByRate">By Rate</label>
        </div>
      </div>

      <p className='filter-intro'>Category</p>
      {category.map((item,index)=>
      <div key={index} className='categoryFilter'>
          <input type="checkbox" id={item} 
          onChange={()=>filterDispatch({type:'SORT_BY_CATEGORY',payload:item})} checked={isInFilter(filterState.categorySort,item)?true:false}/>
          <label htmlFor={item}>{item}</label>
        </div>
      )}
      <p className='filter-intro'>Rate</p>
      <div className='rate-stars'>
        {[1,2,3,4,5].map((item,index)=>
          <span key={index} className='material-icons' id={filterState.ratingSort>=item?'':'grade'}onClick={()=>filterDispatch({type:'SORT_BY_RATING',payload:item})}>star</span>
        )}
      </div>

      <button onClick={()=>filterDispatch({type:'CLEAR'})}>Clear Filters</button>
    </div>
  )
}

export default FilterCard