#!/usr/bin/env node
const AWS = require('aws-sdk');
const yargs = require('yargs/yargs');

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 [options] <message>")
  .example("$0 -w path/to/endpoint -i connect_id Hello World",)
  .option("aws-region", {
    alias: "r",
    describe: "AWS Regoin"
  })
  .option("websocket", {
    alias: "w",
    describe: "WebSocket URL (without wss://)",
    demandOption: true
  })
  .option("connection-id", {
    alias: "i",
    describe: "Connection ID",
    demandOption: true
  })
  .option("message", {
    alias: "m",
    describe: "Message to send"
  })
  .help("h").alias("h", "help")
  .argv;

const apigwManagementApi = new AWS.ApiGatewayManagementApi({
  apiVersion: '2018-11-29',
  region: argv.awsRegion,
  endpoint: argv.websocket
});
const params = {
  ConnectionId: argv.connectionId,
  Data: argv.message
};
const res = apigwManagementApi.postToConnection(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  }
});
