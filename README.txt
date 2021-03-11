MacOS Environment Setup

Java
- Download and install Java https://www.oracle.com/java/technologies/javase-jdk15-downloads.html#license-lightbox
- Find Java installation dir: /usr/libexec/java_home -v15
- Update $PATH variable: sudo nano /etc/paths
- Add Java installation directory, ex: /Library/Java/JavaVirtualMachines/jdk-15.0.2.jdk/Contents/Home
- Verify Java is correctly installed in the system: java -version
Video: https://www.youtube.com/watch?v=pxi3iIy4F5A

Apache Tomcat
- Download apache tomcat https://downloads.apache.org/tomcat/tomcat-10/v10.0.2/bin/apache-tomcat-10.0.2.zip
- Extract it under desired location
- Open terminal and go to the extracted location ex: cd /Users/priti/Workspace/Caltrans/apache-tomcat-10.0.2/bin
- Make .sh files executable: chmod +x *.sh
- Start tomcat ./startup.sh
- Stop tomcat ./shutdown.sh 
- Rename /Users/priti/Workspace/Caltrans/apache-tomcat-10.0.2 folder to Tomcat
- Move Tomcat to /Library/ : sudo mv Tomcat /Library/
Video: https://www.youtube.com/watch?v=h_qQOVDTxo8

Start Tomcat
cd /Library/Tomcat/bin
./startup.sh