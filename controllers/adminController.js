import User from "../models/Users.js"



const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);

    } catch (error) {
        console.log('cannot get the users')
        res.status(500).json({message:'Internal server'})
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);

    } catch (error) {
        console.log('cannot get the users')
        res.status(500).json({message:'Internal server'})
    }
}
const deleteUser = async (req, res) => {
    try {
        const deleted = await User.deleteOne({ _id: req.params.id });
        if ( deleted.deletedCount ==0) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log('cannot get the users')
        res.status(500).json({ message: 'Internal server' })
    }
}
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.name || user.username;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin ?? user.isAdmin

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });

        } else {
            res.status(404).json({ message: 'User not found' });     
        }

    } catch (error) {
        console.log('cannot get the users')
        res.status(500).json({message:'Internal server'})
    }
}


export {getAllUsers,getUserById,deleteUser,updateUser}