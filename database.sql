--- Create `medias` table
CREATE TABLE IF NOT EXISTS `medias` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` ENUM('image', 'audio') NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL,
    `description` TEXT NOT NULL,
    `url` VARCHAR(255) NOT NULL,
);
