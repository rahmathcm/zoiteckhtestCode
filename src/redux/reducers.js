import React from 'react';

const initialState = {
    pokemons: [],
};

 function pageReducer (prevState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...prevState,
                pokemons: action.field,
            };
        default:
            break;
    }
};
const [pageState, dispatch] = React.useReducer(pageReducer, initialState);

export default pageReducer;