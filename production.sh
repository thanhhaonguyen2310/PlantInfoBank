# Set up environment for deploying a web application with Docker and Certbot
export PRIMARY_DOMAIN_NAME=plantdb.top10.id.vn
export USER=pod
sudo mkdir -p /etc/letsencrypt/live/
sudo mkdir -p /etc/letsencrypt/live/${PRIMARY_DOMAIN_NAME}
sudo mkdir -p /var/www/certbot
sudo chmod 777 /etc/letsencrypt/live/
sudo chmod 777 /etc/letsencrypt/live/${PRIMARY_DOMAIN_NAME}
sudo chmod 777 /var/www/certbot
sudo chown -R ${USER}: /var/www/certbot
sudo chown -R ${USER}: /etc/letsencrypt
sudo chown -R ${USER}: /etc/letsencrypt/live
sudo chown -R ${USER}: /etc/letsencrypt/live/${PRIMARY_DOMAIN_NAME}

# Run Docker Compose commands to set up and tear down Certbot for SSL certificate management
docker compose --profile certbot-init up -d
docker compose --profile certbot-init down

# Run the deploy script to set up the web application and database
chmod +x ./deploy.sh
./deploy.sh deploy
./deploy.sh db-full