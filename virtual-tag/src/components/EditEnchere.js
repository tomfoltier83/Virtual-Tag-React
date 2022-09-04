import React from "react";
import { useState } from "react";
import { auth, db } from "../utils/firebase.config";


const EditEnchere = ({dev, setEditBox}) => {

    const [price, setPrice] = useState();
    const [prizeOwner, setPrizeOwner] = useState();

    function editDoc(updatedDoc){
        db.collection("annoncesNft")
        .doc(updatedDoc.id)
        .update(updatedDoc)
        .catch((err) => {
            alert(err)
            console.error(err);
        })
    }

    function changePrice(newPrice) {
        if (newPrice === null || 0) {
            setPrice(dev.price)
        }
        else if(newPrice > dev.price) {
            setPrice(newPrice)
            setPrizeOwner(auth.currentUser.uid)
        }else{
            setPrice(dev.price)
        }
    }

    return(
        <div>
            <form>
                <input type="number" placeholder="Surenchérir" onChange={(e) => changePrice(e.target.value)}/>
                <button onClick={() => {
                    setEditBox(false)
                    editDoc({price: price,prizeOwner: prizeOwner,id: dev.id})
                    }} className="wallet__connexion">Placer l'enchère</button>
            </form>
        </div>
    );
};

export default EditEnchere;