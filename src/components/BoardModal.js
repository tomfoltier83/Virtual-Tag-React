import React, { useState } from "react";
import MyNft from "./MyNft";
import SellNft from "./SellNft";
//oui


const BoardModal = () => {
    const [sell, setSell] = useState(true);
    return(
        <div className="connect-modal">
            <div className="header-btn">
                <button
                style={{background:sell ? "rgb(28,28,28)" : "rgb(83,83,83)"}}
                onClick={() => setSell(true)}
                >
                    Mes NFT's
                </button>
                <button
                style={{background:sell ? "rgb(83,83,83)" : "rgb(28,28,28)"}}
                onClick={() => setSell(false)}
                >
                    Vendre
                </button>
            </div>
            {sell ? <MyNft /> : <SellNft/>}
        </div>
    );
};

export default BoardModal;