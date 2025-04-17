# Giai đoạn đầu: Sử dụng Node.js để build Frontend
FROM node:20-alpine AS build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép tệp package.json và yarn.lock để cài đặt dependencies
COPY package.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React với react-scripts
RUN yarn build

# Giai đoạn thứ hai: Sử dụng một HTTP server nhẹ để chạy ứng dụng React
FROM node:20-alpine

# Cài đặt `serve` để chạy ứng dụng React
RUN yarn global add serve

# Sao chép build output từ giai đoạn đầu
COPY --from=build /app/build /app/build

# Đặt thư mục làm việc
WORKDIR /app/build

# Expose cổng 3000
EXPOSE 3000

# Khởi chạy ứng dụng bằng `serve`
CMD ["serve", "-s", ".", "-l", "3000"]
