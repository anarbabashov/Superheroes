import React, {Fragment, useReducer} from "react"

import SEO from "../components/seo"
import HeroList from "../components/hero-list"
import AddHero from "../components/add-hero"


const initialState = {heroes: []};

function reducer(state, action) {
  switch (action.type) {
    case 'AddHeros':
      return {heroes: action.payload};
    default:
      return {...state};
  }
}

const IndexPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
      <Fragment>
        <main>
          <h2>Superheroes</h2>
          <AddHero dispatch={dispatch}/>
          <HeroList  dispatch={dispatch} state={state}/>
        </main>
      </Fragment>
)}

export default IndexPage
