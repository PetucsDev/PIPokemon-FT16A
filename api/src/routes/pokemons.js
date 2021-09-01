const {Router} = require("express");
const {Pokemon, Tipo} = require("../db.js");
const {getAll, forName, forId} = require("../metodos/metodos.js");
const { Op } = require('sequelize');





const router = Router();

router.get("/", async (req, res)=>{
     var {name} = req.query;


    if(name){
        name.toLowerCase();
        const pokemonInfo = await Pokemon.findAll({where:{name:name}});
       
        res.json(pokemonInfo);
    }
    else{
        await getAll();
        const pokemon = await Pokemon.findAll() 
    
        res.json(pokemon);
    }
   
});


router.get("/:id", async(req, res)=>{
    const {id} = req.params;
    const pokemonInfo = await Pokemon.findByPk(id);
    if(!pokemonInfo.id){
        return res.status(404).send("Pokemon not Found");
    }

    res.json(pokemonInfo);
});


router.post("/", async (req, res)=>{
    let {name, vida, fuerza, defensa, velocidad, altura, peso, tipos} = req.body;
    console.log(req.body);


     if( !vida || !fuerza || !defensa || !velocidad || !altura || !peso){
         return res.status(400).send("Faltan parametros por completar");
     }

    if(isNaN(vida)|| isNaN(fuerza)|| isNaN(defensa)|| isNaN(velocidad) || isNaN(altura) || isNaN(peso)){
        return res.status(400).send("Hay algunas propiedades que NO son numeros")
    }                                                                      

    if(!name){
        return res.status(400).send("El nombre es obligatorio");
    }

    const existe = await Pokemon.findOne({where:{name: name}});
    if(existe){
        return res.status(400).send("El pokemon ya existe");
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
    return res.status(200).send("El pokemon ya existe");


});

module.exports = router;