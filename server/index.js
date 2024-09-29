const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const UserModel = require('./models/user');
const AddressModel = require('./models/address');
const connectDB = require('./config/db');

connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());

// Enable CORS 
app.use(cors({
  origin: 'https://smoke-trees-client.vercel.app',
  methods: [ 'GET','POST'],
  allowedHeaders: ['Content-Type']
}));

// POST /register route for user registration and address storage
app.post('/register', async (req, res) => {
  try {
    const { name, address } = req.body;

    // 1. Check if user exists
    let user = await UserModel.findOne({ name });

    if (user) {
      // 2. Check if the user already has addresses in AddressModel
      let userAddress = await AddressModel.findOne({ userId: user._id });
      if (userAddress) {
        // Check if the address already exists in the array
        if (userAddress.addresses.includes(address)) {
          return res.status(200).json({
            message: 'Address already exists for this user',
            user,
            addresses: userAddress.addresses
          });
        } else {
          // Add new address to the array
          userAddress.addresses.push(address);
          await userAddress.save();

          return res.status(200).json({
            message: 'New address added to existing user',
            user,
            addresses: userAddress.addresses
          });
        }
      } 
    } else {
      // 3. If user does not exist, create a new user and address
      user = new UserModel({ name });
      await user.save();

      // Create and save the address for the new user
      const newAddress = new AddressModel({
        userId: user._id,
        addresses: [address] // Add the address to the array
      });
      await newAddress.save();

      return res.status(201).json({
        message: 'New user created and address added',
        user,
        addresses: newAddress.addresses
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user and add address' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
