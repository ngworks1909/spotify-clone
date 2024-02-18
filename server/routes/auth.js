const express = require("express");
const { validateCredentials, validateUser, fetchUser } = require("../middlewares/user");
const router = express.Router();
const { doc, setDoc, getDoc, where, query, collection, getDocs } = require("firebase/firestore");
const { db, storage } = require("../firebase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

router.post("/createUser", validateUser, async (req, res) => {
  let success = false;
  try {
    const email = req.body.email;
    const user = await getDoc(doc(db, "users", email));
    if (user.exists()) {
      success = false;
      return res.status(400).json({ success, error: "User already exists..." });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const id = uuid();
      await setDoc(doc(db, "users", email), {
        id,
        username: req.body.username,
        email,
        password: secPass,
      });
      const data = {
        user: {
          id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.status(200).json({ success, authToken });
    }
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: "Internal server error..." });
  }
});

router.post("/login", validateCredentials, async (req, res) => {
  let success = false;
  try {
    const {email, password} = req.body;
    const userDoc = await getDoc(doc(db, 'users', email));
    if(!userDoc.exists()){
      return res.status(400).json({success, error: "Invalid username or password..."})
    }
    else{
       const user = userDoc.data();
       console.log(user)
       const match = await bcrypt.compare(password, user.password);
       if(!match){
        return res.status(400).json({success, error:"Invalid email or password..."});
       }
       const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.status(200).json({success, authToken});
    }
  } catch (error) {
    success = false;
    return res.status(500).json({success, error: "Internal server error..."})
  }
  
});

router.post('/fetchUser', fetchUser, async(req, res) => {
  let success = true;
  console.log(req.user.id);
  try {
    const userId = req.user.id;
    const q = query(
      collection(db,"users"),
      where("id","==",userId)
      );
      const querySnapshot = await getDocs(q);
      success = true;
      let user = null;
      querySnapshot.forEach((document) => {
        user = document.data();
        delete user.password;
      })
      res.status(200).json({success, user})
    
  } catch (error) {
    success = false;
    res.status(500).json({success, message: 'Internal server error...'})
  }
})



router.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = router;
