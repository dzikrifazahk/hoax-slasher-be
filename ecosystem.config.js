module.exports = {
  apps: [
    {
      name: 'nest_be',
      script: 'dist/src/main.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
