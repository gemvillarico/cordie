pipeline {
    agent any
    
    stages {
        stage ('Initialize') {
            steps {
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn -Dmaven.test.failure.ignore=true install' 
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}