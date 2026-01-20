# Deployment Guide - Hostinger VPS

This guide provides step-by-step instructions for deploying the News Website to a Hostinger VPS.

## Prerequisites

- Hostinger VPS with Ubuntu 20.04+
- Domain name configured to point to your VPS IP
- SSH access to your VPS
- GitHub account

## Quick Deployment Checklist

- [ ] Push code to GitHub
- [ ] Configure VPS server
- [ ] Set up deploy keys
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Set up database
- [ ] Deploy application
- [ ] Configure Nginx
- [ ] Set up SSL

## Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
cd /home/belal/Documents/news_website
git init
git add .
git commit -m "Initial commit: News website platform"

# Add remote and push
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/news-website.git
git push -u origin main
```

## Step 2: VPS Initial Setup

### Connect to VPS

```bash
ssh root@your-vps-ip
```

### Update system

```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js 18

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Verify installation
```

### Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Install PM2

```bash
sudo npm install -g pm2
```

### Install Git

```bash
sudo apt install git -y
```

## Step 3: Generate and Configure Deploy Key

### On VPS

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "deploy@news-website" -f ~/.ssh/news_website_deploy

# Display public key
cat ~/.ssh/news_website_deploy.pub
```

### On GitHub

1. Go to your repository → Settings → Deploy keys
2. Click "Add deploy key"
3. Title: `VPS Production Server`
4. Paste the public key
5. Click "Add key"

### Configure SSH on VPS

```bash
# Create SSH config
cat >> ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/news_website_deploy
    IdentitiesOnly yes
EOF

# Set permissions
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/news_website_deploy

# Test connection
ssh -T git@github.com
```

## Step 4: Database Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt, run:
CREATE DATABASE news_db;
CREATE USER news_user WITH ENCRYPTED PASSWORD 'SecretPassword123';
GRANT ALL PRIVILEGES ON DATABASE news_db TO news_user;
\q
```

## Step 5: Clone and Setup Project

```bash
# Create application directory
sudo mkdir -p /var/www/news-website
sudo chown $USER:$USER /var/www/news-website
cd /var/www/news-website

# Clone repository
git clone git@github.com:Belalnajy/sono.git .

# Create logs directory
mkdir -p logs
```

## Step 6: Configure Environment Variables

### Backend Environment

```bash
cd /var/www/news-website/backend
cp .env.example .env
nano .env
```

Update with your production values:

```env
NODE_ENV=production
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=news_user
DB_PASSWORD=YOUR_SECURE_PASSWORD
DB_NAME=news_db

JWT_SECRET=YOUR_VERY_SECURE_JWT_SECRET_AT_LEAST_32_CHARS

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

FRONTEND_URL=https://sonomedix.cloud
```

### Frontend Environment

```bash
cd /var/www/news-website/frontend
cp .env.local.example .env.local
nano .env.local
```

Update with your domain:

```env
NEXT_PUBLIC_API_URL=https://sonomedix.cloud/api
```

## Step 7: Install Dependencies and Build

### Backend

```bash
cd /var/www/news-website/backend
npm install --production
npm run build
```

### Frontend

```bash
cd /var/www/news-website/frontend
npm install --production
npm run build
```

## Step 8: Seed Database

```bash
cd /var/www/news-website/backend
npm run seed
```

## Step 9: Start Applications with PM2

```bash
cd /var/www/news-website
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the instructions to enable auto-start
```

Verify applications are running:

```bash
pm2 status
pm2 logs
```

## Step 10: Configure Nginx

### Create Nginx configuration

```bash
sudo nano /etc/nginx/sites-available/news-website
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name sonomedix.cloud www.sonomedix.cloud;

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 10M;
    }

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/news-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 11: Set Up SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d sonomedix.cloud -d www.sonomedix.cloud

# Test auto-renewal
sudo certbot renew --dry-run
```

## Step 12: Verify Deployment

### Check application status

```bash
pm2 status
pm2 logs --lines 50
```

### Test endpoints

```bash
# Test backend
curl https://sonomedix.cloud/api/categories

# Test frontend
curl -I https://sonomedix.cloud
```

### Access in browser

Visit `https://sonomedix.cloud` and verify:

- [ ] Homepage loads correctly
- [ ] Articles are displayed
- [ ] Admin login works
- [ ] Images load from Cloudinary
- [ ] SSL certificate is valid

## Future Deployments

For subsequent deployments, simply run:

```bash
cd /var/www/news-website
./deploy.sh
```

## Troubleshooting

### Application won't start

```bash
pm2 logs --err
pm2 restart all
```

### Database connection errors

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check database exists
sudo -u postgres psql -l | grep news_db

# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### Nginx errors

```bash
# Check Nginx status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t
```

### Port already in use

```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :3001

# Kill the process if needed
sudo kill -9 PID
```

## Monitoring

### View application logs

```bash
pm2 logs
pm2 logs news-backend
pm2 logs news-frontend
```

### Monitor resources

```bash
pm2 monit
htop
```

### Check disk space

```bash
df -h
```

## Backup

### Manual database backup

```bash
sudo -u postgres pg_dump news_db > /var/backups/news_db_$(date +%Y%m%d).sql
```

### Automated backups

Add to crontab:

```bash
crontab -e
```

Add this line for daily backups at 2 AM:

```
0 2 * * * sudo -u postgres pg_dump news_db > /var/backups/news_db_$(date +\%Y\%m\%d).sql
```

## Security Recommendations

1. **Firewall**: Configure UFW

   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

2. **Fail2Ban**: Protect against brute force

   ```bash
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   ```

3. **Regular Updates**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Strong Passwords**: Use strong passwords for database and JWT secret

5. **Environment Files**: Never commit `.env` files to Git

## Support

For issues, check:

- PM2 logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/`
- PostgreSQL logs: `/var/log/postgresql/`
- Application logs: `/var/www/news-website/logs/`
