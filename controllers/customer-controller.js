const getConnection = require("../db/database");
const connection = getConnection();

const saveCustomer = (req, res) => {
    const { name, contact, address } = req.body;

     const profileImage = req.file ? req.file.path : null;

    connection.query('INSERT INTO customers (name, contact, address, profile_image) VALUES (?, ?, ?, ?)', [name, contact, address, profileImage], (err, rows, fields) => {
        if (err) throw err
        res.send("Customer saved successfully  !");
    })
}

const getCustomer = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM customers WHERE id = ?', [id], (err, rows, fields) => {
        if (err) throw err
        res.send(rows[0]);
    });
}

const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { name, contact, address } = req.body;
    const profileImage = req.file ? req.file.path : null;
    
    connection.query('UPDATE customers SET name = ?, contact = ?, address = ?, profile_image = ? WHERE id = ?', [name, contact, address, profileImage, id], (err, rows, fields) => {
        if (err) throw err
        res.send("Customer updated successfully !");
    });
}

const deleteCustomer = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM customers WHERE id = ?', [id], (err, rows, fields) => {
        if (err) throw err
        res.send("Customer deleted successfully !");
    });
}

const getAllcustomers = (req, res) => {
    connection.query('SELECT * FROM customers', (err, rows, fields) => {
        if (err) throw err
        res.send(rows);
    });
}

module.exports = {
    saveCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    getAllcustomers
}