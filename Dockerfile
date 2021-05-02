FROM jboss/wildfly:23.0.1.Final

# Appserver
ENV WILDFLY_USER admin
ENV WILDFLY_PASS adminPassword

COPY resources/wildfly/modules/com/mysql /opt/jboss/wildfly/modules/system/layers/base/com/mysql
COPY resources/wildfly/standalone_docker.xml /opt/jboss/wildfly/standalone/configuration/

# Setting up WildFly Admin Console
RUN echo "=> Adding WildFly administrator"
RUN $JBOSS_HOME/bin/add-user.sh -u $WILDFLY_USER -p $WILDFLY_PASS --silent

# Below is temporary; should call maven to create build
COPY target/cordie.war /opt/jboss/wildfly/standalone/deployments/

# Set the default command to run on boot
# This will boot WildFly in the standalone mode and bind to all interface
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-c", "standalone_docker.xml", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]