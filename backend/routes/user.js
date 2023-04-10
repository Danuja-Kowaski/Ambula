const router = require('express').Router();
const User = require('../models/user.model');

//Register user to db
router.post('/api/auth/register', async (req, res) => {
    try{
        const body = req.body;
        const savedUser = await new User({ ...body }).save();
        res.status(200).json('User Added successfully')
    }catch(err){
        if (err.code === 11000) {
            res.status(409).json({ message: 'Username already exists' });
          } else {
            // For any other error, return the error message
            res.status(500).json({ error: err.message });
          }
    }
})

//Login user
router.post('/api/auth/login', async (req, res) => {
    try{
        const body = req.body;
        const user = await User.findOne({ username : body.username })
        if (user){
            if (user.password === body.password && user.user_type === "admin"){
                return res.status(200).json('Admin logged in successfully');
            }
            else if (user.password === body.password){
                return res.status(200).json('User logged in successfully');
            }
            return res.status(401).json({ message: 'Invalid username or password' });  
        }
        return res.status(401).json({ message: 'Invalid username or password' });
        }catch(err){
        res.json(err);
    }
})

//Get all users
router.get('/api/users', async (req, res) =>{
    try{
        const allUsers = await User.find({});
        if (allUsers){
            res.status(200).json(allUsers)
        }
        res.status(400).send({ message : "No user data" })
        
    }catch(err){
        res.json(err);
    }
})

//Get details of a user by Id
router.get('/api/users/:id', async (req, res) =>{
    try{
        const User = await User.findById(req.params.id);
        if(User){
            res.status(200).json(User)
        }
    }catch(err){
        res.json(err);
    }
})
//Update user details using Id
router.put('/api/user/:id', async (req, res) => {
    try{
        const updateUser =  await User.findByIdAndUpdate(req.params.id, {$set : req.body});
        res.status(200).json('User updated');
    }catch(err){
        res.json(err);
    }
})
//Delete user details using Id
router.delete('/api/delfood/:id', async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        console.log(deleteUser)
        if(deleteUser){
            res.status(200).json(deleteUser)
        }
    }catch(err){
        res.json(err);
    }  
})
module.exports = router;