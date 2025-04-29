import { useCounter } from './Usecounter';

export default function CounterComponent() {

    const { count,  decrement, increment, reset } = useCounter();

    return (
        <>
        <h1>count:{count}</h1>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>

        <button onClick={reset}>reset</button>
        </>
    )
};