-- Initialize database for Plant Information System
-- This script will be automatically executed when MySQL container starts

USE demo3;

-- Create tables if they don't exist
-- Note: Sequelize will handle the actual table creation through migrations
-- This is just to ensure database is ready

-- You can add any initial data or configuration here
-- For example:
-- INSERT INTO genus (name, description) VALUES ('Oryza', 'Rice genus');

-- Set timezone
SET time_zone = '+07:00';

-- Create indexes for better performance
-- These will be created after Sequelize migrations run

DELIMITER $$
CREATE PROCEDURE CreateIndexesIfNotExists()
BEGIN
    -- Check if tables exist before creating indexes
    SET @table_exists = 0;
    
    SELECT COUNT(*) INTO @table_exists 
    FROM information_schema.tables 
    WHERE table_schema = 'demo3' AND table_name = 'species';
    
    IF @table_exists > 0 THEN
        -- Create indexes only if tables exist
        SET @sql = 'CREATE INDEX IF NOT EXISTS idx_species_genus ON species(genusId)';
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        
        SET @sql = 'CREATE INDEX IF NOT EXISTS idx_properties_species ON propertiesvalue(speciesId)';
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END$$
DELIMITER ;

-- Grant privileges
GRANT ALL PRIVILEGES ON demo3.* TO 'plantuser'@'%';
FLUSH PRIVILEGES;
