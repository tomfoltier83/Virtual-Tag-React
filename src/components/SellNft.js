import React, { useState } from "react";
import { auth, db, storage } from "../utils/firebase.config";
import ImageUpload from "./ImageUpload";
import { uuidv4 } from "@firebase/util";
import { CronJob } from 'cron';
import { doc, getDoc } from "firebase/firestore";
import  emailjs  from '@emailjs/browser';

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

    const [data, setData] = useState({
        id:0,
        ownerName:"",
        name:"",
        price:0,
        image: null,
        emailAnnouncer:"",
        FBprizeOwnerId:"",
        emailprizeOwner:"",
        phantomprizeOwnerId:"",
        prizeOwnerName:"",
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

    async function sendMail(id) {
        const docRef = doc(db, "annoncesNft", id);
        const docSnap = await getDoc(docRef);
        let mailData = []

        if (docSnap.exists()) {   
            // Show data

            console.log(docSnap.data())

            // Send email

            emailjs.send('service_6zo1yg4', 'template_zuqyvtw',docSnap.data(), 'oiBL9gQupXiv0EtCT')
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
            })

            // Delete anounce
            
            db.collection("annoncesNft")
            .doc(id)
            .delete()
            for(var i in data) {
                mailData.push([i, data[i]])
            }
        } else {
            console.log("No such document!");
        }
        //console.log(mailData)
    }

    function setCronJob(uid) {
        var job = new CronJob(
            '* * * * *',
            function() {
                sendMail(uid);
            },
            null
        )
        job.start()
    }

    function handleSubmit(e) {
        e.preventDefault();
        let uid = uuidv4();
        let userEmail = auth.currentUser.email;

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
                    .doc(uid)
                    .set({
                        id:uid,
                        ownerName:auth.currentUser.displayName,
                        name: data.title,
                        price:data.price,
                        image:imageUrl,
                        emailAnnouncer: userEmail,
                        FBprizeOwnerId:"",
                        emailprizeOwner:"",
                        phantomprizeOwnerId:"",
                        prizeOwnerName:"",
                    })
                    .then(()=>{
                        setData({
                            id:0,
                            ownerName:"",
                            name:"",
                            price:0,
                            image:null,
                            emailAnnouncer:"",
                            FBprizeOwnerId: "",
                            emailprizeOwner:"",
                            phantomprizeOwnerId:"",
                            prizeOwnerName:"",
                        })
                        setCronJob(uid)
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
                    <input type="text" onChange={HandleChange} placeholder="Nom du NFT" name="title" value={data.title}/>
                    <input type="number" onChange={HandleChange} placeholder="Prix (en SOL)" name="price" value={data.price}/>
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