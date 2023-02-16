import React from 'react'
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment,incrementAsync } from './counterSlice'
import { Button } from 'antd'
export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <Button
          onClick={() => dispatch(increment())}
>
          Increment
        </Button>
        <span>{count}</span>
        <Button
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <button
          onClick={() => dispatch(incrementAsync(1))}
        >
          Add Async
        </button>
      </div>
      {count.status}
    </div>
  )
}