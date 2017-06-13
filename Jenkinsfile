#!groovy

pipeline {
    agent any

    stages {
        stage('Pre-build') {
            steps {
                slackSend channel: '@jchiam', color: 'good', message: "Build <$BUILD_URL|$JOB_NAME-$BUILD_NUMBER> started!"
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
        success {
            dir('dist') {
                deleteDir()
            }
            slackSend channel: '@jchiam', color: 'good', message: "Build <$BUILD_URL|$JOB_NAME-$BUILD_NUMBER> succeeded!\nCheck it out at $PRODUCTION_URL"
        }
        failure {
            slackSend channel: '@jchiam', color: 'danger', message: "Build <$BUILD_URL|$BUILD_NUMBER> failed."
        }
        unstable {
            slackSend channel: '@jchiam', color: 'warning', message: "Build <$BUILD_URL|$BUILD_NUMBER> is unstable."
        }
    }
}
