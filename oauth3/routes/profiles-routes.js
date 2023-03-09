const router = require("express").Router();
const authcheck = (req,res,next)=>{
  if(!req.user){
    res.redirect("/auth/login");
  } else {
    next();
  }
}

router.get("/",authcheck,(req,res)=>{
  res.send("you are logged in. This is your profile. " + req.username);
})

module.exports = router;
