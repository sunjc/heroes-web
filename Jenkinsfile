pipeline {
  agent any
  tools {
    nodejs 'nodejs-10.15'
  }
  stages {
    stage("Clone Source") {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/master']],
          extensions: [
            [$class: 'RelativeTargetDirectory', relativeTargetDir: 'heroes-web']
          ],
          userRemoteConfigs: [[url: 'https://github.com/sunjc/heroes-web']]
        ])
      }
    }
    stage("Build Angular") {
      steps {
        dir('heroes-web') {
          sh 'npm install'
          sh 'ng config -g cli.warnings.versionMismatch false'
          sh 'ng build --prod --base-href=/heroes/'
        }
      }
    }
    stage("Build Image") {
      steps {
        dir('heroes-web/dist') {
          sh 'oc start-build heroes-web --from-dir . --follow'
        }
      }
    }
  }
}
