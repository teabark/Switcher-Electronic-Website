import express from "express";
import cors from "cors"
import authRouter from "./routes/jwtAuth.js"
import ManageUsers from "./routes/ManageUsers/Users.js"
import ProductRoutes from "./routes/ProductRoutes/productRoutes.js"
import cartRoutes from "./routes/CartManagement/cartRoutes.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://switcher-electronic-website-1.onrender.com", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/auth", authRouter);
app.use("/manageusers", ManageUsers)
app.use("/manageproducts", ProductRoutes)
app.use("/cart", cartRoutes)


app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});

app.listen(PORT, (req, res) => {
    console.log(`Server listening on port ${PORT}`);
})