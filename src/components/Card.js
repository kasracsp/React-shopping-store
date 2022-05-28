import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'

import { CardContext } from '../context/CardContextProvider'
import { isInCard, quantityCount } from './helper/suggestion'

const Card = ({productData}) => {
  const {state,dispatch}=useContext(CardContext)

  return (
    <div className='card_container'>
      <img src={productData.image} alt="product" className='card_image'/>
      <p className='card_title'>{productData.title}</p>
      <p className='card_price'>{productData.price} $</p>
      <div>
        <span>{productData.rating.rate}</span>
        <span className='material-icons' style={{color:'gold'}}>star</span>
      </div>
      <div className='card_details'>
        <Link to={`/${productData.id}`} className='card_info'>Details...</Link>
        <div className='card_btns'>
          {quantityCount(state,productData.id) === 1 && <span className='material-icons remove' onClick={()=>dispatch({type:'Remove',payLoad:productData})}>delete</span>
          }
          {quantityCount(state,productData.id) > 1 && <span className='material-icons remove' onClick={()=>dispatch({type:'Decrease',payLoad:productData})}>remove</span>
          }
          {quantityCount(state,productData.id) >= 1 &&<p className='card_quentity'>{quantityCount(state,productData.id)}</p>}
          {isInCard(state,productData.id)?
          <span className='material-icons add' onClick={()=>dispatch({type:'Increase',payLoad:productData})}>add</span>:
          <button className='first_add' onClick={()=>dispatch({type:'Add',payLoad:productData})}>add to card</button>
          }  
        </div>
      </div>
    </div>
  )
}

export default Card