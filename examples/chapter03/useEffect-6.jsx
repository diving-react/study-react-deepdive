// 최초 실행
useEffect(() => {
    function addMouseEvent() {
        console.log(1);
    }

    window.addEventListener('click', addMouseEvent)

    // clean-up 함수
    return () => {
        console.log('clean-up 함수 실행', 1);
        window.removeEventListener('click', addMouseEvent)
    }
}, [counter])

// 이후 실행
useEffect(() => {
    function addMouseEvent() {
        console.log(2);
    }

    window.addEventListener('click', addMouseEvent)

    // clean-up 함수
    return () => {
        console.log('clean-up 함수 실행', 2);
        window.removeEventListener('click', addMouseEvent)
    }
}, [counter])

