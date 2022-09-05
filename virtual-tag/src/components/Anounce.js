import React from "react";
import { useState } from "react";
import EditEnchere from "./EditEnchere";


const Anounce = ({dev}) => {

    const [editBox, setEditBox] = useState(false)

    return (
        <div className="nft-anounce" key={dev.id}>
            <img src={dev.image} className="anounce-image" />
            <div className="anounce-separation"></div>
            <h1>{dev.name}</h1>
            <p>Enchère actuelle :</p>
            <h3>{dev.price} SOL</h3>
            {editBox === false && <button onClick={() => setEditBox(true)} className="wallet__connexion">Surenchérir</button>}
            {editBox === true && <EditEnchere dev={dev} setEditBox={setEditBox}/>}
        </div>
    );
};

export default Anounce;