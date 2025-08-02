# Neeiz API

## Environment Variables

สร้างไฟล์ `.env` ใน root directory ของโปรเจค (ไม่ใช่ใน apps/api) และเพิ่ม:

```env
PORT=3001
NODE_ENV=production
FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_service_account_json
LINE_CHANNEL_ID=your_line_channel_id
```

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm --filter @neeiz/api dev

# Build
pnpm --filter @neeiz/api build

# Run production build
pnpm --filter @neeiz/api start
```

## Docker Deployment

```bash
# Build image
docker build -f apps/api/Dockerfile -t neeiz-api .

# Run container
docker run -p 3001:3001 --env-file .env neeiz-api
```

## CapRover Deployment

1. ตรวจสอบว่าไฟล์ `captain-definition` ชี้ไปที่ `./apps/api/Dockerfile`
2. ตั้งค่า Environment Variables ใน CapRover dashboard
3. Deploy ผ่าน Git หรือ upload tar file

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/line` - LINE authentication