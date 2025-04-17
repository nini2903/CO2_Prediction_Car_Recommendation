# Sử dụng Python base image
FROM python:3.11-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy mã nguồn và các file cần thiết
COPY . /app

# Cài đặt các dependencies từ requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Mở port mà ứng dụng sẽ chạy
EXPOSE 8000

# Lệnh để chạy Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
