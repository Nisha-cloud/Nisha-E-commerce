const Admin = require('../models/Admin')


exports.addAdmin = async(req,res) => 
    
{
    try{
        const { name, password, email} = req.body;
        const AdminImg = req.file ? req.file.filename : null;
        const newAdmin = new Admin({
         name,
         password,
         email,
         AdminImg:"https://directtoyou.herokuapp.com/public/Admin/"+AdminImg
       });
       const saved = await newAdmin.save()
       console.log(saved)
        const token = await newAdmin.generateAuthToken();
        res.status(201).send({saved, token})
    }catch (e){
        res.status(501).send(e)
    }




}

















exports.loginAdmin = async(req,res) => {
    try {
               const admin = await Admin.findByCredentials(req.body.email, req.body.password)
               const token = await admin.generateAuthToken()
              res.status(200).send({admin, token})
                }
            catch (e) {
                res.status(400).send(e)
            }
}

exports.getAdmin = async(req , res) => {
    try {
        const getAdmin = await Admin.find({})
        if(getAdmin){

            return res.status(200).json(getAdmin)

        }
        else {

            res.status(400).send("something bad happened")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}
exports.getbyid = async(req,res) => {
    try {
        const getAdmin = await Admin.find({_id:req.params.id})
        return res.status(200).json(getAdmin)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}
exports.editAdmin = async (req, res) => {
    const { admin } = req.body;
    const adminimg = req.file ? req.file.path : null;
try {
  const updatead = await Admin.findByIdAndUpdate({ 
    _id: ObjectId(req.params.id) 
    },
    {
     admin,
    adminimg:"https://directtoyou.herokuapp.com/public/Admin/"+adminimg

    }
  );
  return res.status(201).json({ msg: "Admin updated successfully" ,
data: updatead});
} catch (error) {
  return res.status(500).json({ msg: error.message });
}
};
exports.logoutAdmin = async(req,res) => {
    try {
                req.admin.tokens = req.admin.tokens.filter((token) => {
                    return token.token !== req.token
                })
                await req.admin.save()
                res.send('Logged out from this device successfully')
            } catch (error) {
                res.status(500).send(error)
            }
}
exports.logoutAdminAll = async(req,res) => {
    try {
        req.admin.tokens = [];
        await req.admin.save()
        res.send('Logout frm all devices successfully')
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.deleteAdmin = async (req, res) => {
    try {
      const deleteAdmin = await Adnin.findByIdAndRemove({
        _id: req.params.id
      });
      console.log(req.params.id)
      return res.status(200).json({ msg: "Admin deleted successfully" ,data:  deleteAdmin});
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
    };