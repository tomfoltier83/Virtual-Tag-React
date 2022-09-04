import React, { useState } from "react";
import MyNft from "./MyNft";
import SellNft from "./SellNft";


const BoardModal = async () => {
    const [sell, setSell] = useState(true);


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
          if (resp) {
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
        }
        console.log(resp.publicKey.toString());
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
    } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
        return(
          <h1>Error</h1>
        )
    }
};

export default BoardModal;