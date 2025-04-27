import User from "../models/Users.js";
const getUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            return res.status(404).json({message:'User not found'})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Internal server error'})
        
    }
}

const updateUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            user.username = req.body.name || user.username
            if (req.body.password) {
            user.password= req.body.password    
            }
            if (req.body.profilePicture) {
                user.profilePic= req.body.profilePicture
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.username,
                email: updatedUser.email,
                profilePicture: updatedUser.profilePic,
                isAdmin: updatedUser.isAdmin,
            });
        } else {
            res.status(404).json({message:'User not found'})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Internal server error'})
         
    }
}

export {
    updateUserProfile,
    getUserProfile,
}