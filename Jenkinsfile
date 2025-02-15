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
    }
}