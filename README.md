# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

# Guide to Deploying the Lottery-FrontEnd Project

This guide will walk you through the process of deploying the "Lottery-FrontEnd" project to production. The project is built using Node.js, and the recommended version is Node.js 16.17.0. We will use a bash script called `check_and_run.sh` to automate the deployment process and ensure that all necessary environment variables are in place. Additionally, you can choose between running the project in development mode or production mode.


# Prerequisites

Before you proceed with the deployment, make sure you have the following prerequisites in place:

1.  Node.js installed (recommended version: 16.17.0)
2.  Yarn package manager installed
3.  Nginx, Apache, or another reverse proxy server set up (if you plan to use one)

# Deployment Steps
## 1. Clone the Project

Clone the **Lottery-FrontEnd** project repository from GitHub to your production server. You can use Git for this purpose.
`git clone git@github.com:RigMartin/Lottery-FrontEnd.git
cd Lottery-FrontEnd`

## 2. Configure Environment Variables

You have two options for configuring environment variables:

#### Option 1: Using `env_checker.sh`

The `check_and_run.sh` script integrates with `env_checker.sh` to scan for necessary environment variables. Ensure that `env_checker.sh` contains all the required environment variables for your "Lottery-FrontEnd" project. If any variables are missing, the script will prompt you to provide them.

#### Option 2: Manually Create an `.env` File

Alternatively, you can manually create an `.env` file in the project directory and populate it with the necessary environment variables. Make sure the `.env` file includes all the required variables specific to the "Lottery-FrontEnd" project.

## 3. Deployment Automation

Run the `check_and_run.sh` script to automate the deployment process:
`./check_and_run.sh`
This script will prompt you to choose between running the project in development or production mode. It will then perform the following actions based on your choice:

-   **Development Mode:** It will use `yarn start` to start the "Lottery-FrontEnd" project in development mode. This is useful for testing and debugging.
    
-   **Production Mode:** It will use `yarn build` to create a production-ready build of the "Lottery-FrontEnd" project. The compiled version will be placed in a `dist` folder within your project directory. You can host this `dist` folder using a reverse proxy server like Nginx or Apache.

#### Note :`For manual build and run, please install dependencies using command `
`yarn install `
`yarn build`

##  4. Hosting the Production Build

If you chose to run the "Lottery-FrontEnd" project in production mode, you can now configure your reverse proxy server (e.g., Nginx or Apache) to serve the `dist` folder as a static website. Here's a basic example of an Nginx configuration:


server {
    listen 80;
    server_name your_domain.com;

    location / {
        root /path/to/Lottery-FrontEnd/dist;
        index index.html;
    }

    # Additional Nginx configuration settings...
}
Make sure to replace `your_domain.com` with your actual domain and `/path/to/Lottery-FrontEnd/dist` with the correct path to your "Lottery-FrontEnd" project's `dist` folder.

## 5. Testing and Maintenance

After deployment, thoroughly test the "Lottery-FrontEnd" application to ensure it's working as expected in a production environment. Monitor the application for any issues, and regularly update environment variables or the project code as needed.

Congratulations! You've successfully deployed the "Lottery-FrontEnd" project to production. You can now access your application through the specified domain or IP address.
