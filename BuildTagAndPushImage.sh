docker build -t firenza/repository_analytics_ui:latest .
docker image prune -f
docker push firenza/repository_analytics_ui:latest
read -p "Press [Enter] key to exit..."