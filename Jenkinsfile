pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ahilan0143/ecommerce-frontend'
        BACKEND_IMAGE  = 'ahilan0143/ecommerce-backend'
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBE_NAMESPACE = 'ecommerce'
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
        MINIKUBE_HOME = '/var/lib/jenkins/.minikube'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ahilan752/Ecommerce-app.git'
            }
        }

        stage('Docker Login') {
            steps {
                sh 'docker logout || true'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE:$IMAGE_TAG .'
                    sh 'docker tag $BACKEND_IMAGE:$IMAGE_TAG $BACKEND_IMAGE:latest'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE:$IMAGE_TAG .'
                    sh 'docker tag $FRONTEND_IMAGE:$IMAGE_TAG $FRONTEND_IMAGE:latest'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $BACKEND_IMAGE:$IMAGE_TAG'
                sh 'docker push $BACKEND_IMAGE:latest'
                sh 'docker push $FRONTEND_IMAGE:$IMAGE_TAG'
                sh 'docker push $FRONTEND_IMAGE:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/namespace.yaml'
                sh 'sleep 5'
                sh 'kubectl apply -f k8s/backend-secret.yaml'
                sh 'kubectl apply -f k8s/mongo-deployment.yaml'
                sh 'kubectl apply -f k8s/mongo-service.yaml'
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/backend-service.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-service.yaml'
                sh "kubectl set image deployment/backend-deployment backend=$BACKEND_IMAGE:$IMAGE_TAG -n $KUBE_NAMESPACE"
                sh "kubectl set image deployment/frontend-deployment frontend=$FRONTEND_IMAGE:$IMAGE_TAG -n $KUBE_NAMESPACE"
            }
        }
    }
}