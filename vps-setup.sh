#!/bin/bash
# Quick Setup Script for VPS - sonomedix.cloud
# Run this script on your VPS after cloning the repository

set -e

echo "🚀 Setting up News Website on VPS..."

# Configuration
DOMAIN="sonomedix.cloud"
DB_NAME="news_db"
DB_USER="news_user"
DB_PASSWORD="SecretPassword123"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Step 1: Creating database...${NC}"
sudo -u postgres psql << EOF
CREATE DATABASE ${DB_NAME};
CREATE USER ${DB_USER} WITH ENCRYPTED PASSWORD '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
\q
EOF
echo -e "${GREEN}✓ Database created${NC}"

echo -e "${YELLOW}Step 2: Setting up backend environment...${NC}"
cd /var/www/news-website/backend
cp .env.production .env
echo -e "${GREEN}✓ Backend .env configured${NC}"

echo -e "${YELLOW}Step 3: Installing backend dependencies...${NC}"
npm install --production
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

echo -e "${YELLOW}Step 4: Building backend...${NC}"
npm run build
echo -e "${GREEN}✓ Backend built${NC}"

echo -e "${YELLOW}Step 5: Seeding database...${NC}"
npm run seed
echo -e "${GREEN}✓ Database seeded${NC}"

echo -e "${YELLOW}Step 6: Setting up frontend environment...${NC}"
cd /var/www/news-website/frontend
cp .env.production .env.local
echo -e "${GREEN}✓ Frontend .env configured${NC}"

echo -e "${YELLOW}Step 7: Installing frontend dependencies...${NC}"
npm install --production
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo -e "${YELLOW}Step 8: Building frontend...${NC}"
npm run build
echo -e "${GREEN}✓ Frontend built${NC}"

echo -e "${YELLOW}Step 9: Creating logs directory...${NC}"
cd /var/www/news-website
mkdir -p logs
echo -e "${GREEN}✓ Logs directory created${NC}"

echo -e "${YELLOW}Step 10: Starting applications with PM2...${NC}"
pm2 start ecosystem.config.js
pm2 save
echo -e "${GREEN}✓ Applications started${NC}"

echo ""
echo -e "${GREEN}🎉 Setup completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure Nginx (see DEPLOYMENT.md Step 10)"
echo "2. Set up SSL certificate (see DEPLOYMENT.md Step 11)"
echo ""
echo "Check application status: pm2 status"
echo "View logs: pm2 logs"
