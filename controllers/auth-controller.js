const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getConnection = require("../db/database");
const connection = getConnection();

/* CREATE ADMIN */
const createAdmin = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        "INSERT INTO admins (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Admin created" });
        }
    );
};

/* ADMIN LOGIN */
const loginAdmin = (req, res) => {
    const { username, password } = req.body;

    connection.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        async (err, rows) => {
            if (err) return res.status(500).json(err);
            if (rows.length === 0)
                return res.status(401).json({ message: "Invalid credentials" });

            const admin = rows[0];
            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch)
                return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign(
                { adminId: admin.id },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            res.json({ token });
        }
    );
};

module.exports = {
    loginAdmin,
    createAdmin
}
