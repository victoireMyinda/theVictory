import React, { useState } from 'react'
import App from "./App"

export const UserProfilContext = React.createContext();

const ProfilContext = () => {

    const [userConnected, setUserConnected] = useState(null);

    return (
        <UserProfilContext.Provider value={{ setUserConnected, userConnected }}>
            <App />
        </UserProfilContext.Provider>
    )
}

export default ProfilContext