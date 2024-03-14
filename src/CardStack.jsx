import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import axios from "axios";

const CardStack = () => {
    const [ deckId, setDeckId ] = useState(null);
    const [numDecks, setNumDecks] = useState(0);
    const [ cardList, setCardList ] = useState([]);

    useEffect(function fetchShuffleOnline() {
        async function fetchShuffle() {
            const deckRes = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
            
            setDeckId(deckId => deckRes.data["deck_id"]);
            setCardList(list => [])
        }
        fetchShuffle();
    }, [numDecks]);

    async function reshuffle() {
        setNumDecks(n => n+1);
    };

    async function addCard() {
        const cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
        const newCard = {
            "value": cardRes.data.cards[0].value,
            "suit": cardRes.data.cards[0].suit,
            "image": cardRes.data.cards[0].image
        };
        setCardList(list => [ ...list, newCard ])
    };

    return (
        <>
            <button onClick={ addCard }>Draw A Card!</button>
            <button onClick={ reshuffle }>Reshuffle!</button>
            <div className='cardArea'>
                {cardList.map(card => (
                    <Card value={card.value} suit={card.suit} image={card.image} />
                ))}
            </div>
        </>
    )
};

export default CardStack;