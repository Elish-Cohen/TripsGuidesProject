
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}


// exports.post = (req, res) => {

//     fs.readFile("products.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let products = JSON.parse(data);
//         //body =  לתוכן שנשלח בפונקציה פןסט 
//         let product =req.body
//         // מוסיף איידי למוצר החדש 
//         products.push(product);
//         fs.writeFile("products.json", JSON.stringify(products), (err) => {
//             if (err) {
//                 res.status(500).send("error  in add products ");
//             } else {
//                 res.send(product);
//             }
//         })
//     })
// }

exports.post = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Failed to read products file");
        }

        let products = [];
        try {
            products = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).send("Error parsing JSON");
        }

        const product = req.body;

        // יצירת ID חדש: הגדול ביותר + 1
        const newId = products.length > 0 ? Number(Math.max(...products.map(p => p.id || 0))) + 1 : 1;
        product.id = newId;

        products.push(product);

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing product file");
            }
            res.send(product);
        });
    });
};

exports.delete = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send("error reading file");
        let products = JSON.parse(data);
        let id = Number(req.params.id);
        let newProducts = products.filter(p => p.id != id);

        fs.writeFile("products.json", JSON.stringify(newProducts), err => {
            if (err) return res.status(500).send("error writing file");
            res.send("product deleted");
        });
    });
};

exports.update = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send("error reading file");
        let products = JSON.parse(data);
        let id = req.params.id;
        let index = products.findIndex(p => p.id == id);
        if (index == -1) return res.status(404).send("product not found");

        products[index] = { ...products[index], ...req.body };

        fs.writeFile("products.json", JSON.stringify(products), err => {
            if (err) return res.status(500).send("error writing file");
            res.send("product updated");
        });
    });
};

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
