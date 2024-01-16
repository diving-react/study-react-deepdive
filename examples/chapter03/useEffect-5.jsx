import { useState, useEffect } from 'react';

export default function App() {
    const [counter, setCounter] = useState(0);

    function handleClick() {
        setCounter((prev) => prev + 1)
    }

    useEffect(() => {
        function addMouseEvent() {
            console.log(counter);
        }
        
        window.addEventListener('click', addMouseEvent)

        // clean-up
        return () => {
            console.log('clean-up 함수 실행', counter);
            window.removeEventListener('click', addMouseEvent)
        }
    }, [counter])

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    )
    
}

/**
 * @return clean-up 함수를 사용하여 이벤트 리스너를 제거
 * clean-up 함수 실행: 0
 * 1
 * clean-up 함수 실행: 1
 * 2
 */