const {Router} = require("express");
const {Pokemon, Tipo} = require("../db.js");
const {getAll, forName, forId} = require("../metodos/metodos.js");




const router = Router();

router.get("/", async (req, res)=>{
    let {name} = req.query;
    let pokemonInfo = [];
    if(name){
        name = name.toLowerCase();
        pokemonInfo = await forName(name);
        if(!pokemonInfo.length){
            return res.json({getAll:"El pokemon no existe"});
        }
        return res.json(pokemonInfo); 
    }


    pokemonInfo = await getAll();
    if(!pokemonInfo.length){
        return res.json({getAll:"No hay mas pokemones registrados"});
    }
    res.json(pokemonInfo);

    //await getAll();
    //const pokemon = await Pokemon.findAll() 

    //res.json(pokemon);
});


router.get("/:id", async(req, res)=>{
    const {id} = req.params;
    const pokemonInfo = await forId(id);
    if(!pokemonInfo.id){
        return res.json({getAll:"El pokemon no existe"})
    }

    res.json(pokemonInfo);
});



router.get("/:name", async(req, res)=>{
    const {name} = req.params;
    const pokemonInfo = await forName(name);
    if(!pokemonInfo.name){
        return res.json({getAll:"El pokemon no existe"})
    }

    res.json(pokemonInfo);
});

router.post("/", async (req, res)=>{
    let {name, vida, fuerza, defensa, velocidad, altura, peso, tipos} = req.body;
    console.log(req.body);


     if( !vida || !fuerza || !defensa || !velocidad || !altura || !peso || !tipos){
         return res.json({getAll: "Faltan propiedades por completar"});
     }

    if(isNaN(vida)|| isNaN(fuerza)|| isNaN(defensa)|| isNaN(velocidad) || isNaN(altura) || isNaN(peso)){
        return res.json({getAll: "Hay algunas propiedades que NO son numeros"})
    }                                                                      

    if(!name){
        return res.json({getAll:"El nombre es obligatorio"});
    }

    const existe = await Pokemon.findOne({where:{name: name}});
    if(existe){
        return res.json({getAll:"El pokemon ya existe"});
    }

    if(tipos.length === 0){
        tipos = [];
    }
    const pokemon = await Pokemon.create({

        name: name.toLowerCase(),
        vida: Number(vida),
        fuerza: Number(fuerza),
        defensa: Number(defensa),
        velocidad: Number(velocidad),
        altura: Number(altura),
        peso: Number(peso),
        
        

    });

   

    await pokemon.setTipos(tipos);
    res.json({getAll:"El pokemon se ha creado con exito"});


});

module.exports = router;