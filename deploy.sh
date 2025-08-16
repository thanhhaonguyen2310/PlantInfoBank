#!/bin/bash

# Plant Information System - Docker Deployment Script
# This script helps you deploy the system using Docker

set -e

echo "🌱 Plant Information System - Docker Deployment"
echo "================================================"

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! docker compose version &> /dev/null; then
        echo "❌ Docker Compose is not available. Please install Docker Compose first."
        exit 1
    fi
    
    echo "✅ Docker and Docker Compose are installed"
}

# Function to setup environment file
setup_env() {
    if [ ! -f ".env" ]; then
        echo "📝 Creating .env file from template..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
        else
            echo "JWT_SECRET=your-secret-key-here" > .env
        fi
        echo "✅ .env file created. Please review and update the configuration."
    else
        echo "✅ .env file already exists"
    fi
}

# Function to create shared directories
create_directories() {
    echo "📁 Creating shared directories..."
    mkdir -p shared_assets/images
    mkdir -p shared_assets/charts
    mkdir -p shared_assets/exports
    echo "✅ Directories created"
}

# Function to build and start services
deploy() {
    echo "🚀 Building and starting services..."
    
    # Stop any existing containers
    docker compose down
    
    # Build and start services
    docker compose up --build -d
    
    echo "⏳ Waiting for services to be ready..."
    sleep 30
    
    # Check if services are running
    if docker compose ps | grep -q "Up"; then
        echo "✅ Services are running successfully!"
        
        echo ""
        echo "🌐 Access URLs:"
        echo "  Frontend:  http://localhost:3000"
        echo "  Backend:   http://localhost:5000"
        echo "  Adminer:   http://localhost:8080"
        echo ""
        echo "💾 Database credentials for Adminer:"
        echo "  Server:    mysql"
        echo "  Username:  plantuser"
        echo "  Password:  plantpass123"
        echo "  Database:  demo3"
        echo ""
        echo "📋 Next steps:"
        echo "  1. Setup database: ./deploy.sh db-full"
        echo "  2. Access application: http://localhost:3000"
    else
        echo "❌ Some services failed to start. Check logs with: ./deploy.sh logs"
        exit 1
    fi
}

# Function to setup database (migrations only)
setup_database() {
    echo "🗄️  Setting up database structure..."
    docker compose exec backend npm run db:setup
    echo "✅ Database structure created"
    echo "💡 To import real plant data, run: ./deploy.sh db-import"
}

# Function to import real plant data
import_data() {
    echo "📥 Importing real plant data from Vietnam..."
    
    echo "🔧 Preparing database for data import..."
    docker exec -i plant_mysql mysql -u plantuser -pplantpass123 demo3 << 'EOF'
-- Disable foreign key checks and set SQL mode for data import
SET foreign_key_checks = 0;
SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
EOF
    
    if [ $? -eq 0 ]; then
        echo "✅ Database prepared for import"
    else
        echo "❌ Failed to prepare database"
        exit 1
    fi
    
    echo "� Converting legacy data using Node.js script..."
    docker exec plant_backend node /usr/src/app/convert-data.js
    if [ $? -ne 0 ]; then
        echo "❌ Data conversion failed."
        exit 1
    fi

    echo "📥 Importing main plant data from converted file..."
    # Ensure utf8mb4 for this session
    docker exec -i plant_mysql mysql -u plantuser -pplantpass123 demo3 -e "SET NAMES utf8mb4; SET character_set_client=utf8mb4; SET character_set_connection=utf8mb4; SET character_set_results=utf8mb4;" >/dev/null 2>&1 || true
    # The node script creates import.sql inside the container at /usr/src/app/import.sql
    # which is mapped to the host's server/import.sql
    docker exec -i plant_mysql mysql -u plantuser -pplantpass123 demo3 < server/import.sql

    if [ $? -eq 0 ]; then
        echo "✅ Successfully imported main data"
    else
        echo "❌ Failed to import main data"
        exit 1
    fi
    
    # Note: Additional raw dl1 import removed. Images & DetailImages are already handled in import.sql
    
    # Re-enable foreign key checks
    docker exec -i plant_mysql mysql -u plantuser -pplantpass123 demo3 -e "SET foreign_key_checks = 1;"
    
    echo "✅ Real plant data imported successfully!"
    echo "📊 Database now contains real Vietnamese plant species data!"
}

# Function to full database setup (migrations + data import)
full_database_setup() {
    echo "🗄️  Setting up database with real data..."
    docker compose exec backend npm run db:setup
    import_data
    echo "✅ Database setup completed with real plant data!"
}

# Function to show logs
show_logs() {
    echo "📋 Showing service logs..."
    docker compose logs -f
}

# Function to stop services
stop() {
    echo "🛑 Stopping services..."
    docker compose down
    echo "✅ Services stopped"
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up..."
    docker compose down -v
    docker system prune -f
    echo "✅ Cleanup completed"
}

# Main menu
case "${1:-}" in
    "deploy")
        check_docker
        setup_env
        create_directories
        deploy
        ;;
    "db-setup")
        setup_database
        ;;
    "db-import")
        import_data
        ;;
    "db-full")
        full_database_setup
        ;;
    "logs")
        show_logs
        ;;
    "stop")
        stop
        ;;
    "cleanup")
        cleanup
        ;;
    "restart")
        stop
        check_docker
        setup_env
        create_directories
        deploy
        ;;
    *)
        echo "Usage: $0 {deploy|db-setup|db-import|db-full|logs|stop|cleanup|restart}"
        echo ""
        echo "Commands:"
        echo "  deploy      - Setup and deploy the system"
        echo "  db-setup    - Create database structure (migrations only)"
        echo "  db-import   - Import real plant data from Vietnam"
        echo "  db-full     - Complete database setup (structure + data)"
        echo "  logs        - Show service logs"
        echo "  stop        - Stop all services"
        echo "  cleanup     - Stop services and clean up"
        echo "  restart     - Restart all services"
        echo ""
        echo "🌱 Quick Start Guide:"
        echo "  1. Deploy:    ./deploy.sh deploy"
        echo "  2. Setup DB:  ./deploy.sh db-full"
        echo "  3. Access:    http://localhost:3000"
        exit 1
        ;;
esac
