
pipeline {



  agent any

  environment {
     newImageName = ""
   }

  tools {
    dockerTool 'docker'
    //nodejs 'node18.9.0'
    //'com.cloudbees.jenkins.plugins.customtools.CustomTool' 'kubectl'
  }

  stages {
          //stage("Build") {
            //steps {
              //sh 'npm install'
              //sh 'npm run build'
            //}
          //}//stage end
        //  stage('Docker') {
          //        steps {
            //          sh 'docker login --username azamani --password Caciopee*00'
              //        sh 'docker build -t azamani/rps-game:latest'
                //      sh 'docker push azamani/rps-game:latest'
                 // }
          //}//stage end


        stage('Apply Kubernetes files') {
            steps {

               script {
                def inspectExitCode = sh script: "./kubectl version", returnStatus: true
                  if (inspectExitCode == 0) {
                      sh "echo kubectl already installed."
                  } else {
                    sh "echo installing kubectl..."
                    sh 'which curl'
                    sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                    sh 'chmod u+x ./kubectl'
                  }  
               }  
      
              withKubeConfig([caCertificate: 'K8S_CA_CERT', credentialsId: 'k8s', serverUrl: 'https://kubernetes.docker.internal:6443',  contextName: 'docker-desktop', clusterName: 'docker-desktop']) {

                sh './kubectl --insecure-skip-tls-verify create ns test ||true 2>/dev/null'
                //sh './kubectl --insecure-skip-tls-verify apply -f manifest.yaml ||true 2>/dev/null'

                sh './kubectl --insecure-skip-tls-verify delete secret rpskanikosec'
                sh './kubectl --insecure-skip-tls-verify create secret docker-registry rpskanikosec --docker-server=https://index.docker.io/v2/ --docker-username=azamani --docker-password=Caciopee*00 --docker-email=amn.zmi@gmail.com ||true 2>/dev/null'
                sh './kubectl --insecure-skip-tls-verify delete job kaniko ||true 2>/dev/null'

                
                //1) get the current image name
                //sh './kubectl --insecure-skip-tls-verify get deployment rps-game -o=jsonpath="{$.spec.template.spec.containers[:1].image}" > tag.txt'
                //2) change the tag and save it in temp file tag.txt
                //sh 'sed -r "s/app_version/${env.BUILD_NUMBER}/" tag.txt'
                //3) remove simple quote from the tag and get the final tag
                //sh 'sed -e \"s/\'//g\" tag.txt > newImageName'

                //4) change kaniko image name with the new tag ${env.BUILD_NUMBER}
                sh  'sed -e "s/app_version/$BUILD_NUMBER/g" kaniko.yaml > _kaniko.yaml'
                //5) apply kaniko and push docker image to docker registry
                sh './kubectl --insecure-skip-tls-verify apply -f _kaniko.yaml ||true 2>/dev/null'

                sh 'echo Building docker image with KANIKO...'
                sh './kubectl wait --for=condition=complete --timeout=300s job/kaniko'
                sh 'echo Docker image built and published to docker registry using KANIKO.'
              
                //6) Do a rolling update using the new tag
                sh './kubectl --insecure-skip-tls-verify set image deployment/rps-game rps-game=azamani/rps-game:$BUILD_NUMBER --record'
                //sh './kubectl --insecure-skip-tls-verify rollout restart deployment rps-game'

              }
            }//steps end
          }//stage end
    
    
      }//stages end
}//pipeline end