Soulpot C2D service
===========================

Description
-----------

Service to broadcast mqtt borker msessages to azure cloud devices on sprink topic

### It contains:

```json
"devDependencies": {
    "@types/express": "^4.16.1",
    "nodemon": "^2.0.7",
    "ts-node": "^9.1.1",
    "tslint": "^5.12.1",
    "typescript": "^3.3.3"
  },
  "dependencies": {
    "express": "^4.16.4"
  }
```

How to use ?
============
1. Install packages: ``` npm install ```    
2. Start the app:    ``` npm start ```  

Done!

Docker
======
Official image:
[julianitow/sprinkle-service](https://hub.docker.com/repository/docker/julianitow/sprinkle-c2d-service)

Development
===========
> ``` npm run start:watch```  
Will start the app and will watch for changes
