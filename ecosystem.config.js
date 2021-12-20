module.exports = {
  apps: [
    {
      name: 'Nest App',
      script: './dist/main.js',
      instances: '1',
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      exec_mode: 'cluster',
    },
  ],
};
