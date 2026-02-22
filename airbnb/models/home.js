const rootdir = require("../utils/utilpath");
const fs = require('fs');
const path = require('path');
const { json } = require("stream/consumers");

const registeredHomes = [];
module.exports = class Home {
    constructor(id, homeName, location, rating, photo, pricePerNight) {
        this.id = id;
        this.homeName = homeName;
        this.location = location;
        this.rating = rating;
        this.photo = photo;
        this.pricePerNight = pricePerNight;
    }
    save() {
        Home.fetchAll((data) => {
            data.push(this);
            const filepath = path.join(rootdir, 'data', 'homes.json');
            fs.writeFile(filepath, JSON.stringify(data), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        })
    }

    async update() {
    const filePath = path.join(rootdir, 'data', 'homes.json');

    try {
        // 1. Fetch data using a Promise-based approach
        Home.fetchAll(async (homes) => {
            // 2. Use map to replace the specific record efficiently
            const updatedHomes = homes.map(home => 
                home.id === this.id ? this : home
            );

            // 3. write the updated list
            try {
                await fs.promises.writeFile(filePath, JSON.stringify(updatedHomes, null, 2));
            } catch (writeError) {
                console.error('Failed to save updated home data:', writeError);
            }
        });
    } catch (fetchError) {
        console.error('Error retrieving homes for update:', fetchError);
    }
}
    static fetchById(id, callback) {
        const filepath = path.join(rootdir, 'Data', 'homes.json');
        fs.readFile(filepath, (err, data) => {
            if (!err) {
                const homeData = JSON.parse(data);
                const home = homeData.find((h) => h.id === id);
                callback(home);
            } else {
                callback(undefined);
            }
        })
    }
    static fetchAll(callback) {
        const filepath = path.join(rootdir, 'Data', 'homes.json');
        fs.readFile(filepath, (err, data) => {
            if (!err && data.length > 0) {
                callback(JSON.parse(data));
            } else {
                callback([]);
            }
        })
    }
   static async deleteById(id) {
    const filePath = path.join(rootdir, 'data', 'homes.json');

    return new Promise((resolve, reject) => {
        this.fetchAll(async (homes) => {
            try {
                // 1. Filter out the item to be deleted
                const updatedHomes = homes.filter(home => home.id !== id);

                // 2. Write the updated array back to the file
                await fs.promises.writeFile(
                    filePath, 
                    JSON.stringify(updatedHomes, null, 2)
                );

                resolve(); // Success!
            } catch (error) {
                console.error('Delete failed:', error);
                reject(error); // Pass the error up
            }
        });
    });
}

}