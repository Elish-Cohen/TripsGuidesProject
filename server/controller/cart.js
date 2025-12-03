const fs = require('fs');

const FILE_PATH = 'carts.json';

// פונקציה לקריאת תוכן הקובץ
function readCartFile(callback) {
    fs.readFile(FILE_PATH, "utf-8", (err, data) => {
        if (err) return callback(err, null);
        let json = JSON.parse(data || '[]');
        callback(null, json);
    });
}

// GET כל הסלים
function get(req, res) {
    readCartFile((err, data) => {
        if (err) return res.status(500).send("שגיאה בקריאת קובץ הסלים");
        res.send(data);
    });
}

// GET לפי מזהה משתמש
exports.getById = (req, res) => {
    readCartFile((err, data) => {
        if (err) return res.status(500).send("שגיאה בקריאת הקובץ");
        const id = Number(req.params.id);
        const cart = data.find(c => c.userId == id);
        if (!cart) return res.status(404).send("לא נמצא סל עבור המשתמש " + id);
        res.send(cart);
    });
};

// POST - הוספה לסל
exports.post = (req, res) => {
    readCartFile((err, carts) => {
        if (err) return res.status(500).send("שגיאה בקריאה");

        const { userId, product } = req.body;
        if (!userId || !product) return res.status(400).send("חסר userId או product");

        let userCart = carts.find(c => c.userId == userId);
        if (!userCart) {
            // אם אין סל - צור חדש
        userCart = { userId, cart: [product] };
            carts.push(userCart);
        } else {
          userCart.cart.push(product);
        }

        fs.writeFile(FILE_PATH, JSON.stringify(carts, null, 2), err => {
            if (err) return res.status(500).send("שגיאה בשמירה");
            res.send("המוצר נוסף לסל");
        });
    });
};

// DELETE מוצר מהסל
exports.deleteProduct = (req, res) => {
    const userId = Number(req.params.userId);
    const productId = Number(req.params.productId);

    readCartFile((err, carts) => {
        if (err) return res.status(500).send("שגיאה בקריאה");

        let userCart = carts.find(c => c.userId == userId);
        if (!userCart) return res.status(404).send("לא נמצא סל עבור המשתמש");

        userCart.cart = userCart.cart.filter(p => p.id !== productId);

        fs.writeFile(FILE_PATH, JSON.stringify(carts, null, 2), err => {
            if (err) return res.status(500).send("שגיאה בשמירה");
            res.send("המוצר הוסר מהסל");
        });
    });
};

// PUT עדכון סל מלא (אפשר גם לעדכן לפי צורך)
// exports.put = (req, res) => {
//     const userId = req.params.userId;
//     const newProducts = req.body.products;

//     readCartFile((err, carts) => {
//         if (err) return res.status(500).send("שגיאה בקריאה");

//         let cart = carts.find(c => c.userId == userId);
//         if (!cart) return res.status(404).send("לא נמצא סל");

//         cart.products = newProducts;

//         fs.writeFile(FILE_PATH, JSON.stringify(carts, null, 2), err => {
//             if (err) return res.status(500).send("שגיאה בשמירה");
//             res.send("הסל עודכן");
//         });
//     });
// };
// exports.put=(req, res)=>{
//    const userId = Number(req.params.userId);
//   const productId = Number(req.params.productId);
//   readCartFile((err, carts) =>{
//     if (err) return res.status(500).send("שגיאה בקריאה");

//         let userCart = carts.find(c => c.userId == userId);
//         if (!userCart) return res.status(404).send("לא נמצא סל עבור המשתמש");
//   })
// }
// PUT - עדכון תאריך וכמות למוצר בודד בסל של משתמש
exports.updateCartItem = (req, res) => {
  const userId = Number(req.params.userId);
  const productId = Number(req.params.productId);
  const { selectedDate, selectedCount } = req.body;

  readCartFile((err, carts) => {
    if (err) return res.status(500).send("שגיאה בקריאה");

    const userCart = carts.find(c => c.userId === userId);
    if (!userCart) return res.status(404).send("לא נמצא סל למשתמש");

    const product = userCart.cart.find(p => p.id === productId);
    if (!product) return res.status(404).send("המוצר לא נמצא בסל");

    // עדכון שדות
    product.selectedDate = selectedDate;
    product.selectedCount = selectedCount;

    fs.writeFile(FILE_PATH, JSON.stringify(carts, null, 2), err => {
      if (err) return res.status(500).send("שגיאה בשמירה");
      res.send("המוצר עודכן בהצלחה");
    });
  });
};

// ייצוא
exports.get = get;
