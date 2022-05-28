import React,{useReducer,createContext} from 'react'
export const CardContext=createContext()


const initialState={
  selectedItems:[],
  totalPrice:0,
  totalCount:0,
  checkout:false
}

const sumItems=data=>{
  const totalCount=data.reduce((sum,item)=> sum + item.quantity ,0);
  let totalPrice=data.reduce((sum,item)=> sum + item.quantity * item.price ,0).toFixed(2);
  return {totalCount,totalPrice}
}

const reducer=(state,action)=>{
  switch(action.type){
    case 'Add':
      if(!state.selectedItems.find(item=>item.id===action.payLoad.id)){
        state.selectedItems.push({
          ...action.payLoad,
          quantity:1
        })
      }
      return{
        ...state,
        selectedItems:[...state.selectedItems],
        ...sumItems(state.selectedItems)
      }
    case 'Remove':
      const newSelectedItems=state.selectedItems.filter(item=>item.id !== action.payLoad.id)
      return{
        ...state,
        selectedItems:[...newSelectedItems],
        ...sumItems(newSelectedItems),
        checkout:false
      }
    case 'Increase':
      const indexI=state.selectedItems.findIndex(item=>item.id===action.payLoad.id)
      state.selectedItems[indexI].quantity++;
      return{
        ...state,
        ...sumItems(state.selectedItems)
      }
    case 'Decrease':
      const indexD=state.selectedItems.findIndex(item=>item.id===action.payLoad.id)
      state.selectedItems[indexD].quantity--;
      return{
        ...state,
        ...sumItems(state.selectedItems),
      }
    case 'Checkout':
      return{
        selectedItems:[],
        totalPrice:0,
        totalCount:0,
        checkout:true
      }
    case 'Clear':
      return{
        selectedItems:[],
        totalPrice:0,
        totalCount:0,
        checkout:false
      }
      default:
        return state
  }
}

const CardContextProvider = ({children}) => {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <CardContext.Provider value={{state,dispatch}}>
      {children}
    </CardContext.Provider>
  )
}

export default CardContextProvider