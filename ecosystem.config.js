module.exports = {
  apps: [
    {
      script: './dist/main.js',
    },
    {
      script: './dist/message-queue/consumer.service.js',
    },
  ],
};
