export const tipos = (type, arr) => {
    if(arr.length) {
        return arr.filter((p) => p.type.includes(type));
    }
    else{
        return [];
    }

};

export const ordered = (order, arr) => {
    let names = arr.map((m) => m.names);
    let fuerza = arr.map((m) => m.fuerza);
    let o = [];


    switch(order){
        case "a-z":
            names = names.sort();
            names.forEach((n) =>{
                arr.forEach((element) =>{
                    if(n === element.name){
                        o.push(element);
                    }
                });
            });

            return o;

        case "z-a":
            names = names.sort().reverse();
            names.forEach((n) =>{
                arr.forEach((element) =>{
                    if(n === element.name){
                        o.push(element);
                    }
                });
            });

            return o;
        
        case "fuerza+":
            fuerza = fuerza.sort((a,b) => b - a);
            fuerza.forEach((f) => {
                arr.forEach((element) => {
                    if(f === element.fuerza){
                        o.push(element);
                    }
                });
            });

            o = o.filter((e, i) => o.indexOf(e)=== i);
            return o;
        
        
        case "fuerza-":
            fuerza = fuerza.sort((a,b) => a - b);
            fuerza.forEach((f) => {
                arr.forEach((element) =>{
                    if(f === element.fuerza){
                        o.push(element);
                    }
                });
            });

            o = o.filter((e,i) => o.indexOf(e) ===  i);
            return o;

        default:
            return arr;
    }
};