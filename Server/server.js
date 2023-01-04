const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { urlnotfound, errorHandler } = require("./middleware/errorhandler");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

dotenv.config({ path: "./config/config.env" });
const jwt = require("jsonwebtoken");

connectDB();
const app = express();
const WebSocket = require("ws");
const http = require("http").createServer(app);
const wss = new WebSocket.Server({ server: http });

// 100k request per 15 min
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, 
});
app.use(limiter);
// set security http headers
app.use(helmet());
app.use(mongoSanitize());
// when user input malicious html
app.use(xss());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("/api/user", require("./routes/users"));
app.use("/api/product", require("./routes/product"));
app.use("/api/review", require("./routes/review"));
app.use("/api/order", require("./routes/order"));
app.use("/api/category", require("./routes/category,roles,scales"));
app.use("/api/site", require("./routes/adminsiteandsettings"));
app.use("/api/package", require("./routes/package"));
app.use("/api/blog", require("./routes/blog"));


wss.on("connection", function connection(ws) {
  console.log("A new client connected");
  // ws.send('welcome new client')
  ws.on("message", function incoming(message) {
    //console.log("message recieved", message);
    //console.log(JSON.parse(message).token)
    try {
      const decoded = jwt.verify(
        JSON.parse(message).token,
        process.env.myjwt42
      );
      // splice token and send, token imp should'nt send everyone
      if (decoded) {
        const data = JSON.parse(message);
        delete data["token"];
        // sending message to all clients, needs improvement send mesasge to specific client only
        wss.clients.forEach(function each(client) {
          if (client != ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(JSON.stringify(data)));
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(urlnotfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(
    `Server is running on PORT${PORT} in ${process.env.NODE_ENV} mode`
  );
});
