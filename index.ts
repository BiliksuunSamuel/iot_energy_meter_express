import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import configuration from "./src/configuration";
import "./src/connection";
import router from "./src/router";
import mqtt from "mqtt";
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
import socketIo, { Socket } from "socket.io";
//
app.use(router);

const options: any = {
  host: "broker.emqx.io",
  port: 1883,
  protocol: "public",
  username: "emqx",
  password: "public",
};

const socketClient = new socketIo.Server(server, { transports: ["websocket"] });
const client = mqtt.connect(options);

socketClient.on("connection", (sock) => {
  console.log("new socket connected");
  socketClient.on("meter_status", (data) => {
    console.log("meter Status " + data);
    if (parseInt(data) === 1) {
      socketClient.emit("meter_status", 1);
      client.publish("meter", "1");
    } else {
      socketClient.emit("meter_status", 0);
      client.publish("meter", "0");
    }
  });
  socketClient.on("max_power", (data) => {
    console.log("max Power " + data);
  });
});
///////////
client.on("connect", function () {
  //client.publish("connection", "server connected");
  //////////////////////
  client.subscribe("meter", { qos: 0 }, (error) => {
    if (error) return console.log(error.message);
  });
  client.subscribe("connection", { qos: 0 }, (error) => {
    if (error) {
      console.log(error.message);
    }
  });
  client.subscribe("peak_power", { qos: 0 }, (error) => {
    error && console.log(error.message);
  });
  client.subscribe("maxCon", { qos: 0 }, (error) => {
    error && console.log(error.message);
  });
  client.subscribe("rms_power", { qos: 0 }, (error) => {
    error && console.log(error.message);
  });
  client.subscribe("rms_current", { qos: 0 }, (error) => {
    error && console.log(error.message);
  });

  console.log("mqtt connected");
});

client.on("message", function (topic, message) {
  // Called each time a message is received
  console.log("Received message:", topic, message.toString());
  if (topic === "meter") {
    const data = message.toString();
    if (data.length <= 2) {
      socketClient.emit("meter_status", data);
    }
  }
});
server.listen(configuration.port, () => {
  console.log(`Server Running on http://localhost:${configuration.port}`);
});
