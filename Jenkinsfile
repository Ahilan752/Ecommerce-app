pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ahilan0143/ecommerce-frontend'
        BACKEND_IMAGE  = 'ahilan0143/ecommerce-backend'
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBE_NAMESPACE = 'ecommerce'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ahilan752/Ecommerce-app.git'
            }
        }

        stage('Docker Login') {
            steps {
                bat 'docker logout'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t %BACKEND_IMAGE%:%IMAGE_TAG% .'
                    bat 'docker tag %BACKEND_IMAGE%:%IMAGE_TAG% %BACKEND_IMAGE%:latest'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t %FRONTEND_IMAGE%:%IMAGE_TAG% .'
                    bat 'docker tag %FRONTEND_IMAGE%:%IMAGE_TAG% %FRONTEND_IMAGE%:latest'
                }
            }
        }

        stage('Push Images') {
            steps {
                bat 'docker push %BACKEND_IMAGE%:%IMAGE_TAG%'
                bat 'docker push %BACKEND_IMAGE%:latest'
                bat 'docker push %FRONTEND_IMAGE%:%IMAGE_TAG%'
                bat 'docker push %FRONTEND_IMAGE%:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s\\namespace.yaml'
                bat 'timeout /t 5 /nobreak'
                bat 'kubectl apply -f k8s\\backend-secret.yaml'
                bat 'kubectl apply -f k8s\\mongo-deployment.yaml'
                bat 'kubectl apply -f k8s\\mongo-service.yaml'
                bat 'kubectl apply -f k8s\\backend-deployment.yaml'
                bat 'kubectl apply -f k8s\\backend-service.yaml'
                bat 'kubectl apply -f k8s\\frontend-deployment.yaml'
                bat 'kubectl apply -f k8s\\frontend-service.yaml'
                bat 'kubectl set image deployment/backend-deployment backend=%BACKEND_IMAGE%:%IMAGE_TAG% -n %KUBE_NAMESPACE%'
                bat 'kubectl set image deployment/frontend-deployment frontend=%FRONTEND_IMAGE%:%IMAGE_TAG% -n %KUBE_NAMESPACE%'
            }
        }
    }
}