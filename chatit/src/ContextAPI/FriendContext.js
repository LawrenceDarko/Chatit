import { createContext, useEffect, useState, useContext } from "react";

const FriendIdContext = createContext();

export function FriendIdProvider ({children}) {

    const [friendId, setFriendId] = useState(null)

    return(
        <FriendIdContext.Provider value={{friendId, setFriendId }}>
            {children}
        </FriendIdContext.Provider>
    );
}

export default FriendIdContext;