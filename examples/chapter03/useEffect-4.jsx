function Component() {
    const counter = 1;;
    
    useEffect(() => {
        console.log(counter)
    })

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    )
}