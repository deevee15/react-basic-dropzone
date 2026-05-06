module.exports = {
  apps: [{
    name: "dropzone-lib",
    cwd: "/var/www/dropzone-lib/packages/demo",
    script: "npx",
    args: "tsx --tsconfig ./tsconfig.json server.ts",
    instances: 'max',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: "production",
      BASE: "/", 
    },
    env_development: {
      NODE_ENV: "development",
      BASE: "/",  
    },
    max_memory_restart: '2G',
    out_file: './logs/pm2_out.log',
    error_file: './logs/pm2_errors.log',
    time: true
  }]
}