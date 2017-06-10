pipeline {
    agent any

    stages {
        stage('Pre-build') {
            steps {
                git 'https://github.com/jchiam/couply.git'
                sh 'make prebuild'
            }
        }

        stage('Build') {
            steps {
                sh 'make build'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'firebase-token', variable: 'FIREBASE_TOKEN')]) {
                    sh 'make deploy TOKEN=$FIREBASE_TOKEN'
                }
            }
        }
    }

    post {
        always {
            sh 'make cleanup'
        }
    }
}