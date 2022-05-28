import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../context/DataContextProvider'
import { CardContext } from '../context/CardContextProvider'
import { isInCard, quantityCount } from './helper/suggestion'
import './Product.scss'

const Product = () => {
  const dataState=useContext(DataContext)
  const {state,dispatch}=useContext(CardContext)
  const param=useParams()

  const indexFound=dataState.data.findIndex(item=>item.id===Number(param.item))

  if(indexFound>-1){

    return (
      <div className='item_wrapper'>
        <div className='item_container'>
          <img src={dataState.data[indexFound].image} alt={dataState.data[indexFound].title}  className='item_thumb'/>
          <div className='item_details'>
            <p className='item_title'>{dataState.data[indexFound].title}</p>
            <p className='item_description'><span>Details:</span>  {dataState.data[indexFound].description}</p>

          <div className='card_btns'>
            {quantityCount(state,Number(param.item)) === 1 && <span className='material-icons remove' onClick={()=>dispatch({type:'Remove',payLoad:dataState.data[indexFound]})}>delete</span>
            }
            {quantityCount(state,Number(param.item)) > 1 && <span className='material-icons remove' onClick={()=>dispatch({type:'Decrease',payLoad:dataState.data[indexFound]})}>remove</span>
            }
            {quantityCount(state,Number(param.item)) >= 1 &&<p className='card_quentity'>{quantityCount(state,Number(param.item))}</p>}
            {isInCard(state,Number(param.item))?
            <span className='material-icons add' onClick={()=>dispatch({type:'Increase',payLoad:dataState.data[indexFound]})}>add</span>:
            <button className='first_add' onClick={()=>dispatch({type:'Add',payLoad:dataState.data[indexFound]})}>add to card</button>
            }
          </div>
                  
            <p className='item_category'>{dataState.data[indexFound].category}</p>
          </div>
          <p className='item_rate'>{dataState.data[indexFound].rating.rate}</p>
        </div>
      </div>
    )
  }

  
}

export default Product