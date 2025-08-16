#!/bin/sh

# Script to import real data from dl and dl1 files
# This script should be run inside the backend container

echo "🗄️  Importing real plant data..."

# Function to execute SQL file
execute_sql() {
    local file=$1
    echo "📥 Importing data from $file..."
    
    # Use docker exec to run mysql command in mysql container
    docker exec plant_mysql mysql -u plantuser -pplantpass123 demo3 < "$file"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully imported $file"
    else
        echo "❌ Failed to import $file"
        exit 1
    fi
}

# Check if files exist
if [ ! -f "src/dl" ]; then
    echo "❌ File src/dl not found"
    exit 1
fi

if [ ! -f "src/dl1" ]; then
    echo "❌ File src/dl1 not found"
    exit 1
fi

echo "🔄 Starting data import process..."

# Import main data
execute_sql "src/dl"

# Import additional image data
execute_sql "src/dl1"

echo "🎉 Data import completed successfully!"
echo "📊 Your database now contains real plant data from Vietnam"
