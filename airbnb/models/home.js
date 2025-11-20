const rootdir = require("../utils/utilpath");
const fs = require('fs');
const path = require('path');

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
    static fetchAll(callback){
        const filepath =path.join(rootdir,'Data', 'homes.json');
        fs.readFile(filepath,(err,data) =>{
           if(!err){
            callback( JSON.parse(data));
           }else{
            callback([]);
           }
        })
    }

}