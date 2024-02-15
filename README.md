# Polyfeed Student Dashboard

This is for the frontend (interface) of Monash Polyfeed.

## Run the application locally

1. `npm install` This will install all the required dependencies.
2. `npm start` This will launch the application at localhost:3000

**Be advised as the project involves the usage of firebase and google, you will need to get the relevant firebase config. Please contact the developer to get the config or generate your own one and put it under `src/services` directory.**

## Deployment
1. `npm run build` This will generate the build file that can be used for deployment.
2. Copy the build file to AWS EC2 instance /var/www/html/dashboard (the address that the team is using)

**This is just temporary as we don't have CI/CD setup**

## Copyright
Copyright under Monash University policy.