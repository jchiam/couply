pipeline {
  agent any

  stages {
    stage('Pre-Build') {
      steps {
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
        sh 'make deploy'
      }
    }
  }
}
