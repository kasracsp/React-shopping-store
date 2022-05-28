import React,{useContext} from 'react'
import './Order.scss'
import { Link } from 'react-router-dom'
import { CardContext } from '../context/CardContextProvider'
import { quantityCount } from './helper/suggestion'

const Order = ({productData}) => {
  const {state,dispatch}=useContext(CardContext);
  return (
    <div className='order_container'>
      <img src={productData.image} alt="order" className='order_thumb'/>
      <div className='order_details'>
        <Link to={`/${productData.id}`} className='order_title'>{productData.title}</Link>
        <div className='order_detail'>
          <div className='order_btns'>

            <span className='material-icons remove' onClick={()=>dispatch({type:'Remove',payLoad:productData})} >delete</span>
            {quantityCount(state,productData.id) >1 && <span className='material-icons decrease' onClick={()=>dispatch({type:'Decrease',payLoad:productData})} >remove</span>}
            <p className='card_quentity'>{quantityCount(state,productData.id)}</p>
            <span className='material-icons add' onClick={()=>dispatch({type:'Increase',payLoad:productData})} >add</span>

          </div>
          <p className='order_price'>{productData.price} $</p>
        </div>
      </div>
    </div>
  )
}

export default Order