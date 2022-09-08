pipeline {

  agent any

  tools {
    dockerTool 'docker'
    nodejs 'node18.9.0'
    curl 'curl'
  }

  stages {
          stage("Build") {
            steps {
              sh 'npm -v'
            }
          }//stage end


          stage('Docker') {
                  steps {
                      sh 'docker -v'
                  }
          }//stage end


        stage('Apply Kubernetes files') {
            steps {
              script {

                  def response = sh(script: "curl -s https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl", returnStdout: true).trim()

                  def inspectExitCode = sh script: "./kubectl version", returnStatus: true
                  if (inspectExitCode == 0) {
                      sh "echo kubectl already installed."
                  } else {
                    sh "echo installing kubectl..."
                    sh '/usr/bin/curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                    sh 'chmod u+x ./kubectl'
                  }  
              }//script end



              withKubeConfig([caCertificate: 'K8S_CA_CERT', credentialsId: 'k8s', serverUrl: 'https://kubernetes.docker.internal:6443',  contextName: 'docker-desktop', clusterName: 'docker-desktop']) {
                sh './kubectl --insecure-skip-tls-verify create ns test ||true 2>/dev/null'
              }
            }//steps end
          }//stage end
    
    
      }//stages end
}//pipeline end