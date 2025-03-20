require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const UsersRoutes = require("./routes/UsersRoutes");
const roleRoutes = require("./routes/roleRoutes");
const storeRoutes = require("./routes/storeRoutes");
const messageRoutes = require("./routes/messageRoutes");
const customerRoutes = require("./routes/customerRoutes");
const deliveryAgentRoutes = require("./routes/deliveryAgentRoutes");

const app = express();

// app.use(cors({
//   origin: ['http://localhost:3000', 'http://192.168.1.13:3000'],
//   credentials: true
// }));
app.use(cors({
  origin: ["http://localhost:3000"], // Allow all origins for debugging (change this later)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

app.use("/auth", authRoutes);
app.use("/admin", userRoutes);
app.use("/admiaddinguser", UsersRoutes);
app.use("/admincreatingrole", roleRoutes);
app.use("/admin/store", storeRoutes);
app.use("/api/message", messageRoutes);
app.use("/customer", customerRoutes);
app.use("/delivery-agent", deliveryAgentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
