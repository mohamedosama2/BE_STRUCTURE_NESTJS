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
};
