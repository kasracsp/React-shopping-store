import React,{useReducer,useEffect} from 'react'
import api from '../service/api'

export const DataContext=React.createContext()

const initialState={
  isLoading:true,
  data:[],
  error:false
}

const reducer=(state,action)=>{
  switch(action.type){
    case 'Succes':
      return {
        isLoading:false,
        data:action.payLoad,
        error:false,
      }
    default:
      return {
        isLoading:false,
        data:[],
        error:true,
      }
  }
}

const DataContextProvider = ({children}) => {
  const [state,dispatch]=useReducer(reducer,initialState)

  useEffect(()=>{
    const fetchApi=async ()=>{
      dispatch({type:'Succes',payLoad:await api()})
    }
    fetchApi()
  },[])

  return (
    <DataContext.Provider value={state}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider