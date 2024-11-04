const User = require("../models/user.model")

const userResolvers = {
    Query: {
        user: async (_, { id }) => { // Change getUser to user
            return await User.findById(id);
        },
        users: async () => { // Change getUsers to users
            return await User.find();
        }
    },

    Mutation: {
        addUser: async (_, { name, email }) => { // Change createUser to addUser and username to name
            const user = new User({ name, email });
            return await user.save();
        },
        deleteUser: async (_, { id }) => {
            return await User.findByIdAndDelete(id);
        }
    }
}

module.exports = userResolvers;
