import {createContext, useContext, useEffect, useState} from "react";

const StateContext = createContext({
    user : null,
    token : null,
    setUser : () =>{},
    setToken : () =>{}
})

export const ContextProvider = ({children}) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')) || null);

    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    useEffect(() => {
        if (user) {
            localStorage.setItem('USER', JSON.stringify(user));
        } else {
            localStorage.removeItem('USER');
        }
    }, [user]);
    const setToken = (token) =>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>{children}</StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext)