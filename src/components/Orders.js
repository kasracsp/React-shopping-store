import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Order from './Order'
import './Orders.scss'
import { CardContext } from '../context/CardContextProvider'
import { FilteredContext } from '../context/FilteredContextProvider'

const Orders = () => {
  const navigate=useNavigate()
  const {state,dispatch}=useContext(CardContext)
  const {filterDispatch}=useContext(FilteredContext)

  const goToLandingPage=()=>{
    navigate('/',{replace:true})
  }

  const checkoutHandler=()=>{
    filterDispatch({type:'CLEAR'})
    dispatch({type:'Checkout'})
  }
  const clearHandler=()=>{
    filterDispatch({type:'CLEAR'})
    dispatch({type:'Clear'})
  }

  return (
    <div className='order_wrapper'>
      {(state.totalCount>0) &&
      state.selectedItems.map(item=><Order key={item.id} productData={item}/>)
      }

      {(state.checkout && state.totalCount===0) &&
        <div className='empty'>
          <h1 className='empty_message'>You checked Succesfully</h1>
          <button onClick={goToLandingPage} className='backToHome'>Buy More</button>
        </div>
      }
      {(!state.checkout && state.totalCount===0) &&
        <div className='empty'>
          <h1 className='empty_message'>Your basket is empty</h1>
          <button onClick={goToLandingPage} className='backToHome'>Back to Home</button>
        </div>
      }
      {(state.totalCount>0)?
      <div className='total-wrapper'>
        <h1 className='total'>Total: {state.totalPrice} $</h1>
      <div className='check'>
        <button onClick={clearHandler} className='clear'>Clear All</button>
        <button onClick={checkoutHandler} className='checkout'>Checkout</button>
        
      </div>
      </div>
      :''}
    </div>
  )
}

export default Orders