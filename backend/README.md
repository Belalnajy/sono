# News Website Backend

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (running locally on port 5432)
- npm

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables:
Edit `.env` file with your database credentials and Cloudinary settings:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=news_db

JWT_SECRET=your_secret_key
JWT_EXPIRATION=1d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=3000
FRONTEND_URL=http://localhost:3001
```

3. Create the database:
```bash
createdb news_db
```

4. Run database migrations and seed:
```bash
npm run seed
```

This will create:
- Admin user (username: `admin`, password: `admin123`)
- All categories (صحة ورشاقة, تغذية, etc.)
- Sample subcategories

### Running the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at: `http://localhost:3000/api`

## API Endpoints

### Public Endpoints
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/articles` - Get all published articles
- `GET /api/articles/:id` - Get article by ID
- `GET /api/videos` - Get all videos

### Admin Endpoints (Require JWT Token)
- `POST /api/auth/login` - Admin login
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- (Similar endpoints for subcategories, videos, and users)

## Project Structure
```
backend/
├── src/
│   ├── articles/         # Articles module
│   ├── auth/             # Authentication (JWT)
│   ├── categories/       # Categories module
│   ├── subcategories/    # Subcategories module
│   ├── users/            # Users module
│   ├── videos/           # Videos module
│   ├── upload/           # Cloudinary upload service
│   ├── database/         # Seed scripts
│   ├── app.module.ts     # Main app module
│   └── main.ts           # Entry point
├── .env                  # Environment variables
└── package.json
```
