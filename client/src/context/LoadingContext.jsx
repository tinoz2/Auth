import { createContext, useState, useContext } from 'react'

const AppContext = createContext();

export const useLoading = () => useContext(AppContext);

const LoadingContext = ({ children }) => {

    const [loading, setLoading] = useState(true)

    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)

    return (
        <AppContext.Provider value={{ loading, startLoading, stopLoading }}>
            {children}
        </AppContext.Provider>
    )
}

export default LoadingContext