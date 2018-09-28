node {
    checkout scm
    stage('install') {
      bat 'npm install'
    }
    stage('sonar-scanner') {
      bat 'sonar-scanner -Dsonar.projectKey=heroes-web -Dsonar.sources=. -Dsonar.host.url=http://127.0.0.1:9000/sonar -Dsonar.login=1596abae7b68927b1cecd276d1b5149e86375cb2'
    }
    stage('build') {
      bat 'ng build --prod --base-href=/heroes/'
    }
}
