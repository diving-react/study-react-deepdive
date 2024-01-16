// 1
function Component() {
    console.log('렌더링 됨');
}

// 2
function Component() {
    useEffect(() => {
        console.log('렌더링 됨');
    })
}
