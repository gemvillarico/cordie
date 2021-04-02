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
            	
                sh 'mvn -Dmaven.test.failure.ignore=true install'
                
                archiveArtifacts artifacts: 'target/*.war'
            }
        }
        
        
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}