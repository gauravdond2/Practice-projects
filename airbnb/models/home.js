const rootdir = require("../utils/utilpath");
const fs = require('fs');
const path = require('path');
const { json } = require("stream/consumers");

const registeredHomes = [];
module.exports = class Home {
    constructor(homeName,location,rating,photo,pricePerNight){
        this.homeName = homeName;
        this.rating = rating;
        this.photo = photo;
        this.pricePerNight = pricePerNight;
    }
    save(){
        Home.fetchAll((data)=>{
            data.push(this);
               const filepath = path.join(rootdir,'data', 'homes.json');
        fs.writeFile(filepath, JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
        })           
    }
    static fetchById(id , callback){
        const filepath =path.join(rootdir,'Data', 'homes.json');
       fs.readFile(filepath,(err,data) =>{
           if(!err){
            const homeData = JSON.parse(data);
           const home = homeData.find((h)=>h.id === id);
            callback(home);
           }else{
            callback(undefined);
           }
        })
    }
    static fetchAll(callback){
        const filepath =path.join(rootdir,'Data', 'homes.json');
        fs.readFile(filepath,(err,data) =>{
           if(!err && data.length >0){
            callback( JSON.parse(data));
           }else{
            callback([]);
           }
        })
    }

}