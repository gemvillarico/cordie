pipeline {
    agent any
    
    tools {
        maven 'Maven 3.6.3'
    }
    
    stages {
        stage ('Initialize') {
            steps {
	            echo 'Initializing...'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building...'
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