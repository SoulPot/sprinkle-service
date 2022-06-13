"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = __importStar(require("mqtt"));
const C2DService_1 = require("./C2DService");
function initMqtt() {
    const client = mqtt.connect('mqtt://alesia-julianitow.ovh:9443');
    const topic = 'sprink/#';
    client.on('connect', () => {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
        });
    });
    return client;
}
// tslint:disable-next-line: variable-name
function messageCallback(_topic, message) {
    const deviceId = _topic.split('/')[1];
    const payload = message.toString().replace('\n', '').replace(/\s/g, '');
    console.log(payload);
    const c2dService = new C2DService_1.C2DService(deviceId);
    c2dService.send(payload);
}
const main = () => {
    console.log('############## SPRINKLE C2D SERVICE ##############');
    const client = initMqtt();
    client.on('message', messageCallback);
};
main();
//# sourceMappingURL=app.js.map