pipeline {
    agent any
    tools {nodejs "nodejs"}

    environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credential')
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'githubtoken', url: 'https://github.com/rajeshprivate007/react-application.git'
                sh 'cd react-app-chart && helm dependency update'
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
        stage('Trivy Vulnerability Scan') {
            steps {
                sh """
                trivy image --exit-code 1 --severity CRITICAL,HIGH rajesh7620/node-app:latest || echo 'Vulnerabilities found!'
                """
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
                    withCredentials([usernamePassword(credentialsId: 'ACR-credentials', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                    sh 'echo $PASSWORD | docker login demoacr789.azurecr.io -u $USERNAME --password-stdin'
                    sh 'docker push demoacr789.azurecr.io/node-app:${BUILD_NUMBER}'
                }
            }
        }
        stage('Docker Run') {
            steps {
                script {
                    sh """
                    docker pull demoacr789.azurecr.io/node-app:${BUILD_NUMBER}
                    docker run -d -p 8096:3000 --rm --name myContainer demoacr789.azurecr.io/node-app:${BUILD_NUMBER}
                    """
                }
            }
        }
        stage('Deploy to AKS') {
            steps {
                script {
                    sh """
                        az login --identity
                        az aks get-credentials --resource-group "aks-resource-group" --name "my-aks-cluster" --overwrite-existing
                        helm upgrade --install react-app ./react-app-chart \
                        --set buildNumber=${BUILD_NUMBER} \
                        --namespace default
                    """
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