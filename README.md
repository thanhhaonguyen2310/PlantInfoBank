# Hệ thống Ngân hàng Thông tin Giống Cây trồng Việt Nam

Mục tiêu: Triển khai hệ thống web tổng hợp thông tin giống cây trồng, có tích hợp phân cụm dữ liệu, chạy bằng Docker (MySQL + Backend + Frontend + Adminer).

## Công nghệ sử dụng

- Hạ tầng & Triển khai
  - Docker, Docker Compose: đóng gói và vận hành các dịch vụ.
  - Nginx: phục vụ frontend build.
  - Script triển khai: `deploy.sh` cung cấp các tác vụ deploy, migrate, import, logs…

- Backend API (`/server`)
  - Node.js + Express: xây dựng REST API.
  - Sequelize ORM + mysql2: truy cập MySQL, chạy migrations.
  - JWT (jsonwebtoken) + bcryptjs: xác thực & băm mật khẩu.
  - Tích hợp Python qua `python-shell` để chạy mô-đun ML.
  - ML/DS: Python 3, numpy, pandas, scikit-learn, scipy, matplotlib (tạo ảnh biểu đồ vào `shared_assets/charts`).

- Cơ sở dữ liệu
  - MySQL 8: lưu trữ dữ liệu. 
  - Adminer: giao diện quản trị DB.
  - Import dữ liệu thực từ 2 file legacy `server/src/dl` và `server/src/dl1` thông qua bộ chuyển đổi `server/convert-data.js` → sinh `server/import.sql` chuẩn hóa (utf8mb4, schema hiện tại).

- Frontend Web (`/web`)
  - React + Vite: phát triển; build sản phẩm tĩnh.
  - UI: TailwindCSS, Ant Design; một số thư viện biểu đồ (d3, gojs…).

## Cấu trúc dịch vụ (docker-compose)

- mysql: MySQL 8, khởi tạo DB `demo3`.
- backend: Node.js API server (port 5000), kết nối MySQL, gọi Python scripts.
- frontend: Nginx phục vụ build React (port 3000).
- adminer: Quản trị DB (port 8080).

## Biến môi trường (.env)

- DB_HOST, DB_NAME, DB_USER, DB_PASS: cấu hình kết nối MySQL (mặc định mapping sẵn với compose).
- PORT: cổng backend (mặc định 5000).
- JWT_SECRET: secret để ký/kiểm tra JWT.
- VITE_API_URL: URL API cho frontend build (mặc định http://localhost:5000).

Có thể copy từ `.env.example` sang `.env` và điều chỉnh nếu cần.

## Hướng dẫn triển khai nhanh

1) Chuẩn bị
- Cài Docker & Docker Compose.
- Tạo thư mục chia sẻ: script sẽ tự tạo (`shared_assets/images`, `shared_assets/charts`, `shared_assets/exports`).

2) Triển khai dịch vụ
- Chạy: `./deploy.sh deploy` - cho môi trường production hoặc `./deploy.dev.sh deploy` - cho môi trường dev
  - Dừng phiên cũ (nếu có), build và khởi động các container.
  - Sau khi up thành công, truy cập:
    - Frontend: http://localhost:3000
    - Backend:  http://localhost:5000
    - Adminer:  http://localhost:8080
    - Thông tin đăng nhập Adminer: Server mysql, Username plantuser, Password plantpass123, Database demo3

3) Tạo cấu trúc DB (migrations) + Import dữ liệu thực
- Cách 1 (đề xuất): `./deploy.sh db-full` hoặc `./deploy.dev.sh db-full`
  - Chạy migrations trong container backend.
  - Chuyển đổi dữ liệu legacy bằng `server/convert-data.js` → sinh `server/import.sql` (utf8mb4) và import vào MySQL.
- Cách 2 (từng bước):
  - `./deploy.sh db-setup` hoặc `./deploy.dev.sh db-setup` (chỉ migrations)
  - `./deploy.sh db-import` hoặc `./deploy.dev.sh db-import` (chỉ import dữ liệu thực)

Lưu ý import dữ liệu:
- Script import sẽ tạm tắt khóa ngoại, đặt `SET NAMES utf8mb4` để đảm bảo tiếng Việt hiển thị đúng, sau đó bật lại.
- Dữ liệu nguồn: `server/src/dl`, `server/src/dl1`.
- File kết quả: `server/import.sql` (được sinh tự động khi chạy `db-import` hoặc `db-full`).

## Các tác vụ hữu ích (`deploy.sh`)

- deploy: build và khởi động tất cả dịch vụ.
- db-setup: chạy migrations để tạo cấu trúc bảng.
- db-import: chuyển đổi và import dữ liệu thực.
- db-full: chạy cả migrations và import dữ liệu.
- logs: xem logs toàn bộ dịch vụ (theo dõi sự cố).
- stop: dừng toàn bộ dịch vụ.
- cleanup: dừng + xóa volumes không cần, dọn hệ thống Docker.
- restart: dừng và triển khai lại nhanh.

Ví dụ:
- `./deploy.sh logs` để theo dõi logs.
- `./deploy.sh cleanup && ./deploy.sh deploy && ./deploy.sh db-full` để reset hoàn toàn và khởi tạo từ đầu.

## Kiểm tra & Quản trị

- Kiểm tra container: `docker compose ps`
- Logs từng service: `docker compose logs -f backend` (hoặc mysql/frontend/adminer)
- Truy cập MySQL CLI: `docker compose exec mysql mysql -u plantuser -pplantpass123 demo3`
- Kiểm tra bảng dữ liệu: `SELECT COUNT(*) FROM Species;`

## Ghi chú vận hành

- Charset/collation: đã chuẩn hóa utf8mb4 trong import để tránh lỗi hiển thị tiếng Việt.
- Thư mục chia sẻ: ảnh/biểu đồ ML được sinh tại `shared_assets/charts` và mount vào nginx để frontend có thể truy cập.
- Mật khẩu & secrets: thay đổi trong `.env` khi triển khai thật.
