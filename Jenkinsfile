pipeline {
    agent any
    tools {nodejs "nodejs"}

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'githubtoken', url: 'https://github.com/rajeshprivate007/react-application.git'
            }
        }
        stage('NPM Install') {
            steps {
                sh "npm install"
            }
        }
        stage('Build') {
            steps {
                sh "npm run build"
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def nodeHome = tool name: 'nodejs', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'node -v'  // Verify Node.js version in the pipeline
                sh 'npm -v'   // Verify NPM version
                sh 'npm install --save-dev mocha chai'
                sh 'npm install --save-dev @testing-library/jest-dom'
                sh 'npm install'
                sh 'npm run test'
                sh 'npm run coverage-lcov'
                sh 'npm install sonar-scanner'
                sh 'npm run sonar'
            }
        }
        stage('Build Image') {
            steps {
                echo "Build image"
                //sh "docker build -t my-node-app:1.0 ."
            }
        }   
    }
}