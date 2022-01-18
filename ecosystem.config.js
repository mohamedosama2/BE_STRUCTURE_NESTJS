module.exports = {
  apps: [
    {
      name: 'Micro-service Main',
      script: './dist/main.js',
      instances: '1',
      exec_mode: 'cluster',
      autorestart: true,
      env_production: {
        NODE_ENV: 'production',
        MONGODB_URI:
          '',
        api_key: 'remah',
        CLOUDINARY_URL:
          'cloudinary://716494354337253:x5gdQ2S2bshPvJ0YmvEwd4715YQ@hamza2021',
        JWT_SECRET: 'supersecret',
        clientID:
          '1017089558534-sg5lphbqs179g9fm3b5qcrigl6l2br20.apps.googleusercontent.com',
        clientSecret: 'd2q1gNN96PNi5Xyb-gI3PFGN',
        TWILIO_AUTH_TOKEN: '21260d2db9e10751a20c5c10a227244b',
        TWILIO_ACCOUNT_SID: 'AC2a7cefcd9c7c7714440d00eca7aa7720',
        TWILIO_ACCOUNT_VERIFY_SID: 'VAdf43c41c1e54c08f202f283e0b100e47',
        facebookUrl:
          'https://graph.facebook.com/v2.12/me?fields=id,name,email,gender,picture{url}',
        cloud_name: 'dqfrk92mp',
        api_key: '253596391863857',
        api_secret: 'zUSdqm663H7lfMKqdirIGZxu318',
        AMQP_URL2:
          'amqps://zcfvyzvh:cKIn4m4ZbwR-Y0lmhAfOFcmlnksvzed5@fox.rmq.cloudamqp.com/zcfvyzvh?heartbeat:60',
        AMQP_URL:
          'amqps://kmuergjm:Q3oBdA_iX3triTcv_2YopwdL4AtHkz8D@jaguar.rmq.cloudamqp.com/kmuergjm?heartbeat=45',
        PORT: 8081,
        PM2_PUBLIC_KEY: 'ct5pc2xkxt2ytgi',
        PM2_SECRET_KEY: 'sbnxf64l4csfksi',
      },
    }
  ],
  deploy: {
    production: {
      // "key"  : ".ssh/creds.pem",
      user: 'root',
      host: ['137.184.25.34'],
      ref: 'microservices-main',
      repo: '',
      path: '/var/www/production8',
      'post-deploy':
        'npm install && npm run build &&  pm2 reload ecosystem.config.js --env production && pm2 save',
    },
  },
};
