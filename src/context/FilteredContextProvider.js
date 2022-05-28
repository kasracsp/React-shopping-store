import React,{useReducer} from 'react'

export const FilteredContext=React.createContext()

const initialState={
  sort:'',
  categorySort:[],
  ratingSort:0,
}

const reducer=(state,action)=>{
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return{
        ...state,
        sort:action.payload,
      }
    case 'SORT_BY_CATEGORY':
      const indexS=state.categorySort.indexOf(action.payload)
      if(indexS===-1){
        state.categorySort.push(action.payload)
      }else{
        state.categorySort.splice(indexS,1)
      }
      return{
        ...state,
        categorySort:[...state.categorySort]
      }
    case 'SORT_BY_RATING':
      return{
        ...state,
        ratingSort:action.payload,
      }
    case 'CLEAR':
      return{
        sort:'',
        categorySort:[],
        ratingSort:0,
      }
    default:
      return state
  }
}

const FilteredContextProvider = ({children}) => {

  const [filterState,filterDispatch]=useReducer(reducer,initialState)

  return (
    <FilteredContext.Provider value={{filterState,filterDispatch}}>
      {children}
    </FilteredContext.Provider>
  )
}

export default FilteredContextProvider