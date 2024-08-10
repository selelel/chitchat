// function useThunk (thunk:any) {
//   const [isLoading, setIsLoading] = useState<Boolean>(false)
//   const [error, setError] = useState<null | any>(null)
//   const dispatch = useDispatch() 

//   const runThunk = useCallback(() => {
//     setIsLoading(true)
//     dispatch(thunk())
//     .unwrap()
//     .catch(( error: any) => setError(error))
//     .finally(() => setIsLoading(false))
//   }, [dispatch, thunk])

//   return [runThunk, isLoading, error]
// } 