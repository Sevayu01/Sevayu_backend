 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const S_Key = process.env.SKEY;
const bcrypt = require("bcryptjs");
// const Hosptl = require("../models/Hospital.js");
const RET = process.env.RET;
const Hospital = require("../models/Hospital")
const generateAccessToken = (Hospital) => {
  return jwt.sign({ HospitalId: Hospital._id }, S_Key, { expiresIn: "150" });
};
const generateRefreshToken = (Hospital) => {
  return jwt.sign({ HospitalId: Hospital._id }, process.env.RET, { expiresIn: "150" });
};
const refreshTokens = [];
const varify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, S_Key, (err, Hospital) => {
      if (err) {
        return res.sendStatus(403).json("Error In Varifying Token");
      }
      req.Hospital = Hospital;
      next();
    });
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
};

const LoginController = async (req, res) => {
 try{console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    else {
        const hsptl = await Hospital.findOne({ email: email });
         if (!hsptl)
      return res
        .status(400)
        .json({ msg: "Hospital Does not exist , Invalid Credentials" });
        else{
          const ispass =await bcrypt.compare(password, hsptl.password); 
         if(ispass){
              const accessToken = generateAccessToken(hsptl);
            const refreshToken = jwt.sign({ HospitalId: hsptl._id }, process.env.RET);
            refreshTokens.push(refreshToken);
            res.json({
              Hospitalname: hsptl.name,
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
         }
         else{
          res.json("Password Is Not Correct"); 
         }
        
        }
    }


} 
  catch(e){
    console.log(e)
  }

 
};

const RegController = async (req, res) => {
  try{
// console.log(req.body)
    const { name, email, password, postalcode, contact, country, street, city, state, images} =
    req.body;
    console.log(password)
const hosptl = await Hospital.findOne({email : email}); 
if(hosptl){
      return res
        .status(400)
        .json({ message: "This Email Already Assosiated With A Account" });
}
// else res.json({message : "ok"})
// // console.log(hosptl)
    const hashPassword = await bcrypt.hash(password, 10);
    // res.json(hashPassword)
   const hsptl = new Hospital({
      name, email,password :  hashPassword, postalcode, contact, country, street, city, state, images
    });
   const x =  await hsptl.save(); 
    // res.json(x)
 if(x)  { const accessToken = jwt.sign({ HospitalId: hsptl._id }, S_Key, {
      expiresIn: "15m",
    });
        const refreshToken = jwt.sign({ HospitalId: Hospital._id }, RET);
    res.cookie("refreshToken", RET, { httpOnly: true });
    res.json({ accessToken });}
  }catch(err){
    console.log(err); 
    res.json(err);
  }
  
};

const Refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "There Is No Refresh Token" });
    }
    const decoded = jwt.verify(refreshToken, process.env.RET);
    const Hospital = await Hospital.findById(decoded.HospitalId);
    if (!Hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    const accessToken = jwt.sign(
      { HospitalId: Hospital._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const LogoutController = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};
module.exports = {
  LoginController,
  RegController,
  LogoutController,
  varify,
  Refresh,
};
