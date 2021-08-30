const {Router} = require("express");
const {Pokemon, Tipo} = require("../db.js");
const {f, forName, forId} = require("../middlewares/middleware.js");


const router = Router();

router.get("/", async (req, res)=>{
    let {name, by} = req.query;
    let pokemonInfo = [];
    if(name){
        name = name.toLowerCase();
        pokemonInfo = await forName(name);
        if(!pokemonInfo.length){
            return res.json({f:"El pokemon no existe"});
        }
        return res.json(pokemonInfo); //Podria crear un objeto que tenga un "cartel de error" con su respectivo codigo. res.status = codigo
    }


    pokemonInfo = await f(by);
    if(!pokemonInfo.length){
        return res.json({f:"No hay mas pokemones registrados"});
    }
    res.json(pokemonInfo);
});


router.get("/:id", async(req, res)=>{
    const {id} = req.params;
    const pokemonInfo = await forId(id);
    if(!pokemonInfo.id){
        return res.json({f:"El pokemon no existe"})
    }

    res.json(pokemonInfo);
});



router.get("/:name", async(req, res)=>{
    const {name} = req.params;
    const pokemonInfo = await forName(name);
    if(!pokemonInfo.name){
        return res.json({f:"El pokemon no existe"})
    }

    res.json(pokemonInfo);
});

router.post("/", async(req, res)=>{
    let {name, vida, fuerza, defensa, velocidad, altura, peso, tipos} = req.body;
    //console.log(req.body);

    if( !vida || !fuerza || !defensa || !velocidad || !altura || !peso || !tipos){
        return res.json({f: "Faltan propiedades por completar"});
    }

    if(isNaN(vida)|| isNaN(fuerza)|| isNaN(defensa)|| isNaN(velocidad) || isNaN(altura) || isNaN(peso)){
        return res.json({f: "Hay algunas propiedades que NO son numeros"})
    }                                                                      

    if(!name){
        return res.json({f:"El nombre es obligatorio"});
    }

    const existe = await Pokemon.findOne({where:{name: name}});
    if(existe){
        return res.json({f:"El pokemon ya existe"});
    }

    const pokemon = await Pokemon.create({

        name: name.toLowerCase(),
        vida: Number(vida),
        fuerza: Number(fuerza),
        defensa: Number(defensa),
        velocidad: Number(velocidad),
        altura: Number(altura),
        peso: Number(peso)

    });

    if(!tipos.length){
        return tipos = [1];
    }

    await pokemon.setTipos(tipos);
    res.json({f:"El pokemon se ha creado con exito"});


});

module.exports = router;