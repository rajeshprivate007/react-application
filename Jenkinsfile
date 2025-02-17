pipeline {
    agent any
    tools {nodejs "nodejs"}

    environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credential')
    registryName = "DemoACR789"
    registryUrl = "demoacr789.azurecr.io"
    registryCredential = "ACR-credentials"
    dockerImage = ''
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
            steps {
                script {
                    def nodeHome = tool name: 'nodejs', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'node -v'  // Verify Node.js version in the pipeline
                sh 'npm -v'   // Verify NPM version
                //sh 'npm install --save-dev mocha chai'
                //sh 'npm run test'
                sh 'npm install sonar-scanner'
                sh 'npm run sonar'
            }
        }
        stage('Build Image') {
            steps {
                echo "Build image"
                sh "docker build -t rajesh7620/node-app:latest ."
            }
        }  
        stage('Dockerhub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Image Push') {
            steps {
                sh 'docker push rajesh7620/node-app:latest'
            }
        }
        stage('Build image for ACR') {
            steps {
                sh 'docker image build -t demoacr789.azurecr.io/node-app:${BUILD_NUMBER} .'
            }
        }
        stage('Azure Login and push Image to ACR') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ACR-credentials', passwordVariable: 'password', usernameVariable: 'username')]){
                    sh 'docker login -u $(username) -p $(password) demoacr789.azurecr.io'
                    sh 'docker image push docker image build -t demoacr789.azurecr.io/node-app:${BUILD_NUMBER}'
                }
            }
        }
    }
    post {
    always {
        sh 'docker logout'
        }
     }
}