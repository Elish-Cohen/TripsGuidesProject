
const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user);
            }

        }


    })
}

exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ");
        } else {
            const user = req.body; // נשלח מהלקוח: { username, password }
            const users = JSON.parse(data);

            const currentUser = users.find(st =>
                st.username === user.username && st.password === user.password
            );

            if (!currentUser) {
                res.status(401).send("Username or password is incorrect");
            } else {
                res.send(currentUser);
            }
        }
    });
};


exports.post = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("error reading users file");
        }

        let users = JSON.parse(data);

        // בדיקה אם כבר קיים username כזה
        const existingUser = users.find(u => u.username === req.body.username);
        if (existingUser) {
            return res.status(400).send("Username already exists");
        }

        // יצירת ID חדש
        const newId = users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1;
        req.body.id = newId;

        users.push(req.body);

        fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                res.status(500).send("error in adding user");
            } else {
                res.send("successfully added user");
            }
        });
    });
};

exports.logout = (req, res) => {
    // במערכות אמיתיות מוחקים טוקן מהשרת
    res.send("logged out");
};

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
