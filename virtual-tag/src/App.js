import React, { useState, useEffect } from "react";
import ConnectModal from "./components/ConnectModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase.config";
import BoardModal from "./components/BoardModal";
import Anounces from "./components/Anounces";

const App = () => {

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  }); 

  const handleLogOut = async () => {
    await signOut(auth);
  }

  return (
    <div> 
      <div className="app-header">
        {user && (
          <div className="user-infos">
            <span>{user?.displayName[0]}</span>
            <h4>{user?.displayName}</h4>
            <button onClick={() => handleLogOut()}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
          </div>
        )}
        {user ? <BoardModal /> : <ConnectModal />}
      </div>
      <div className="sells-container">
        <Anounces/>
      </div>
    </div>
  );
}

export default App;