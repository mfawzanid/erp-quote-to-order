import express from "express";
import quoteRoute from "./routes/quoteRoute";
import customerRoute from "./routes/customerRoute";
import productRoute from "./routes/productRoute";
import salesOrderRoute from "./routes/salesOrderRoute";
import authRoute from "./routes/authRoute";
import cors from "cors";

const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

app.use("/customers", customerRoute)
app.use("/quotations", quoteRoute);
app.use("/products", productRoute)
app.use("/sales-orders", salesOrderRoute)
app.use("/auth", authRoute)

app.get("/", (req, res) => {
    res.send("status is ok");
});

app.use((req, res) => {
    res.status(404).json({ message: "route not found" });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
