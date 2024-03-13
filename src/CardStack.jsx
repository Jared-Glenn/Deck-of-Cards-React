import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import axios from "axios";

const CardStack = () => {
    const [ deckId, setDeckId ] useState(null);
    const [ cardList, setCardList ] = useState(null);

    useEffect(function fetchShuffleOnline() {
        async function fetchShuffle() {
            const deckRes = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            
            setDeckId(deckId => deckRes.data["deck_id"]);
        }
    }

    return (
        <>
            <button onClick={ addCard }>Draw A Card!</button>
            <button onClick={ reshuffle }>Reshuffle!</button>
            <div className='cardArea'>

            </div>
        </>
    )
};

export default CardStack;