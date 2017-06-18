#!groovy

pipeline {
    agent any

    stages {
        stage('Pre-build') {
            steps {
                slackSend teamDomain: 'jonbecca', channel: '#couply', color: 'good', message: "Build <$BUILD_URL|$JOB_NAME-$BUILD_NUMBER> started!", tokenCredentialId: 'jonbecca-slack-token'
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
            withCredentials([string(credentialsId: 'jonbecca-slack-token', variable: 'SLACK_TOKEN')]) {
                slackSend teamDomain: 'jonbecca', channel: '#couply', color: 'good', message: "Build <$BUILD_URL|$JOB_NAME-$BUILD_NUMBER> succeeded!\nPlease verify at $PRODUCTION_URL", tokenCredentialId: 'jonbecca-slack-token'
            }
        }
        failure {
            withCredentials([string(credentialsId: 'jonbecca-slack-token', variable: 'SLACK_TOKEN')]) {
                slackSend teamDomain: 'jonbecca', channel: '#couply', color: 'danger', message: "Build <$BUILD_URL|$BUILD_NUMBER> failed.", tokenCredentialId: 'jonbecca-slack-token'
            }
        }
        unstable {
            withCredentials([string(credentialsId: 'jonbecca-slack-token', variable: 'SLACK_TOKEN')]) {
                slackSend teamDomain: 'jonbecca', channel: '#couply', color: 'warning', message: "Build <$BUILD_URL|$BUILD_NUMBER> is unstable.", tokenCredentialId: 'jonbecca-slack-token'
            }
        }
    }
}
