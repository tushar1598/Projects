const connection = require("../config/myConnection");

module.exports.ShowCreateTable = function (req, res) {
  connection.query(`SHOW TABLES`, function (err, results) {
    const tables = results.map((result) => result["Tables_in_my-connection"]);
    return res.render("main", {
      title: "Main",
      tables: tables,
    });
  });
};

module.exports.Home = function (req, res) {
  return res.render("home", {
    title: "Home Page",
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
  sql += ");";

  // Execute the query
  connection.query(sql, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      res.send("Error creating table");
    } else {
      return res.redirect("/");
    }
  });
};

module.exports.ShowTablesData = function (req, res) {
  let name = req.params.name;
  let query = `DESCRIBE ${name}`;
  connection.query(query, function (err, data) {
    let query1 = `SELECT * FROM ${name}`;
    connection.query(query1, function (err, tableData) {
      return res.render("table_data", {
        data: data,
        name: name,
        tableData: tableData,
      });
    });
  });
};

module.exports.CreateTableWithData = function (req, res) {
  let name = req.params.name;
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

    query += ");";
    console.log(query);
    connection.query(query, function (err, data) {
      return res.redirect("back");
    });
  });
};
