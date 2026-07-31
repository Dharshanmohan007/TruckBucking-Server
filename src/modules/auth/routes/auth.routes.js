import express from "express";
const router = express.Router();
router.post("/api/signup", (res,res)=>{
    res.json({
        success : true,
        message: "Signup Route Working"
    })
})
export default router;