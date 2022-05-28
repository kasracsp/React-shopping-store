const suggestion=(data,key)=>{
  let newList=[]
  if(key.trim()){
    newList=data.filter(item=>{
      const indexFound=item.title.toLowerCase().indexOf(key.toLowerCase())
      if(indexFound>-1) {
        return item
      }else{
        return false
      }
    })
  }
  return newList
}

const isInCard=(state,id)=>{
  const result=!!state.selectedItems.find(item=>item.id===id)
  return result
}

const quantityCount=(state,id)=>{
  const index=state.selectedItems.findIndex(item=>item.id===id)
  if(index>-1){
    const result=state.selectedItems[index].quantity
    return result
  }else{
    return false
  }
}

const categoryItems=(data)=>{
  const categoryList=data.data.map(item=> item.category)
  const categoryListFilter=categoryList.filter((item,index)=> categoryList.indexOf(item)===index)
  return categoryListFilter
}

const isInFilter=(state,key)=>{
  const result=!!state.find(item=>item===key)
  return result
}

export {suggestion,isInCard,quantityCount,categoryItems,isInFilter}