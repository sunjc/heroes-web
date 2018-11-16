node {
    checkout scm
    stage('install') {
      bat 'npm install'
    }
    stage('test') {
      bat 'ng test --watch=false --progress=false --code-coverage --browsers=ChromeHeadlessCI'
    }
    stage('sonar-scanner') {
      bat 'sonar-scanner -Dsonar.projectKey=heroes-web -Dsonar.sources=src -Dsonar.typescript.lcov.reportPaths=coverage\lcov.info -Dsonar.host.url=http://127.0.0.1:9000/sonar -Dsonar.login=1596abae7b68927b1cecd276d1b5149e86375cb2'
    }
    stage('build') {
      bat 'ng build --prod --base-href=/heroes/'
    }
}
