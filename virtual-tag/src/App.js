import React, { useState, useEffect } from "react";
import ConnectModal from "./components/ConnectModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase.config";
import BoardModal from "./components/BoardModal";


  /// Connection to Phantom wallet

const isPhantomInstalled = window.phantom?.solana?.isPhantom;

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
};

const provider = getProvider(); // see "Detecting the Provider"

try {
    const resp = await provider.connect();
    console.log(resp.publicKey.toString());
    // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
} catch (err) {
    // { code: 4001, message: 'User rejected the request.' }
}


useEffect(() => {
  if (!provider) return;
  // Will either automatically connect to Phantom, or do nothing.
  provider.connect({ onlyIfTrusted: true }).catch(() => {});
});

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
      <div className="sells-container"></div>
    </div>
  );
};

export default App;