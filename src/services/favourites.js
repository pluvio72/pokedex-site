const KEY = 'saved_pokemon';

function savePokemonToFavourites(name, data) {
    const savedItems = JSON.parse(localStorage.getItem(KEY));
    if(savedItems === null){
        const newObject = {
            [name]: data
        };
        localStorage.setItem(KEY, JSON.stringify(newObject));
    } else {
        const newObject = {
            ...savedItems,
            [name]: data
        };
        localStorage.setItem(KEY, JSON.stringify(newObject));
    }
}

function removePokemonFromFavourites(name) {
    const savedItems = JSON.parse(localStorage.getItem(KEY));
    if(savedItems === null) return false;
    else {
        if(Object.keys(savedItems).includes(name)){
            const newObject = {...savedItems};
            delete newObject[name];
            console.log("DELETED FAVOURITE, New object:", newObject);
            localStorage.setItem(KEY, JSON.stringify(newObject));
        }
    }
}

function getFavourites() {
    const savedItems = localStorage.getItem(KEY);
    if(savedItems === null) return {};
    return JSON.parse(savedItems);
}

export {
    getFavourites,
    removePokemonFromFavourites,
    savePokemonToFavourites
}