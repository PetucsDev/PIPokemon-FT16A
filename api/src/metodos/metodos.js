const fetch = require("node-fetch");
const {Pokemon, Tipo} = require("../db.js");

const getAll = async () =>{
    const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10"); 
    const data = await api.json();
    
    const db = await Pokemon.findAll({include: Tipo});

    var base = [...db,...data.results];


    var infoPokemon = [];
                                                    
    for (let i = 0; i < base.length; i++) {
        if(!base[i]) return infoPokemon;
        if(base[i].url){
            const pokemon = await fetch(base[i].url);
            const info = await pokemon.json();

            infoPokemon.push(/*info*/{
                    id: info.id,
                    name:info.name,
                    type: info.types.map((t) => t.type.name),
                    img: info.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    fuerza: info.stats[1].base_stat
            }
            );
        } else{
            infoPokemon.push({
                id: base[i].id,
                name: base[i].name,
                type: base[i].tipos.map((t) => t.name),
                fuerza: base[i].fuerza,
                img:"https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif"

            });
        }
            
    }

    // for (let i = 0; i < infoPokemon.length; i++) {
    //     const pokemon = Pokemon.create({
    //         name: infoPokemon[i].name,
    //         //type: data.types.map((t)=> t.type.name),
    //         img: infoPokemon[i].sprites.versions["generation-v"]["black-white"].animated.front_default,
    //         vida: infoPokemon[i].stats[0].base_stat,
    //         fuerza: infoPokemon[i].stats[1].base_stat,
    //         defensa: infoPokemon[i].stats[2].base_stat,
    //         velocidad: infoPokemon[i].stats[5].base_stat,
    //         altura: infoPokemon[i].height,
    //         peso: infoPokemon[i].weight
    //     })

    //     const tipo = infoPokemon[i].types.map((t)=> t.slot);
    //      await pokemon.setTipos(tipos);
    // }

    // const allPokemon = Pokemon.findAll();

    // return allPokemon;
        
    

    return infoPokemon;
}

const forName = async (name) =>{
    try{
        const db = await Pokemon.findOne({
            where: {
                name: name,
            },
            include: Tipo,
        });
        if(db){
            const pokemonBd = [{
                id: db.id,
                name: db.name,
                type: db.tipos.map((t)=> t.name),
                img:"https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif"
            }]
            return pokemonBd;
        }
        else{
            const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await api.json();
            const pokemonName = [
                {
                    id: data.id,
                    name: data.name,
                    type: data.types.map((t)=> t.type.name),
                    img: data.sprites.versions["generation-v"]["black-white"].animated.front_default,

                },
            ];
            return pokemonName;
        }
    }
    catch(error){
        return [];
    }
}

const forId = async(id) => {
    try{
            const api = await fetch(` https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await api.json();
            const pokemonId = {
                id: data.id,
                name: data.name,
                type: data.types.map((t)=> t.type.name),
                img: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                vida: data.stats[0].base_stat,
                fuerza: data.stats[1].base_stat,
                defensa: data.stats[2].base_stat,
                velocidad: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight
            }
            return pokemonId;
    }
    catch(error) {
        
    }

    try{
        const bd = await Pokemon.findByPk(id, {include: Tipo});
        const pokemonDb = {
            id: bd.idPoke,
            name: bd.name,
            type: bd.tipos.map((t)=> t.name),
            img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
            vida: bd.vida,
            fuerza: bd.fuerza,
            defensa: bd.defensa,
            velocidad: bd.velocidad,
            height: bd.altura,
            weight: bd.peso,
        };
        return pokemonDb;
    }
    catch(error){
        return {}
    }
}

module.exports = {
     getAll,
    forName,
    forId
};