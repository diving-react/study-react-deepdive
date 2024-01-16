useEffect(() => {
    function logActiveUser() {
        logging(user.id)
    }
}, [user.id])