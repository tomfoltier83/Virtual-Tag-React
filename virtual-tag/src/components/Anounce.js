// import React from "react";
// import { db } from "../utils/firebase.config"
// import EditEnchere from "./EditEnchere";

// // const [editPrice, setEditPrice] = useState(false)

// class Anounces extends React.Component {
//     state = { 
//         anounces: null
//     }

//     componentDidMount() {
//         console.log('mounted');
//         db.collection('annoncesNft')
//             .get()
//             .then( snapshot => {
//                 const anounces = []
//                 snapshot.forEach( doc => {
//                     const data = doc.data()
//                     anounces.push(data)
//                 })
//                 this.setState({ anounces: anounces })
//                 // console.log(snapshot)
//             })
//             .catch (error => console.log(error))
//     }

//     render() {
//         return (
//             <div className="nft-anounces">
//                 {
//                     this.state.anounces && 
//                     this.state.anounces.map( anounce => {
//                         return (
//                             <div className="nft-anounce" key={anounce.name}>
//                                 <img src={anounce.image} className="anounce-image" />
//                                 <div className="anounce-separation"></div>
//                                 <h1>{anounce.name}</h1>
//                                 <p>Enchère actuelle :</p>
//                                 <h3>{anounce.price} SOL</h3>
//                                 <EditEnchere/>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         )
//     }
    

// };

// export default Anounces;

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