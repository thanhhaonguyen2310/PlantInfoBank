export PRIMARY_DOMAIN_NAME=plantdb.top10.id.vn
export AWS_EC2_USER=pod
sudo mkdir -p /etc/letsencrypt/live/
sudo mkdir -p /etc/letsencrypt/live/${PRIMARY_DOMAIN_NAME}
sudo mkdir -p /var/www/certbot
sudo chmod 755 /etc/letsencrypt/live/
sudo chmod 755 /etc/letsencrypt/live/${PRIMARY_DOMAIN_NAME}
sudo chmod 755 /var/www/certbot
sudo chown -R ${AWS_EC2_USER}:${AWS_EC2_USER} /var/www/certbot