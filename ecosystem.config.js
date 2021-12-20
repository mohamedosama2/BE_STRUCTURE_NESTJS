module.exports = {
  apps: [
    {
      name: 'Nest App',
      script: './dist/main.js',
      instances: '3',
      exec_mode: 'cluster',
    },
    {
      name: 'Consumer',
      script: './dist/message-queue/consumer.service.js',
      instances: 1,
    },
  ],
};
