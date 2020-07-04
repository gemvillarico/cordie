# cordie

Cordie is web-based application that allows multiple users to draw UML diagrams collaboratively in real-time (think of it as somewhat like the Google Docs).

It was created as my Special Problem / Thesis back when I was in college in University of the Philippines Manila. As I have written it when I was a mere student, the initial code was very basic and even not optimized. I decided to start making it a side project by slowly improving the design and applying what I've learned throughout my career and applying newer technologies that I want to learn. For more information about my thesis, please see http://cas.upm.edu.ph:8080/xmlui/handle/123456789/76

Requirements
1. MySQL 8.0.20
2. Eclipse (I used Version: 2019-12 (4.14.0))
3. WildFly 19
4. Java 8
5. Maven

A. Steps on importing the database
1. Create a database 'cordie' in terminal:
```
mysql> create database cordie;
```

2. Import resources/mysql/cordie.sql using terminal:
```
mysql -u <username> -p cordie < cordie.sql
```

3. Create db user 'Cordie' with password 'pSJcwyTNSeLHAAV2' (or you can set to your own password, just make sure to update standalone.xml accordingly):
```
mysql> CREATE USER 'Cordie'@'localhost' IDENTIFIED BY 'pSJcwyTNSeLHAAV2';
mysql> GRANT ALL PRIVILEGES ON * . * TO 'Cordie'@'localhost';
mysql> FLUSH PRIVILEGES;
```

B. Set up WildFly application server
1. Download WildFly application server (this application used version 19).
2. Add the com.mysql module to WildFly by copying resources/wildfly/modules/com/mysql to your ${WildFlyHome}/modules/system/layers/base/com directory.
3. Update your WildFly standalone.xml to the one in resources/wildfly/standalone.xml


C. Running project
1. Clone the repository into your workspace
2. Open project in Eclipse
3. Right click project > Run as > Maven clean
4. Right click project > Run as > Run on Server > Choose WildFly (Make sure that WildFly is added on Servers on Eclipse)

