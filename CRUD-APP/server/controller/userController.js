import User from "../model/userModel.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        const saveData = await userData.save();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}


export const update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const options = { new: true }; // to return the modified document
        const updatedUser = await User.findByIdAndUpdate(userId, updates, options);
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}


export const remove = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}


