const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//config the connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asdfgh",
  database: "padms",
  port: "3306",
});

//create a connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.message);
    return;
  }
  console.log("Connected to the database:" + connection.threadId);
});

//signing up
app.post("/signup", async (req, res) => {
  console.log("Received Data:" + req.body);
  const { fullName, dateOfBirth, email, phoneNumber, licenseNumber, password } =
    req.body;
  console.log(
    fullName,
    dateOfBirth,
    email,
    phoneNumber,
    licenseNumber,
    password
  );

  //encrypting the password
  const hashedPassword = await bcrypt.hash(password, 8);

  //check if user already exists
  connection.query(
    "SELECT * FROM USERS WHERE EMAIL=?",
    [email],
    (err, result1) => {
      if (err) {
        console.error("Error checking user existence:" + err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result1.length > 0) {
        console.log("User already exists");
        return res.status(409).json({ error: "Username already exists" });
      }

      //create new user
      connection.query(
        "INSERT INTO USERS(FULLNAME,DOB,EMAIL,PHONENO,LICENSENO,PASSWORD) VALUES(?,?,?,?,?,?)",
        [
          fullName,
          dateOfBirth,
          email,
          phoneNumber,
          licenseNumber,
          hashedPassword,
        ],
        (err, result2) => {
          if (err) {
            console.error("Error signing up:" + err);
            return;
          }
          console.log("Signup successful");
          console.log(result2);
          //fetching user_id
          connection.query(
            "SELECT USER_ID FROM USERS WHERE EMAIL=? AND PASSWORD=?",
            [email, hashedPassword],
            (err, result3) => {
              if (err) {
                console.error("Error fetching user_id:" + err);
              }
              console.log(result3);
              return res.status(200).json({ user_id: result3[0].USER_ID });
            }
          );
          // return res.status(200).json({ message: "Signup successful" });
        }
      );
    }
  );
});

//signing in
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  //checking email
  connection.query(
    "SELECT PASSWORD FROM USERS WHERE EMAIL=?",
    [email],
    async (err, result1) => {
      if (err) {
        console.error("Error fetching password: " + err);
        return;
      }

      console.log(result1);
      console.log(result1[0].PASSWORD);

      //matching password
      const passwordMatch = await bcrypt.compare(password, result1[0].PASSWORD);
      if (!passwordMatch) {
        console.error("Password is incorrect");
        return res.status(401).json({ error: "Invalid username or password" });
      }

      //fetching user_id
      connection.query(
        "SELECT USER_ID FROM USERS WHERE EMAIL=? AND PASSWORD=?",
        [email, result1[0].PASSWORD],
        (err, result2) => {
          if (err) {
            console.error("Error fetching user_id:" + err);
          }
          console.log(result2);
          return res.status(200).json({ user_id: result2[0].USER_ID });
        }
      );
    }
  );
});

app.post("/Addvehicles", (req, res) => {
  const { vehiclesData, userId } = req.body;
  vehiclesData.map((vehicle) => {
    console.log(
      vehicle.vehicleName,
      vehicle.regNo,
      vehicle.ownerSerial,
      vehicle.vehicleType,
      vehicle.vehicleMaker,
      vehicle.vehicleModel,
      vehicle.year,
      vehicle.vehicleClass,
      vehicle.vin,
      vehicle.engNo,
      vehicle.fuelType,
      vehicle.emissionNorm
    );
    connection.query(
      "INSERT INTO VEHICLES (USER_ID,VEHICLE_NAME,REGNO,OWNER_SERIAL) VALUES(?,?,?,?)",
      [userId, vehicle.vehicleName, vehicle.regNo, vehicle.ownerSerial],
      (err, result) => {
        if (err) {
          console.error("Error inserting vehicle:" + err);
        }
        connection.query(
          "SELECT VEHICLE_ID FROM VEHICLES WHERE USER_ID=? AND VEHICLE_NAME=? AND REGNO=?",
          [userId, vehicle.vehicleName, vehicle.regNo],
          (err, result1) => {
            if (err) {
              console.error("Error fetching vehicle id:" + err);
            }
            console.log(result1[0].VEHICLE_ID);
            connection.query(
              "INSERT INTO VEHICLE_DETAILS (VEHICLE_ID,VEHICLE_TYPE,VEHICLE_MAKER,VEHICLE_MODEL,YEAR,VEHICLE_CLASS,VIN,ENGNO,FUEL_TYPE,EMISSION_NORM) VALUES(?,?,?,?,?,?,?,?,?,?)",
              [
                result1[0].VEHICLE_ID,
                vehicle.vehicleType,
                vehicle.vehicleMaker,
                vehicle.vehicleModel,
                vehicle.year,
                vehicle.vehicleClass,
                vehicle.vin,
                vehicle.engNo,
                vehicle.fuelType,
                vehicle.emissionNorm,
              ],
              (err) => {
                if (err) {
                  console.error("Error inserting vehicle details:" + err);
                }
              }
            );
            res.status(200).json({ message: "Vehicles inserted successfully" });
          }
        );
      }
    );
  });
});

app.post("/Addinsurance", (req, res) => {
  const { insData, userId } = req.body;

  connection.query(
    "SELECT VEHICLE_ID FROM VEHICLES WHERE USER_ID=? AND VEHICLE_NAME=? AND REGNO=?",
    [userId, insData[0].vehicleName, insData[0].regNo],
    (err, result1) => {
      if (err) {
        console.error("Error fetching vehicle id:" + err);
      }
      console.log(result1);
      connection.query(
        "INSERT INTO INSURANCE (VEHICLE_ID,INS_PROVIDER,POLICYNO,EXPIRY_DATE) VALUES(?,?,?,?)",
        [
          result1[0].VEHICLE_ID,
          insData[0].insProvider,
          insData[0].policyNo,
          insData[0].expiryDate,
        ],
        (err, result2) => {
          if (err) {
            console.error("Error inserting insurance: " + err);
          }
          console.log(result2);
          res.status(200).json({ message: "insurance added successfully" });
        }
      );
    }
  );
});

app.post("/Addfuellog", (req, res) => {
  const { fuelLogs, userId } = req.body;

  connection.query(
    "SELECT VEHICLE_ID FROM VEHICLES WHERE USER_ID=? AND VEHICLE_NAME=? AND REGNO=?",
    [userId, fuelLogs[0].vehicleName, fuelLogs[0].regNo],
    (err, result1) => {
      if (err) {
        console.error("Error fetching vehicle id:" + err);
      }
      connection.query(
        "INSERT INTO FUEL_LOG (VEHICLE_ID,FILL_DATE,FUEL_VOLUME,COST) VALUES(?,?,?,?)",
        [
          result1[0].VEHICLE_ID,
          fuelLogs[0].fillDate,
          fuelLogs[0].fuelVol,
          fuelLogs[0].cost,
        ],
        (err, result2) => {
          if (err) {
            console.error("Error inserting fuellog");
          }
          console.log(result2);
          res.status(200).json({ message: "fuellog added successfully" });
        }
      );
    }
  );
});

app.post("/Addmaintenance", (req, res) => {
  const { mntData, userId } = req.body;
  console.log(mntData);
  console.log(mntData[0].vehicleName);
  connection.query(
    "SELECT VEHICLE_ID FROM VEHICLES WHERE USER_ID=? AND VEHICLE_NAME=? AND REGNO=?",
    [userId, mntData[0].vehicleName, mntData[0].regNo],
    (err, result1) => {
      if (err) {
        console.error("Error fetching vehicle id:" + err);
      }

      connection.query(
        "INSERT INTO MAINTENANCE (VEHICLE_ID,SERVICE_DATE,DESCRIPTION,COST) VALUES(?,?,?,?)",
        [
          result1[0].VEHICLE_ID,
          mntData[0].serviceDate,
          mntData[0].description,
          mntData[0].cost,
        ],
        (err, result2) => {
          if (err) {
            console.error("Error inserting maintenance: " + err);
            console.log(result2);
            res.status(200).json({ message: "maintenance added successfully" });
          }
        }
      );
    }
  );
});

app.post("/getUserData", (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  console.log(userId);

  connection.query(
    "SELECT FULLNAME,DATE_FORMAT(DOB, '%M %d, %Y') as DOB,EMAIL,LICENSENO FROM USERS WHERE USER_ID =?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Error fetching user details: " + err);
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.post("/getStats", (req, res) => {
  const { userId } = req.body;
  connection.query(
    "SELECT COUNT(v.VEHICLE_ID) AS COUNT FROM VEHICLES v WHERE v.USER_ID = ?",
    [userId],
    (err, result1) => {
      if (err) {
        console.error("Error fetching vehicle count: " + err);
      }
      console.log(result1[0].COUNT);

      connection.query(
        "SELECT v.VEHICLE_NAME, DATE_FORMAT(EXPIRY_DATE, '%M %d, %Y') as EXPIRY_DATE FROM VEHICLES v JOIN INSURANCE i ON v.VEHICLE_ID = i.VEHICLE_ID WHERE v.USER_ID = ? AND i.EXPIRY_DATE >= CURDATE() ORDER BY i.EXPIRY_DATE",
        [userId],
        (err, result2) => {
          if (err) {
            console.error("Error fetching expiry dates:" + err);
          }
          console.log(result2);
          res
            .status(200)
            .json({ count: result1[0].COUNT, expiryDate: [result2[0]] });
        }
      );
    }
  );
});

const port = process.env.PORT || 5500;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is running on http://localhost:${port}`);
});
