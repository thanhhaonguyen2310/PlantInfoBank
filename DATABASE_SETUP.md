# 🌱 Hệ thống Thông tin Cây trồng Việt Nam

## Hướng dẫn Triển khai và Sử dụng

### 📋 Yêu cầu hệ thống
- Docker và Docker Compose
- 4GB RAM trống
- 10GB dung lượng ổ cứng

### 🚀 Triển khai hệ thống

#### Bước 1: Khởi chạy hệ thống
```bash
./deploy.sh deploy
```

#### Bước 2: Thiết lập cơ sở dữ liệu
```bash
# Tùy chọn 1: Thiết lập đầy đủ (khuyến nghị)
./deploy.sh db-full

# Tùy chọn 2: Thiết lập từng bước
./deploy.sh db-setup    # Tạo cấu trúc bảng
./deploy.sh db-import   # Import dữ liệu thực
```

### 🌐 Truy cập hệ thống

| Dịch vụ | URL | Mô tả |
|---------|-----|-------|
| **Frontend** | http://localhost:3000 | Giao diện người dùng |
| **Backend API** | http://localhost:5000 | API server |
| **Adminer** | http://localhost:8080 | Quản trị cơ sở dữ liệu |

### 💾 Thông tin Database cho Adminer

```
Server:    mysql
Username:  plantuser
Password:  plantpass123
Database:  demo3
```

### 🔧 Các lệnh quản lý

```bash
# Xem logs hệ thống
./deploy.sh logs

# Dừng hệ thống
./deploy.sh stop

# Khởi động lại
./deploy.sh restart

# Dọn dẹp hoàn toàn
./deploy.sh cleanup
```

### 📊 Quản lý Database

#### Thực hiện migrations trực tiếp trong container:
```bash
# Chạy migrations
docker compose exec backend npm run db:migrate

# Import dữ liệu thực
docker compose exec backend npm run db:import

# Thiết lập đầy đủ
docker compose exec backend npm run db:full-setup
```

#### Truy cập MySQL trực tiếp:
```bash
# Kết nối MySQL
docker compose exec mysql mysql -u plantuser -pplantpass123 demo3

# Xem danh sách bảng
docker compose exec mysql mysql -u plantuser -pplantpass123 demo3 -e "SHOW TABLES;"
```

### 📁 Cấu trúc dữ liệu

Hệ thống bao gồm dữ liệu thực về:
- **Giống lúa**: Thông tin chi tiết về các giống lúa Việt Nam
- **Thuộc tính cây trồng**: Đặc điểm sinh học, hình thái
- **Hình ảnh**: Thư viện ảnh các loại cây trồng
- **Phân bố địa lý**: Vùng trồng và nguồn gốc

### 🐛 Xử lý sự cố

#### Database trống:
```bash
# Kiểm tra kết nối database
docker compose exec backend npm run db:migrate

# Import lại dữ liệu
./deploy.sh db-import
```

#### Container không khởi động:
```bash
# Xem logs lỗi
./deploy.sh logs

# Khởi động lại
./deploy.sh restart
```

#### Reset hoàn toàn:
```bash
# Dọn dẹp và triển khai lại
./deploy.sh cleanup
./deploy.sh deploy
./deploy.sh db-full
```

### 💡 Lưu ý quan trọng

1. **Dữ liệu thực**: File `dl` và `dl1` chứa dữ liệu thực về cây trồng Việt Nam
2. **MySQL 8.0**: Sử dụng MySQL 8.0 với cấu hình tối ưu
3. **Volume**: Dữ liệu được lưu trữ trong Docker volume, không mất khi restart
4. **Network**: Tất cả services chạy trong một network riêng

### 🔍 Kiểm tra hệ thống

#### Kiểm tra services đang chạy:
```bash
docker compose ps
```

#### Kiểm tra dữ liệu đã import:
```bash
# Đếm số species
docker compose exec mysql mysql -u plantuser -pplantpass123 demo3 -e "SELECT COUNT(*) FROM species;"

# Xem một số species
docker compose exec mysql mysql -u plantuser -pplantpass123 demo3 -e "SELECT * FROM species LIMIT 5;"
```

### 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra logs: `./deploy.sh logs`
2. Xem trạng thái containers: `docker compose ps`
3. Reset hệ thống: `./deploy.sh cleanup && ./deploy.sh deploy`
