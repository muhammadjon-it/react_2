import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../redux/store'
import { decrement, increment } from '../redux/counter'

const Home = () => {
  const {value} = useSelector((store:AppStore)=>store.counter)
  const dispatch = useDispatch()
    return (
    <div>
        <button onClick={()=>dispatch(decrement())}>-</button>
        <h1>{value}</h1>
        <button onClick={()=>dispatch(increment())}>+</button>
    </div>
  )
}

export default Home