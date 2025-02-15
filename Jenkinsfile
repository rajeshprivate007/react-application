pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        SONARQUBE_SCANNER = tool 'sonarqube' // Use the name you configured
    }

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
            //def scannerHome = tool 'SonarScanner';
            //withSonarQubeEnv() {
            //sh "${scannerHome}/bin/sonar-scanner"
        }   
        }
    }
}