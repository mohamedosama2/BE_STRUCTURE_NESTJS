module.exports = {
  apps: [
    {
      name: 'Nest App',
      script: './dist/main.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
    },
    {
      name: 'Consumer',
      script: './dist/message-queue/worker.js',
      instances: 1,
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['143.244.149.248'],
      ref: 'pm2',
      repo: 'https://github.com/Remah-Amr/BE_STRUCTURE_NESTJS',
      path: 'creds.pem',
      'post-deploy': 'npm install',
    },
  },
};
