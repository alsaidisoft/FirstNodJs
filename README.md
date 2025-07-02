# Citizen Feedback Platform 🏛️

A modern, mobile-first citizen feedback and engagement web platform that allows citizens to submit feedback, suggestions, and complaints to local authorities, while enabling government departments to manage and respond to these submissions effectively.

## 🌟 Features

### For Citizens
- **Submit Feedback**: Report issues with location mapping and image uploads
- **Track Progress**: Monitor status updates and responses from authorities
- **Anonymous Reporting**: Option to submit feedback anonymously
- **Mobile Optimized**: Fully responsive design for all devices
- **Multilingual**: Support for Arabic and English languages

### For Authorities
- **Admin Dashboard**: Comprehensive management interface
- **Response Management**: Reply to and update feedback status
- **Analytics**: View statistics and generate reports
- **Department Management**: Organize by government departments
- **Notification System**: Email and SMS alerts for new submissions

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Leaflet.js** - Interactive maps for location reporting
- **React Hook Form** - Form management with validation
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** - Node.js web framework
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database client
- **JWT** - Authentication and authorization
- **Cloudinary** - Image upload and management
- **Nodemailer** - Email notifications
- **Twilio** - SMS notifications

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancing
- **Redis** - Caching and session management

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd citizen-feedback-platform
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   
   # Edit the environment variables
   nano backend/.env
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   npx prisma db seed  # Optional: seed with sample data
   ```

5. **Start Development**
   ```bash
   # Start with Docker Compose
   docker-compose up -d
   
   # Or start individually
   npm run dev:full  # Starts both frontend and backend
   ```

### Docker Development

```bash
# Build and start all services
docker-compose up --build

# Start specific services
docker-compose up frontend backend postgres

# View logs
docker-compose logs -f backend
```

## 📱 Usage

### For Citizens

1. **Submit Feedback**
   - Visit the homepage
   - Click "Submit Feedback"
   - Fill out the form with details
   - Add location and images (optional)
   - Submit anonymously or with account

2. **Track Submissions**
   - Create an account or login
   - View your submission history
   - Receive email/SMS notifications for updates

### For Administrators

1. **Access Admin Panel**
   - Login with admin credentials
   - Navigate to admin dashboard
   - View pending feedback submissions

2. **Manage Feedback**
   - Update submission status
   - Add official responses
   - Assign to departments
   - Generate reports

## 🏗️ Project Structure

```
citizen-feedback-platform/
├── src/                    # Frontend source code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── backend/              # Backend source code
│   ├── src/
│   │   ├── routes/       # Express.js routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   └── types/        # TypeScript types
│   ├── prisma/           # Database schema and migrations
│   └── uploads/          # File upload directory
├── docker-compose.yml    # Docker services configuration
├── nginx/               # Nginx configuration
└── docs/               # Documentation
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/citizen_feedback"
JWT_SECRET="your-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud"
EMAIL_HOST="smtp.gmail.com"
TWILIO_ACCOUNT_SID="your-twilio-sid"
```

#### Frontend
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"
```

## 🚀 Deployment

### Production Deployment

1. **Build Docker Images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Deploy with SSL**
   ```bash
   # Add SSL certificates to nginx/ssl/
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Database Migration**
   ```bash
   docker exec -it backend npx prisma migrate deploy
   ```

### Cloud Deployment Options

- **Vercel** - Frontend deployment
- **Render/Railway** - Full-stack deployment
- **DigitalOcean App Platform** - Containerized deployment
- **AWS ECS/Fargate** - Scalable container deployment

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/guest` - Anonymous session

### Feedback Endpoints
- `GET /api/feedback` - List all feedback
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback/:id` - Get specific feedback
- `GET /api/feedback/stats` - Get statistics

### Admin Endpoints
- `GET /api/admin/dashboard` - Admin dashboard data
- `PUT /api/admin/feedback/:id` - Update feedback status
- `POST /api/admin/response` - Add official response

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
npm test

# Run E2E tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](../../issues)
- **Email**: support@citizenvoice.com

## 🔄 Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] AI-powered categorization
- [ ] Integration with government systems
- [ ] Blockchain verification for transparency

---

**Built with ❤️ for better governance and community engagement**
