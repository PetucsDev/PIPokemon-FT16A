export const getTypes = () => async(dispatch) => {
    const res = await fetch("http://localhost:3001/types");
    const data = await res.json();

    dispatch({
        type: "GET_TYPE",
        payload: data
    });
};

export const getPokemons = () => async (dispatch) => {
    const res = await fetch("http://localhost:3001/pokemons");
    const data = await res.json();

    dispatch({
        type: "GET_POKEMONS",
        payload: data
    });
};


export const getName = (name) => async (dispatch) =>{
    const res = await fetch(`http://localhost:3001pokemons?name=${name}`);
    const data = await res.json();

    dispatch({
        type: "GET_NAME",
        payload: data
    });
};

export const filters = (num) => async (dispatch) => {
    const res = await fetch(`http://localhost:3001/pokemons?by${num}`);
    const data = await res.json();

    dispatch({
        type: "FILTER",
        payload: data
    });
};

export const order = (order) => (dispatch) => {
    dispatch({
        type: "ORDER",
        payload: order
    });
};

export const add = (pokemon) => (dispatch) => {
    dispatch({
        type: "ADD",
        payload: pokemon
    });
};

export const type = (type) => (dispatch) => {
    dispatch({
        type: "BY_TYPE",
        payload: type
    });
};


