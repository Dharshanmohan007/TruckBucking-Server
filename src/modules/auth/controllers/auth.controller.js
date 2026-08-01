const signup = async (req,res)=>{
    try{
        res.status(200).json({
            success:true,
            message: "Signup Route is Working"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Interval Server Error"
        })
    }
}
module.exports = {
    signup
};