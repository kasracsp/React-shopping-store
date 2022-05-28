import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { CardContext} from '../context/CardContextProvider'
import { DataContext } from '../context/DataContextProvider'

import { suggestion } from './helper/suggestion'

const Navbar = () => {
  const [list,setList]=useState({
    searchValue:'',
    filteredList:[]
  })
  const dataState=useContext(DataContext)
  const {state}=useContext(CardContext)

  const changeHandler=event=>{
    setList({
      searchValue:event.target.value,
      filteredList:suggestion(dataState.data,event.target.value)
    })
  }
  const clickHandler=()=>{
    setList({
      searchValue:'',
      filteredList:[]
    })
  }
  
  return (
    <div className='navbar_container'>
      <Link to='/' className='navbar_link'>Products</Link>
      <div className='serach_container'>
        <input type='text' className='search' value={list.searchValue} onChange={changeHandler}/>
        <span className='material-icons'>search</span>
        <div className='suggestion-container'>
          {
            list.filteredList && list.filteredList.map(item=>
              <Link key={item.id} to={`/${item.id}`} className='suggestion' onClick={clickHandler}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </Link> )
          }
          
          
          
        </div>
      </div>
      <Link to='/orders' className={`shopping_box ${(state.totalCount) && 'clickable'}`}>
        <span className='material-icons shopping_icon'>shopping_cart</span>
        <p className='shopping_counter'>{state.totalCount?state.totalCount:''}</p>
      </Link>
    </div>
  )
}

export default Navbar