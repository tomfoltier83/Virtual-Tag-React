import React, { useState } from "react";
import { db, storage } from "../utils/firebase.config";
import ImageUpload from "./ImageUpload";

const SellNft = () => {

    const [data, setData]=useState({
        name:"",
        price:"",
        image: null
    });

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
                    .doc("annonce")
                    .set({
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
                <form className="form-login" onSubmit={handleSubmit}>
                    <h2>Quel NFT souhaitez-vous vendre ?</h2>
                    {/* <input type="file"/> */}
                    <input type="text" onChange={HandleChange} placeholder="Prix" name="price" value={data.price}/>
                    <ImageUpload setData={setData}/>
                    <input type="submit" value="Déposer"/>
                </form>
            </div>
        </div>
    );
};

export default SellNft;