# News Website Platform

A full-stack news website platform similar to "Youm7" built with Next.js and Nest.js.

## 🚀 Quick Start

### Backend

```bash
cd backend
npm install
createdb news_db
# Configure .env file (see backend/README.md)
npm run seed
npm run start:dev
```

Backend runs at: `http://localhost:3000/api`

### Frontend

```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:3000/api
npm run dev
```

Frontend runs at: `http://localhost:3001`

## 📚 Tech Stack

**Backend:**
- Nest.js
- TypeORM + PostgreSQL
- JWT Authentication
- Cloudinary

**Frontend:**
- Next.js 14 (App Router)
- TailwindCSS
- TypeScript

## 🎨 Design

- **Primary Color**: Blue (`#1e40af`)
- **Separator**: Red (`#dc2626`)
- **Accent**: Gold (`#f59e0b`)
- **Background**: White
- Modern, clean layout

## 📋 Features

### Backend ✅
- JWT authentication
- Full CRUD for categories, subcategories, articles, videos
- Image upload to Cloudinary
- Database seeding
- Input validation

### Frontend (In Progress)
- API client ready
- TypeScript types defined
- Project structure created
- Theme configured

## 🔐 Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 📖 Documentation

See [walkthrough.md](walkthrough.md) for complete documentation.

## 🏗️ Project Structure

```
news_website/
├── backend/          # Nest.js API
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── categories/
│   │   ├── subcategories/
│   │   ├── articles/
│   │   ├── videos/
│   │   └── upload/
│   └── .env
├── frontend/         # Next.js App
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── .env.local
└── README.md
```

## 📝 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=news_db
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🎯 Categories

1. صحة ورشاقة (Health & Fitness)
2. تغذية (Nutrition)
3. صحة تجميلية (Cosmetic Health)
4. صحتك (Your Health)
5. صحة طفلك (Child Health)
6. تشخيص (Diagnosis)
7. رجل (Man)
8. امرأة (Woman)
9. طفل (Child)
10. فيديو (Video)
11. من نحن (About Us)

## 📦 Production Build

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🧪 API Testing

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get categories
curl http://localhost:3000/api/categories

# Get articles
curl http://localhost:3000/api/articles?status=published
```

## 📄 License

Private project

## 👨‍💻 Author

Built with Antigravity AI
