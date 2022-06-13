
'use strict';
import { Message } from 'azure-iot-common';
import { Client } from 'azure-iothub';

export class C2DService {
    public connectionString: string;
    public targetDevice: string; // get from mqtt topic
    public serviceClient: any; // TODO: TYPE TO DEFINE

    constructor(deviceId: string) {
        // tslint:disable-next-line:max-line-length
        this.connectionString = 'HostName=fr-analyzers-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=rajhFvgFqAylUEuw78ZZpEie2fpXbk0pkvOepDPczVQ=';
        this.targetDevice = deviceId;
        this.serviceClient = Client.fromConnectionString(this.connectionString);
    }

    public send(payload: string) {
        this.serviceClient.open((err) => {
            if (err) {
            console.error('Could not connect: ' + err.message);
            } else {
            console.log('Service client connected');
            this.serviceClient.getFeedbackReceiver(this.receiveFeedback);
            const message = new Message(payload);
            message.ack = 'full';
            message.messageId = 'todo uuid';
            console.log('Sending message: ' + message.getData());
            this.serviceClient.send(this.targetDevice, message, this.printResultFor('send'));
            }
        });
    }

    private printResultFor(op: any) {
        return function printResult(err, res) {
            if (err) { console.log(op + ' error: ' + err.toString()); }
            if (res) { console.log(op + ' status: ' + res.constructor.name); }
        };
    }

    private receiveFeedback(err, receiver){
        receiver.on('message', (msg) => {
            console.log('Feedback message:');
            console.log(msg.getData().toString('utf-8'));
        });
    }
}