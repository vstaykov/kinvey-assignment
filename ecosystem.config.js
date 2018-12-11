const config = {
  apps: [
    {
      name: "api",
      script: "./server/services/api/index.js",
      output: "",
      error: "",
      max_restarts: 5,
      min_uptime: "10s",
      instances: 2,
      env: {
        NODE_ENV: "production",
        DB_PRIMARY_URL: "",
        DB_SECONDARY_URL: "",
        DB_ARBITER_URL: "",
        DB_NAME: "",
        DB_PROTOCOL: "",
        DB_REPLICA_NAME: "",
        API_PORT: "",
        API_LOG_PATH: "",
        API_LOG_NAME: "",
        REDIS_HOST: "",
        REDIS_PORT: ""
      }
    },
    {
      name: "order-fulfillment-monitor",
      script: "./server/services/order-fulfillment-monitor/index.js",
      output: "",
      error: "",
      max_restarts: 5,
      min_uptime: "10s",
      instances: 1,
      env: {
        NODE_ENV: "production",
        REDIS_HOST: "",
        REDIS_PORT: "",
        KINVEY_USER: "",
        KINVEY_SECRET: "",
        KINVEY_APP: ""
      }
    }
  ]
};

module.exports = config;
