import React, { useState } from "react";
import { db, auth } from "../utils/firebase.config"

// const [editPrice, setEditPrice] = useState(false)

class Anounces extends React.Component {
    state = { 
        anounces: null
    }

    componentDidMount() {
        console.log('mounted');
        db.collection('annoncesNft')
            .get()
            .then( snapshot => {
                const anounces = []
                snapshot.forEach( doc => {
                    const data = doc.data()
                    anounces.push(data)
                })
                this.setState({ anounces: anounces })
                // console.log(snapshot)
            })
            .catch (error => console.log(error))
    }

    render() {
        return (
            <div className="nft-anounces">
                {
                    this.state.anounces && 
                    this.state.anounces.map( anounce => {
                        return (
                            <div className="nft-anounce">
                                <img src={anounce.image} className="anounce-image" />
                                <div className="anounce-separation"></div>
                                <h1>{anounce.name}</h1>
                                <p>Enchère actuelle :</p>
                                <h3>{anounce.price} SOL</h3>
                                <form action="">
                                    <input type="text" placeholder="Surenchérir"/>
                                    <input type="submit" value="Placer l'enchère"/>
                                </form>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    

};

export default Anounces;