/**
 * 
 * @returns 버튼 클릭시 counter가 1씩 중가
 */
function Component() {
    const [counter, setCounter] = useState(0);

    function handleClick() {
        setCounter((prev) => prev + 1);
    }

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    )
}