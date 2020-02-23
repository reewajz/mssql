var express = require('express');
var router = express.Router();
const getip = require('../middleware/location');
const eq = require('../db');
const country = require('../utility/country-map');
const { sql, poolPromise } = require('../db');
const radius = require('../utility/radius');
router.get('/branch/:location/:intent?/', function (req, res, next) {
  const intent = req.params.intent;
  const location = req.params.location;
  if (intent) {
    if (intent.toLowerCase().includes('mobile')) {
      var query = `select mobile_no from branch_master where branch_name =(select branch_name from branch_master where address like '${location}%')`;
      eq.executeQuery(res, query);
    } else if (intent.toLowerCase().includes('phone')) {
      var query = `select telephone from branch_master where branch_name =(select branch_name from branch_master where address like '${location}%')`;
      eq.executeQuery(res, query);
    } else if (intent.toLowerCase().includes('email')) {
      var query = `select email,email2,email3 from branch_master where branch_name =(select branch_name from branch_master where address like '${location}%')`;
      eq.executeQuery(res, query);
    }
  } else {
    var query = `select branch_name,branch_avbre from branch_master where address like '%${location}%'`;
    eq.executeQuery(res, query);
  }
});

router.get('/branch/:location/:intent?', (req, res) => {
  var intent = req.params.intent;
  var location = req.params.location;
  if (intent) {
    if (intent.toLowerCase().includes('phone')) {
      var query = `select CONTACT_NO from V_Branch where charindex('${location}',BRANCH_LOCATION)>0 or address like '%${location}%'`;
      eq.executeQuery(res, query);
    } else if (intent.toLowerCase().includes('atm')) {
      var query = `select LATITUDE, LONGITUDE,BRANCH_NAME from V_ATM where charindex('${location}', LOCATION)>0 or address like '%${location}%'`;
      var request = sql.returnRequest();
      console.log(request);
      request.query(query, function (err, result) {
        if (err) {
          console.log(err);
          conn.close();
        } else {
          res.json({ result: true, data: result.recordset });
          conn.close();
        }
      });
    } else {
      res.json({ result: true, data: '' });
    }
  } else {
    var query = `select BRANCH_NAME,address,BRANCH_LOCATION,district,CONTACT_NO,LATITUDE,LONGITUDE from V_Branch where charindex('${location}',BRANCH_LOCATION)>0 or address like '%${location}%' `;
    // select * from V_Branch where charindex('sahid',BRANCH_LOCATION)>0

    eq.executeQuery(res, query);
  }
});

// router.get('/branch/:location/:atm', async (req, res) => {
//   console.log('inside ..');
//   const location = req.params.location;
//   try {
//     const pool = await poolPromise;
//     const result = await pool
//       .request()
//       .input('location', sql.NVarChar, req.query.location)
//       .query(
//         `select LATITUDE, LONGITUDE,BRANCH_NAME from V_ATM where charindex('${location}', LOCATION)>0 or address like '%${location}%'`
//       );
//     res.json(result.recordset);
//     console.log(result.recordset.length);
//   } catch (error) {
//     console.log(error);
//   }
// });
router.get('/radius/:location', async (req, res) => {
  const rad = radius.getRadius(req.params.location);
  const lat = '27.699290';
  const lon = '85.312989';
  // var query = 'select * from V_ATM'
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('', sql.NVarChar, req.query.location)
      .query(
        `DECLARE @LATITUDE AS FLOAT
        DECLARE @LONGITUDE AS FLOAT 
        SET @LATITUDE = 27.503562
        SET @LONGITUDE = 86.5758930
        SELECT TOP 1 LATITUDE, LONGITUDE
        FROM V_ATM
        ORDER BY (ABS(ABS(LATITUDE)-ABS(@LATITUDE)))+ABS(ABS(LONGITUDE)-ABS(@LONGITUDE))`
      );
    res.json(result.recordset);

  } catch (error) {
    console.log(error);
  }

});
router.get('/forex/:ccy', (req, res) => {
  var ccy = country.getCountry(req.params.ccy);
  if (ccy) {
    var query = `select buying,selling from V_Forex where ccy like '${ccy}'`;
    eq.executeQuery(res, query);
  }
});
router.post('/coordinate/:intent', async (req, res) => {
  let pip = req.body.publicIP;
  let intent = req.params.intent;
  const data = await getip.getLatLon(pip);
  if (intent.toLowerCase().includes('atm')) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('', sql.NVarChar, req.query.location)
        .query(
          `DECLARE @LATITUDE AS FLOAT
          DECLARE @LONGITUDE AS FLOAT 
          SET @LATITUDE = ${data.latitude}
          SET @LONGITUDE = ${data.longitude}
          SELECT TOP 3 *
          FROM V_ATM
          ORDER BY (ABS(ABS(LATITUDE)-ABS(@LATITUDE)))+ABS(ABS(LONGITUDE)-ABS(@LONGITUDE))`
        );
      res.json(result.recordset);

    } catch (error) {
      console.log(error);
    }
  } else if (intent.toLowerCase().includes('branch')) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('', sql.NVarChar, req.query.location)
        .query(
          `DECLARE @LATITUDE AS FLOAT
          DECLARE @LONGITUDE AS FLOAT 
          SET @LATITUDE = ${data.latitude}
          SET @LONGITUDE = ${data.longitude}
          SELECT TOP 3 *
          FROM V_Branch
          ORDER BY (ABS(ABS(LATITUDE)-ABS(@LATITUDE)))+ABS(ABS(LONGITUDE)-ABS(@LONGITUDE))`
        );
      res.json(result.recordset);

    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ msg: 'invalid intent' })
  }

});
router.get('/coordinate/:intent', async (req, res) => {
  let pip = req.body.publicIP || '27.34.104.44';
  let intent = req.params.intent;
  const data = await getip.getLatLon(pip);
  console.log(data);
  if (intent.toLowerCase().includes('atm')) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('', sql.NVarChar, req.query.location)
        .query(
          `DECLARE @LATITUDE AS FLOAT
          DECLARE @LONGITUDE AS FLOAT 
          SET @LATITUDE = ${data.latitude}
          SET @LONGITUDE = ${data.longitude}
          SELECT TOP 3 *
          FROM V_ATM
          ORDER BY (ABS(ABS(LATITUDE)-ABS(@LATITUDE)))+ABS(ABS(LONGITUDE)-ABS(@LONGITUDE))`
        );
      res.json(result.recordset);

    } catch (error) {
      console.log(error);
    }
  } else if (intent.toLowerCase().includes('branch')) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('', sql.NVarChar, req.query.location)
        .query(
          `DECLARE @LATITUDE AS FLOAT
          DECLARE @LONGITUDE AS FLOAT 
          SET @LATITUDE = ${data.latitude}
          SET @LONGITUDE = ${data.longitude}
          SELECT TOP 3 *
          FROM V_Branch
          ORDER BY (ABS(ABS(LATITUDE)-ABS(@LATITUDE)))+ABS(ABS(LONGITUDE)-ABS(@LONGITUDE))`
        );
      res.json(result.recordset);

    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ msg: 'invalid intent' })
  }

});
module.exports = router;
