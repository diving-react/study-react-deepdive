function Component({
    log
}: {
    log: string
}){
    useEffect(() => {
        logging(log)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
}