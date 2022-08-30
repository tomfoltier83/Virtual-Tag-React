import React, { useState, useEffect } from "react";
import ConnectModal from "./components/ConnectModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase.config";
import BoardModal from "./components/BoardModal";
import Anounce from "./components/Anounce";
import { db } from "./utils/firebase.config";
import { CronJob } from "cron";

const App = () => {

  const [user, setUser] = useState(null)
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  var job = new CronJob(
    '* * * * * *',
    function() {
      console.log('You will see this message every second');
    },
    null,
    true,
  )

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  }); 

  const handleLogOut = async () => {
    await signOut(auth);
  }

  function getData() {
      db.collection("annoncesNft").onSnapshot((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
              items.push(doc.data())
          })
          setData(items)
          setLoader(false)
      })
  }

  useEffect(() => {
      getData()
  }, [])

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
      <h1 className="main-title">Dernières annonces :</h1>
      <div className="nft-anounces">
            {loader === false && (data.map((dev) => (
              <Anounce dev={dev}/>
            )))}
        </div>
    </div>
  );
}

export default App;