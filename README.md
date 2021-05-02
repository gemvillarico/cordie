# cordie

Cordie is web-based application that allows multiple users to draw UML diagrams collaboratively in real-time .

![Alt text](resources/screenshots/cordie-screenshot-1.png?raw=true "Screenshot of Cordie Diagram Editor page")

It was created as part of my thesis back when I was in college at the University of the Philippines Manila. Since I wrote it when I was just a student, the initial code was very plain and not optimized. I decided to start making it a side project by slowly improving the design and applying what I've learned throughout my career and applying newer technologies I want to learn. For more information about my thesis, please see http://cas.upm.edu.ph:8080/xmlui/handle/123456789/76

There are two ways to run this application.

## Option 1: Run Using Docker
Requirements
1. Docker

Steps
1. After cloning the cordie source files, go to terminal and change the working directory to where you have downloaded the cordie source code.
2. Start the application by entering following command
```
docker-compose up
```
3. After successful start, open http://localhost:8080/cordie in your browser.
4. You can login using the preexisting username/password mico/mico.
5. To stop, enter the following in terminal
```
docker-compose down
```


## Option 2: Run without Docker
Requirements
1. MySQL 8.0.20
2. WildFly 19
3. Java 8
4. Maven

Steps
1. Import the database\
   1.1. Create a database 'cordie' in terminal:
   ```
   mysql> create database cordie;
   ```
   1.2. Import resources/mysql/cordie.sql using terminal:
   ```
   mysql -u <username> -p cordie < cordie.sql
   ```
   1.3. Create db user 'Cordie' with password 'pSJcwyTNSeLHAAV2' (or you can set to your own password, just make sure to update standalone.xml accordingly):
   ```
   mysql> CREATE USER 'Cordie'@'localhost' IDENTIFIED BY 'pSJcwyTNSeLHAAV2';
   mysql> GRANT ALL PRIVILEGES ON * . * TO 'Cordie'@'localhost';
   mysql> FLUSH PRIVILEGES;
   ```
2. Set up WildFly application server\
   2.1. Download WildFly application server (this application used version 19).\
   2.2. Add the com.mysql module to WildFly by copying resources/wildfly/modules/com/mysql to your ${WildFlyHome}/modules/system/layers/base/com directory.\
   2.3. Update your WildFly standalone.xml to the one in resources/wildfly/standalone.xml
3. On terminal, change the working directory to the cordie directory, then run
```
mvn clean package
```
4. Copy the generated war file on target/cordie.war to ${WildFlyHome}/deployments
5. Start WildFly Server by running the following command on terminal 
```
${WildFlyHome}/bin/standalone.sh
```
6. Open http://localhost:8080/cordie in your browser.
7. You can login using the preexisting username/password mico/mico


