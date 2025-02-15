pipeline {
    agent any
    tools {nodejs "nodejs"}

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'githubtoken', url: 'https://github.com/rajeshprivate007/react-application.git'
            }
        }
    }
    stages {
        stage('NPM Install') {
            steps {
                sh "npm install"
            }
        }
    }
    stages {
        stage('Build') {
            steps {
                sh "npm start"
            }
        }
    }
}