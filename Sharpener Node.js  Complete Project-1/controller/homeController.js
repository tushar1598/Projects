const connection = require("../config/connection");

module.exports.HomeEJS = (req, res) => {
  let tableName = req.query.name;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const Time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  connection.query(`SHOW TABLES`, (err, results) => {
    let tables = results.map((result) => result["Tables_in_my-connection"]);
    connection.query(`SELECT * FROM ${tableName}`, (err, tableData) => {
      connection.query(`DESCRIBE ${tableName}`, (err, tableField) => {
        res.render("home", {
          title: "Node.js Project",
          tables,
          tableData,
          tableField,
          tableName,
          Time,
        });
      });
    });
  });
  
};

module.exports.CreateTable = async function (req, res) {
  let { table_name, column_name, data_type } = req.body;
  // Create the SQL query
  let sql = `CREATE TABLE ${table_name} (`;
  for (let i = 0; i < column_name.length; i++) {
    sql += `${column_name[i]} ${data_type[i]}`;
    if (i < column_name.length - 1) {
      sql += ", ";
    }
  }

  sql += `,CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`;

  // Execute the query
  connection.query(sql, (err, data) => {
    // res.redirect(`/?name=${table_name}`);
    res.redirect("/");
  });
};

module.exports.CreateTableData = function (req, res) {
  let name = req.params.tableName;
  let query1 = `DESCRIBE ${name}`;
  connection.query(query1, function (err, data) {
    let count = data.length;
    let query = `INSERT INTO ${name}(`;
    for (let i = 0; i < data.length; i++) {
      query += data[i].Field;
      if (i < data.length - 1) {
        query += ",";
      }
    }
    query += ")";

    query += `VALUES(`;
    let x = 0;
    for (let key in req.body) {
      x++;
      query += `"${req.body[key]}"`;
      if (x < count) query += ",";
    }
    query += `);`;

    connection.query(query, function (err, data) {
      res.redirect(`/?name=${name}`);
    });
  });
};

module.exports.DeleteData = (req, res) => {
  let tableName = req.params.tableName;
  let id = req.params.id;
  let query = `DELETE FROM ${tableName} WHERE id = ${id};`;
  connection.query(query, function (err, data) {
    res.redirect(`/?name=${tableName}`);
  });
};
