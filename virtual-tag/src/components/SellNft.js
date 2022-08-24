import React, { useState } from "react";
import { db, storage } from "../utils/firebase.config";
import ImageUpload from "./ImageUpload";



/// Connection to Phantom wallet

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




const SellNft = () => {

    const [data, setData]=useState({
        name:"",
        title:"",
        price:"",
        image: null
    });
    const [wallet, setWallet] = useState(false);

    const handleConnect = async () => {
        getProvider();
        try {
          const resp = await provider.connect();
          console.log(resp.publicKey.toString());
          if (resp) {
            setWallet(true);
          } else {
            return
          }
        } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
        }
      }

    function HandleChange(e) {
        e.preventDefault();
        const {name,value}=e.target;
        setData((prev)=>{
            return {...prev, [name]:value};
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // db.collection("annoncesNft")
        //     .add({
        //         nft: nft,
        //         price: price,
        //     })
        //     .then(() => {
        //         alert("Votre annonce a bien été postée ✔️");
        //     })
        //     .catch(error => {
        //         alert(error.message);
        //     });

        const uploadTask = storage.ref("Annonce/"+data.image.name).put(data.image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                let progress;
                progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(progress);
            },
            (err)=>{
                console.log(err);
            },
            ()=>{
                storage.ref("Annonce")
                .child(data.image.name)
                .getDownloadURL()
                .then((imageUrl)=>{
                    db.collection("annoncesNft")
                    .doc(data.title)
                    .set({
                        name: data.title,
                        price:data.price,
                        image:imageUrl
                    })
                    .then(()=>{
                        setData({
                            name:"",
                            price:"",
                            image:null
                        })
                    })
                })
            }
        )
    }

    return (
        <div className="login-container">
            <div className="login">
             { wallet ? (
                <form className="form-login" onSubmit={handleSubmit}>
                    <h2>Quel NFT souhaitez-vous vendre ?</h2>
                    {/* <input type="file"/> */}
                    <input type="text" onChange={HandleChange} placeholder="Nom du NFT" name="title" value={data.title}/>
                    <input type="text" onChange={HandleChange} placeholder="Prix (en SOL)" name="price" value={data.price}/>
                    <ImageUpload setData={setData}/>
                    <input type="submit" value="Déposer"/>
                </form>
             ) : (
                <button className="wallet__connexion" onClick={() => handleConnect()}>Connexion à Phantom Wallet</button>
             )}
            </div>
        </div>
    );
};

export default SellNft;