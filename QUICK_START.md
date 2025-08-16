# Hướng dẫn khởi chạy nhanh

## Yêu cầu hệ thống
- Docker và Docker Compose đã được cài đặt
- Ít nhất 4GB RAM trống
- Cổng 3000, 5000, 3306 chưa được sử dụng

## Cấu hình Production

Hệ thống được cấu hình để chạy ở chế độ production:
- **Frontend**: Nginx serving optimized React build
- **Backend**: Node.js production mode với PM2 (optional)
- **Database**: MySQL với persistent storage
- **Security**: Random JWT secrets và secure headers

## Các bước khởi chạy

### 1. Khởi chạy tự động (Khuyến nghị)
```bash
# Chạy script tự động
./deploy.sh deploy
```

### 2. Khởi chạy thủ công
```bash
# 1. Tạo file môi trường
cp .env.example .env

# 2. Tạo thư mục chia sẻ
mkdir -p shared_assets/{images,charts,exports}

# 3. Build và chạy
docker compose up --build -d

# 4. Kiểm tra trạng thái
docker compose ps
```

## Truy cập ứng dụng

- **Web App**: http://localhost:3000
- **API Server**: http://localhost:5000
- **Database**: localhost:3306

## Các lệnh hữu ích

```bash
# Xem logs
./deploy.sh logs
# hoặc
docker compose logs -f

# Dừng services
./deploy.sh stop

# Khởi động lại
./deploy.sh restart

# Dọn dẹp toàn bộ
./deploy.sh cleanup
```

## Troubleshooting

### Lỗi cổng đã được sử dụng
```bash
# Kiểm tra cổng đang sử dụng
sudo lsof -i :3000
sudo lsof -i :5000
sudo lsof -i :3306

# Thay đổi cổng trong docker-compose.yml nếu cần
```

### Lỗi database connection
```bash
# Kiểm tra MySQL container
docker compose logs mysql

# Kết nối manual để test
docker compose exec mysql mysql -u plantuser -p demo3
```

### Lỗi build Python packages
```bash
# Rebuild backend với --no-cache
docker compose build --no-cache backend
```

## Mobile App Development

Mobile app chạy riêng với Expo:
```bash
cd PlantApp
npm install
npm start
```

Sau đó sử dụng Expo Go app để scan QR code.
