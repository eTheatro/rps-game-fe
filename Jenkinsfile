pipeline {

  agent any

  tools {
    dockerTool 'docker'
    nodejs 'node18.9.0'
    //'com.cloudbees.jenkins.plugins.customtools.CustomTool' 'kubectl'
  }

  stages {
          stage("Build") {
            steps {
              sh 'npm -v'
            }
          }//stage end


        //  stage('Docker') {
          //        steps {
            //          sh 'docker login --username azamani --password Caciopee*00'
              //        sh 'docker build -t azamani/rps-game:latest'
                //      sh 'docker push azamani/rps-game:latest'
                 // }
          //}//stage end


        stage('Apply Kubernetes files') {
            steps {
      
              withKubeConfig([caCertificate: 'K8S_CA_CERT', credentialsId: 'k8s', serverUrl: 'https://kubernetes.docker.internal:6443',  contextName: 'docker-desktop', clusterName: 'docker-desktop']) {
                sh 'which curl'
                sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                sh 'chmod u+x ./kubectl'
                sh './kubectl --insecure-skip-tls-verify create ns test ||true 2>/dev/null'
                sh './kubectl --insecure-skip-tls-verify apply -f manifest.yaml ||true 2>/dev/null'

                sh './kubectl --insecure-skip-tls-verify create secret docker-registry rpskanikosec --docker-server=https://index.docker.io/v2/ --docker-username=azamani --docker-password=Caciopee*00 --docker-email=amn.zmi@gmail.com ||true 2>/dev/null'
                sh './kubectl --insecure-skip-tls-verify apply -f kaniko.yaml ||true 2>/dev/null'

              }
            }//steps end
          }//stage end
    
    
      }//stages end
}//pipeline end