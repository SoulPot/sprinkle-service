import * as mqtt from 'mqtt';
import { C2DService } from './C2DService';

const MQTT_HOST = 'mqtt://alesia-julianitow.ovh:9443'
const MQTT_USERNAME = 'soulpot';
const MQTT_PASSWORD = 'soulpot';
const MQTT_CLIENT_ID = 'sprinkle-service';

function initMqtt(): mqtt.Client {
  const client = mqtt.connect(MQTT_HOST, {username: MQTT_USERNAME, password: MQTT_PASSWORD, clientId: MQTT_CLIENT_ID});
  const topic = 'sprink/#';
  client.on('connect', () => {
    client.subscribe(topic, (err: Error) => {
      if (err) { console.error(err.message); return; }
    });
  });
  client.on('disconnect', () => {
    client.end();
  });
  return client;
}

// tslint:disable-next-line: variable-name
function messageCallback(_topic: string, message: Buffer) {
  const deviceId = _topic.split('/')[1];
  const payload = message.toString().replace('\n', '').replace(/\s/g, '');
  console.log(payload);
  const c2dService = new C2DService(deviceId);
  c2dService.send(payload);
}

const main = () => {
  console.log('############## SPRINKLE C2D SERVICE ##############');
  const client = initMqtt();
  client.on('message', messageCallback);
};

main();
