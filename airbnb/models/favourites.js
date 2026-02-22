const rootdir = require("../utils/utilpath");
const fs = require('fs');
const path = require('path');
const { json } = require("stream/consumers");
const Home = require("./home");

module.exports = class Favourites {
   
    static  save(id , callback){
         Favourites.fetchAllIds((data)=>{
            if(!data.includes(id)){
                data.push(id);
                const filepath = path.join(rootdir,'data', 'favourites.json');
                fs.writeFile(filepath, JSON.stringify(data), (err) => {
                    if (err) { console.log(err);  }
                    callback();
                });                
            }else{
                console.log("Home is allready present in favouties Id: ",id);
                callback();
            }
        })           
    }
   
    static fetchAllIds(callback){
        const filepath =path.join(rootdir,'Data', 'favourites.json');
        fs.readFile(filepath,(err,data) =>{
           if(!err && data.length>0){
            callback( JSON.parse(data));
           }else{
            callback([]);
           }
        })
    }
    static fetchFavouriteHomes(callback){
        Favourites.fetchAllIds((favHomeIds) =>{
            Home.fetchAll((registeredHomes) => {
                const favHomesDetails = favHomeIds.map((homeid)=> registeredHomes.find((home)=> home.id === homeid));
                callback(favHomesDetails);
            })
        })
    }

    static removeFavouriteHome(homeid ,callback){
        Favourites.fetchAllIds((homeids) =>{
            homeids.splice(homeids.indexOf(homeid),1);
            const filepath = path.join(rootdir,'data', 'favourites.json');
            fs.writeFile(filepath, JSON.stringify(homeids), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    callback();
                });    
        })
    }

}