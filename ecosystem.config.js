module.exports = {
  apps: [
    {
      name: 'Consumer',
      script: './dist/message-queue/consumer.service.js',
      instances: 1,
    },
  ],
};
