const filterData = (data,state) => {
  let filteredData=data
  if(state.categorySort.length){
    const catList=[]
    state.categorySort.forEach(cate=>{
      const filterCat=filteredData.filter(item=>item.category===cate)
      catList.push(...filterCat)
    })
    filteredData=catList
  }
  if(state.ratingSort){
    const rateList=filteredData.filter(item=>item.rating.rate>=state.ratingSort)
    filteredData=rateList
  }

  if(state.sort==='Ascending'){
    filteredData=filteredData.sort((a,b)=>{
      return a.price-b.price
    })
    return filteredData
  }else if(state.sort==='Descending'){
    filteredData=filteredData.sort((a,b)=>{
      return b.price-a.price
    })
    return filteredData
  }else if(state.sort==='ByRate'){
    filteredData=filteredData.sort((a,b)=>{
      return b.rating.rate-a.rating.rate
    })
    return filteredData
  }else{
    filteredData=filteredData.sort((a,b)=>{
      return a.id-b.id
    })
    return filteredData
  }

}

export {filterData}