#!/bin/bash

# News Website Deployment Script
# This script automates the deployment process on the VPS

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Configuration
APP_DIR="/var/www/news-website"
BACKUP_DIR="/var/backups/news-website"
DATE=$(date +%Y%m%d_%H%M%S)

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Navigate to app directory
cd $APP_DIR

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup database
print_warning "Creating database backup..."
sudo -u postgres pg_dump news_db > $BACKUP_DIR/news_db_$DATE.sql
print_success "Database backed up to $BACKUP_DIR/news_db_$DATE.sql"

# Pull latest changes from GitHub
print_warning "Pulling latest changes from GitHub..."
git pull origin main
print_success "Code updated from GitHub"

# Backend deployment
print_warning "Deploying backend..."
cd backend
npm install --production
npm run build
print_success "Backend built successfully"

# Frontend deployment
print_warning "Deploying frontend..."
cd ../frontend
npm install --production
npm run build
print_success "Frontend built successfully"

# Restart applications with PM2
print_warning "Restarting applications..."
cd ..
pm2 restart ecosystem.config.js
print_success "Applications restarted"

# Wait for apps to start
sleep 3

# Check PM2 status
print_warning "Checking application status..."
pm2 status

# Health check
print_warning "Running health checks..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/categories || echo "000")
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 || echo "000")

if [ "$BACKEND_STATUS" = "200" ] || [ "$BACKEND_STATUS" = "304" ]; then
    print_success "Backend is healthy (HTTP $BACKEND_STATUS)"
else
    print_error "Backend health check failed (HTTP $BACKEND_STATUS)"
fi

if [ "$FRONTEND_STATUS" = "200" ] || [ "$FRONTEND_STATUS" = "304" ]; then
    print_success "Frontend is healthy (HTTP $FRONTEND_STATUS)"
else
    print_error "Frontend health check failed (HTTP $FRONTEND_STATUS)"
fi

# Clean up old backups (keep last 7 days)
print_warning "Cleaning up old backups..."
find $BACKUP_DIR -name "news_db_*.sql" -mtime +7 -delete
print_success "Old backups cleaned up"

echo ""
print_success "🎉 Deployment completed successfully!"
echo ""
echo "To view logs, run: pm2 logs"
echo "To monitor apps, run: pm2 monit"
