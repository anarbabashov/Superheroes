import React, {useState} from "react"

export default ({dispatch}) => {
    const [newHero, setNewHero] = useState({hero_name: '', first_name: '', last_name:'', favorite_food:''})
    const [isUserCreate, setIsUserCreate] = useState(false)
    const {hero_name, first_name, last_name, favorite_food} = newHero;

    const saveHero = async (data) => {
      const response = await fetch('http://localhost:3001/users/food',{method: 'POST',headers: new Headers({ "Content-Type": "application/json" }),body: JSON.stringify(data)});
      const content = await response.json();
      if (content.success) {
          setIsUserCreate(true)
          setTimeout(async ()=>{
              setIsUserCreate(false)
              setNewHero({hero_name: '', first_name: '', last_name:'', favorite_food:''})
              const response = await fetch('http://localhost:3001/users/foods');
              const jsonData = await response.json();
                var parseData = [];
                jsonData.forEach((dataItem)=>{
                  if (dataItem.id) {
                      parseData.push(dataItem)
                  } else {
                      console.log(dataItem);
                      dataItem.favorite_food.forEach((item)=>{
                          parseData.push({id: item.id, favorite_food: item.food, hero_name: dataItem.hero_name, first_name: dataItem.first_name, last_name: dataItem.last_name})
                      })
                  }
                })
              dispatch({type:'AddHeros', payload: parseData});
          }, 2000);
      }
    }

    return (
      <div className="form">
        <div className="input-field">
          <label htmlFor="hero_name">Nickname:</label>
          <input name="hero_name" value={hero_name} onChange={(e)=>setNewHero({...newHero, hero_name: e.target.value})} type="text"/>
        </div>
        <div className="input-field">
          <label htmlFor="first_name">First Name:</label>
          <input name="first_name" value={first_name} onChange={(e)=>setNewHero({...newHero, first_name: e.target.value})} type="text"/>
        </div>
        <div className="input-field">
          <label htmlFor="last_name">Last Name:</label>
          <input name="last_name" value={last_name} onChange={(e)=>setNewHero({...newHero, last_name: e.target.value})} type="text"/>
        </div>
        <div className="input-field">
          <label htmlFor="favorite_food">Favorite Food:</label>
          <input name="favorite_food" value={favorite_food} onChange={(e)=>setNewHero({...newHero, favorite_food: e.target.value})} type="text"/>
        </div>
          <button className="btn-save" disabled={isUserCreate || !(hero_name && first_name && last_name)} onClick={()=>saveHero(newHero)}> Save Hero</button>
        {isUserCreate && (<span className="alert">Created</span>)}
      </div>
    )
}
