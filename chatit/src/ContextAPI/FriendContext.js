import { createContext, useState } from "react";

const FriendIdContext = createContext();

export function FriendIdProvider ({children}) {

    const [friendId, setFriendId] = useState(null)
    const [friendName, setFriendName] = useState(null)

    return(
        <FriendIdContext.Provider value={{friendId, setFriendId, setFriendName, friendName }}>
            {children}
        </FriendIdContext.Provider>
    );
}

export default FriendIdContext;