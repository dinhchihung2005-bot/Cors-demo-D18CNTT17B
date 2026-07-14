const express = require("express");

const app = express();

// Cho phép đọc JSON gửi lên
app.use(express.json());

// Cấu hình CORS (cố tình có lỗ hổng)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // Trả lời Preflight
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});                                                         

// API nạn nhân
app.get("/api/user", (req, res) => {
    res.json({
        id: 1,
        name: "Dinh Chi Hung",
        email: "dinhchihung@gmail.com",
        phone: "0377336655"
    });
});

// API hacker nhận dữ liệu bị đánh cắp
app.post("/steal", (req, res) => {

    console.log("\n===== DATA STOLEN =====");
    console.log(req.body);
    console.log("=======================\n");

    res.status(200).json({
        message: "Data received successfully"
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});