import React, {useEffect, useState} from "react"
import './heroes.css'

export default ({state, dispatch}) => {
    const [delHeroId, setDelHeroId] = useState(false)

    const saveHeroesToStore = async () => {
      const response = await fetch('http://localhost:3001/users/foods');
      const jsonData = await response.json();
      var parseData = [];
      jsonData.forEach((dataItem)=>{
        if (dataItem.id) {
            parseData.push(dataItem)
        } else {
            dataItem.favorite_food.forEach((item) => {
                parseData.push({
                  id: item.id,
                  favorite_food: item.food,
                  hero_name: dataItem.hero_name,
                  first_name: dataItem.first_name,
                  last_name: dataItem.last_name
                })
            })
        }
      })
      dispatch({type:'AddHeros', payload: parseData});
    }

    const delHero = async (id) => {
      const response = await fetch('http://localhost:3001/users/food',{method: 'DELETE',headers: new Headers({ "Content-Type": "application/json" }),body: JSON.stringify({id})});
      const jsonData = await response.json();
      if (jsonData.success) {
          setDelHeroId(jsonData.id)
          setTimeout(async () => {
              saveHeroesToStore()
              setDelHeroId()
          }, 1000)
      }
    }

    useEffect(()=>{
         saveHeroesToStore()
    }, [])

    return (<ul className="com-hero-list">
      {state.heroes.map((item, index) =>
        <li key={index}>
          <div className="nickname">{item.hero_name}</div>
          Actor: <div>{item.first_name} {item.last_name}</div>
          Food: <div>{item.favorite_food}</div>
        <button className="delete" onClick={()=>delHero(item.id)}>delete</button>  {(delHeroId === item.id) && <span className="alert">Deleted</span>}
        </li>)}
      </ul>)
}
