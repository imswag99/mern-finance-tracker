import jwt from 'jsonwebtoken'

const authMiddleware = async(req, res, next) => {
  let token = req.cookies.token;
  
  if(!token) {
    return res.json({success: false, message: "Not authorized. Login again."})
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

export default authMiddleware;