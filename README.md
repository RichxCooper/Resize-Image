# 🖼️ Image Resizer Pro

A modern, feature-rich web application for resizing images, removing backgrounds, and saving in multiple formats. Built with React, Vite, and Tailwind CSS.

## ✨ Features

### 🎯 Image Resizing
- **Custom Dimensions**: Set any width and height in pixels
- **Aspect Ratio Control**: Maintain aspect ratios or use free-form sizing
- **Quick Presets**: Common sizes like 800x600, 1920x1080, 1200x1200
- **Real-time Preview**: See changes instantly as you adjust dimensions

### 🎨 Background Removal
- **AI-Powered Processing**: Advanced algorithms for clean background removal
- **Quality Options**: Choose between low (fast), medium, or high (slow) processing
- **Transparency Support**: Save with transparent backgrounds
- **Before/After Comparison**: Toggle between original and processed images

### 💾 Save & Export
- **Multiple Formats**: PNG, JPEG, WebP, GIF
- **Quality Control**: Adjustable compression for optimal file size
- **Batch Download**: Download all formats at once
- **Custom File Names**: Personalize your saved files
- **File Size Estimates**: Know the output size before saving

### 🚀 User Experience
- **Step-by-Step Workflow**: Intuitive 4-step process
- **Drag & Drop Upload**: Easy image uploading
- **Responsive Design**: Works on desktop and mobile
- **Progress Indicators**: Visual feedback during processing
- **Modern UI**: Beautiful, professional interface

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development
- **Styling**: Tailwind CSS for modern design
- **Image Processing**: HTML5 Canvas API
- **File Handling**: React Dropzone for uploads
- **State Management**: React Context API

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Setup Steps

1. **Clone or download the project**
   ```bash
   # If cloning from git
   git clone <repository-url>
   cd image-resizer-app
   
   # Or navigate to your project folder
   cd "path/to/your/project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to the URL shown in your terminal

## 🚀 Usage

### Step 1: Upload Image
- Drag and drop your image onto the upload area
- Or click to browse and select a file
- Supported formats: PNG, JPG, GIF, BMP, WebP
- Maximum file size: 10MB

### Step 2: Resize & Edit
- Set custom dimensions or use preset sizes
- Choose aspect ratio constraints
- See real-time preview of your changes
- Maintain quality while resizing

### Step 3: Remove Background
- Select processing quality (affects speed vs. accuracy)
- Watch AI process your image in real-time
- Compare before and after results
- Get transparent backgrounds for design work

### Step 4: Save & Download
- Choose your preferred file format
- Adjust quality settings for optimal file size
- Download single format or all formats at once
- Customize file names

## 🔧 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # App header and navigation
│   ├── ImageUpload.jsx # Image upload with drag & drop
│   ├── ImageEditor.jsx # Resize and edit controls
│   ├── BackgroundRemover.jsx # Background removal
│   └── SaveOptions.jsx # Save and export options
├── context/            # React context for state management
│   └── ImageContext.jsx # Image processing state
├── App.jsx            # Main application component
├── main.jsx           # React entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme changes
- Update `src/index.css` for custom component styles
- Use Tailwind utility classes for rapid styling

### Features
- Add new image formats in `SaveOptions.jsx`
- Implement real AI background removal APIs
- Add image filters and effects
- Integrate cloud storage services

## 🌟 Tips for Best Results

### Image Quality
- Use high-resolution source images
- Ensure good lighting and contrast
- Avoid heavily compressed source files

### Background Removal
- High contrast between subject and background
- Clean, simple backgrounds work best
- Avoid similar colors between subject and background

### File Formats
- **PNG**: Best for images with transparency
- **JPEG**: Good for photos with small file sizes
- **WebP**: Modern format with excellent compression
- **GIF**: Use for animated images only

## 🐛 Troubleshooting

### Common Issues

**Image not uploading**
- Check file format (must be image file)
- Ensure file size is under 10MB
- Try refreshing the page

**Background removal not working**
- Wait for processing to complete
- Try different quality settings
- Ensure image has good contrast

**Download not working**
- Check browser download settings
- Ensure sufficient disk space
- Try different file format

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the fast build tool
- HTML5 Canvas API for image processing capabilities

---

**Made with ❤️ for image editing enthusiasts**

For support or questions, please open an issue in the project repository.
