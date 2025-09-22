# Running the application from service port
The docker image from dockerhub able to deploy to Minikube. But the application not able to accessible from nodeport. its working with service port.

minikube service <service name> --url

the URL on the output will help in accessing the application. but its with local ip and with service port.

