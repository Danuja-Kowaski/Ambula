const router = require('express').Router();
//import model
const User = require('../models/user.model');

//register user to db

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

//login user
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

//get all users
router.get('/api/users', async (req, res) =>{
    try{
        const allUsers = await User.find({});
        console.log(allUsers)
        res.status(200).json(allUsers)
    }catch(err){
        res.json(err);
    }
})

//Get details by userID
router.get('/api/users/:id', async (req, res) =>{
    try{
        const test = await User.findById(req.params.id);
        console.log(test)
        res.status(200).json(test)
    }catch(err){
        res.json(err);
    }
})

module.exports = router;