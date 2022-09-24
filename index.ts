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
import { SocketEvents } from "./src/constants";
import { IEnergyInfo } from "./src/interface";
import moment from "moment";
import { AddEnergyConsumption } from "./src/services/EnergyServices";
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
let socket: Socket;

socketClient.on("connection", (sock) => {
  console.log("new socket connected");
  socket = sock;
  sock.on(SocketEvents.meter, (data) => {
    console.log("meter Status " + data);
    if (parseInt(data) === 1) {
      sock.emit(SocketEvents.meter, 1);
      client.publish("meter", "1");
      socket.emit(SocketEvents.meter, "1");
    } else {
      sock.emit(SocketEvents.meter, 0);
      client.publish("meter", "0");
      socket.emit(SocketEvents.meter, "0");
    }
  });

  sock.on(SocketEvents.maxPower, (data) => {
    console.log("max Power " + data);
    client.publish("max_con", parseFloat(data).toString());
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
  client.subscribe("max_con", { qos: 0 }, (error) => {
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

client.on("message", async function (topic, message) {
  // Called each time a message is received
  console.log("Received message:", topic, message.toString());
  if (topic === "meter") {
    const data = message.toString();
    if (data.length <= 2) {
      socket && socket.emit(SocketEvents.maxPower, data);
    }
  }
  if (topic === "rms_current") {
    console.log(`KWh = ${message}`);
    const energy = parseFloat(message.toString());
    const info: IEnergyInfo = {
      energy: energy,
      date: moment().format(),
    };
    socket && socket.emit(SocketEvents.energy, message.toString());
    await AddEnergyConsumption(info);
  }
});
server.listen(configuration.port, () => {
  console.log(`Server Running on http://localhost:${configuration.port}`);
});
