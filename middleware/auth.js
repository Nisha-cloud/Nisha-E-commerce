const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.Token_Key);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    else{
    req.user = user;
    next();
}
  } catch (e) {
    // res.status(401).send({ error:error });
    next()
  }
};
module.exports = Auth;