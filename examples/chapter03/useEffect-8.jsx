const MyReact = (function () {
    const global = {}
    let index = 0

    function useEffect(callback, dependencies) {
        const hooks = global.hooks

        // 이전 훅 정보가 있는지 확인한다.
        let previousDependencies = hooks[index]

        // 변경되었는지 확인
        // 이전 값이 있다면 이전 값을 얕은 비교로 비교해 변경이 일어났는지 확인한다.
        // 이전 값이 없다면 최초 실행이므로 변경이 일어난 것으로 간주해 실행을 유도한다.
        let isDependenciesChanged = previousDependencies ? dependencies.some(
            (value, index) => !Object.is(value, previousDependencies[idx])
        ) : true

        // 변경이 일어났다면 첫번째 인수인 콜백 함수를 실행
        if (isDependenciesChanged) {
            callback()
        }

        // 현재 의존성을 훅에 다시 저장
        hooks[index] = dependencies

        // 다음 훅이 일어날 때를 대비하기 위해 index를 추가
        index++
    }

    return {
        useEffect
    }
})()