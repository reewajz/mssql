const sql = require('mssql');
// const config = require('./config.json');

const pool = new sql.ConnectionPool({
  user: 'SA',
  password: 'Palmmind*8',
  server: 'localhost',
  database: 'laxmi'
});
// async () => {
//   try {
//     await sql.connect('mssql://SA:Palmmind*8@localhost/TesT');
//     const result = await sql.query`select * from mytable where id = ${value}`;
//     console.log(result);
//   } catch (err) {
//     // ... error checks
//   }
// };

var conn = pool;
const executeQuery = (res, query) => {
  conn.connect().then(function () {
    var request = new sql.Request(conn);
    request.query(query, function (err, result) {
      if (err) {
        console.log(err);
        conn.close();
      } else {
        // res.send(result);
        res.json({ result: true, data: result.recordset });
        conn.close();
      }
    });
  });
};

const poolPromise = new sql.ConnectionPool({
  user: 'SA',
  password: 'Palmmind*8',
  server: 'localhost',
  database: 'laxmi'
})
  .connect()
  .then(pool => {
    console.log('connected to mssql');
    return pool;
  })
  .catch(err => console.log('Database connection failed:'));
module.exports = { sql, poolPromise, executeQuery };
// https://stackoverflow.com/questions/30356148/how-can-i-use-a-single-mssql-connection-pool-across-several-routes-in-an-express
