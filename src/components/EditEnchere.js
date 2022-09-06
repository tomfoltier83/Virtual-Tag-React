import React from "react";
import { useState } from "react";
import { auth, db } from "../utils/firebase.config";


const EditEnchere = ({dev, setEditBox}) => {

    const [price, setPrice] = useState();
    const [FBprizeOwnerId, setFBPrizeOwnerId] = useState();
    const [phantomprizeOwnerId, setPhantomprizeOwnerId] = useState();
    const [emailprizeOwnerId, setEmailprizeOwnerId] = useState();
    const [prizeOwnerName, setprizeOwnerName] = useState();

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
    
    async function changePrice(newPrice) {
    
        getProvider();
        try {
          const resp = await provider.connect();
          const publicKey = resp.publicKey.toString();
    
          if (newPrice === null || 0) {
            setPrice(dev.price)
          } else if(newPrice > dev.price) {
            setPrice(newPrice)
            setFBPrizeOwnerId(auth.currentUser.uid)
            setEmailprizeOwnerId(auth.currentUser.email)
            setPhantomprizeOwnerId(publicKey)
            setprizeOwnerName(auth.currentUser.displayName)
          }else{
            setPrice(dev.price)
          }
    
        } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
        }
    }

    function editDoc(updatedDoc){
        db.collection("annoncesNft")
        .doc(updatedDoc.id)
        .update(updatedDoc)
        .catch((err) => {
            alert(err)
            console.error(err);
        })
    }

    

    return(
        <div>
            <form>
                <input type="number" placeholder="Surenchérir" onChange={(e) => changePrice(e.target.value)}/>
                <button onClick={() => {
                    setEditBox(false)
                    editDoc({price: price, FBprizeOwnerId: FBprizeOwnerId, id: dev.id, emailprizeOwner: emailprizeOwnerId, phantomprizeOwnerId: phantomprizeOwnerId, prizeOwnerName: prizeOwnerName})
                    }} className="wallet__connexion">Placer l'enchère</button>
            </form>
        </div>
    );
};

export default EditEnchere;