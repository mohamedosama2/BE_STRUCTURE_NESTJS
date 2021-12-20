module.exports = {
  apps: [
    {
      name: 'Nest App',
      script: './dist/main.js',
    },
    {
      name: 'Consumer',
      script: './dist/message-queue/consumer.service.js',
      instances: 1,
    },
  ],
};
