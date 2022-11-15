import { useState } from 'react';

export const GET_POKEMONS = "GET_POKEMONS";
const [offset, setOffset] = useState(10);

export const getPokemons = async () => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    };
    await fetch(
        `https://pokeapi.co/api/v2/ability/?limit=10&offset=` + offset,
        options,
    ).then(response => {
        response.json().then(res => {
            dispatch({
                type: 'GET_POKEMONS',
                field: res,
            });
            setOffset(offset + 10)
        });
    });
};


export default offset;