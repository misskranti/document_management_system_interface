# Document Management System

A comprehensive front-end interface for document management built with React/Next.js, featuring user authentication, file upload, search functionality, and document preview capabilities.

## Features

### 🔐 Authentication
- **OTP-based Login**: Secure login using mobile number and OTP verification
- **Admin Panel**: Static admin interface for user creation
- **Role-based Access**: Different interfaces for regular users and administrators

### 📁 Document Management
- **File Upload**: Support for PDF and image files (JPEG, PNG)
- **Categorization**: Dynamic dropdown system for Personal/Professional categories
- **Tagging System**: Add and reuse tags with auto-suggestions
- **Date Management**: Date picker for document organization
- **Remarks**: Additional notes and comments for documents

### 🔍 Search & Filter
- **Advanced Search**: Filter by category, subcategory, tags, and date range
- **Real-time Results**: Instant search results with comprehensive filtering
- **Tag-based Search**: Search using multiple tags with auto-complete

### 👁️ Preview & Download
- **File Preview**: In-app preview for images and PDFs
- **Individual Downloads**: Download specific documents
- **Bulk Download**: Download all documents as ZIP file
- **Responsive Design**: Works seamlessly across all devices

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   
   git clone https://github.com/misskranti/document_management_system_interface.git
   
   cd document_management_system_interface
   

2. **Install dependencies**
   
   npm install
   # or
   yarn install
   

3. **Run the development server**
   
   npm run dev
   # or
   yarn dev
   

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Guide

### Login Process
1. Enter your mobile number (use `9999999999` for admin access)
2. Click "Send OTP" 
3. Enter any 6-digit OTP (demo mode)
4. Access the dashboard

### Uploading Documents
1. Navigate to "Upload Documents" tab
2. Select a PDF or image file
3. Choose date and category (Personal/Professional)
4. Select appropriate subcategory (Names for Personal, Departments for Professional)
5. Add relevant tags
6. Include remarks if needed
7. Click "Upload Document"

### Searching Documents
1. Go to "Search Documents" tab
2. Apply filters:
   - Category and subcategory
   - Date range (from/to)
   - Tags
3. Click "Search Documents"
4. View results in "All Documents" tab

### Document Management
- **Preview**: Click the preview button to view documents
- **Download**: Individual file downloads
- **Bulk Download**: Download all as ZIP

### Admin Features
- Access admin panel (admin users only)
- Create new users with username/password
- View user statistics

## Project Structure


src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main application entry
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── login-form.tsx     # Authentication component
│   ├── dashboard.tsx      # Main dashboard
│   ├── file-upload.tsx    # File upload functionality
│   ├── file-search.tsx    # Search interface
│   ├── file-results.tsx   # Results display
│   └── admin-panel.tsx    # Admin interface
├── lib/
│   ├── auth-store.ts      # Authentication state
│   ├── document-store.ts  # Document management state
│   └── utils.ts          # Utility functions
└── hooks/
    └── use-toast.ts       # Toast notifications


## API Integration

The application is designed to work with the provided .NET backend API. Key endpoints:

- **Authentication**: OTP send/verify endpoints
- **File Upload**: Document upload with metadata
- **Search**: Document search with filters
- **Tags**: Tag management and suggestions

## State Management

### Authentication Store
- Manages login/logout state
- Handles admin privileges
- Persists authentication tokens

### Document Store
- Manages document collection
- Handles search functionality
- Maintains tag suggestions
- Persists uploaded documents

## Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface
- **Tablet**: Adapted layouts and touch-friendly controls
- **Mobile**: Optimized mobile experience

## Development Guidelines

### Commit Strategy
- Incremental commits for each feature
- Meaningful commit messages
- Regular pushes to maintain development history

### Code Quality
- TypeScript for type safety
- ESLint for code consistency
- Component-based architecture
- Reusable UI components

## Testing

Run the application locally and test:
- Authentication flow
- File upload process
- Search functionality
- Document preview/download
- Admin panel features
- Responsive behavior

## Deployment

### Build for Production

npm run build
npm start


### Environment Variables
Configure the following for production:
- API endpoints
- Authentication settings
- File storage configuration

## Future Enhancements

- Real API integration
- Advanced file preview
- User management interface
- Document versioning
- Collaborative features
- Advanced search filters

