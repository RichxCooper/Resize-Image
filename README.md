# Image Resizer & Background Remover

A powerful Python application that allows you to resize images and remove backgrounds with a beautiful purple-themed user interface.

## Features

- **Image Resizing**: Resize images to custom dimensions while maintaining quality
- **Background Removal**: Automatically remove backgrounds from images using AI
- **User-Friendly Interface**: Clean, modern GUI with purple theme
- **Real-time Preview**: Side-by-side comparison of original and processed images
- **Multiple Format Support**: Save in PNG, JPEG, and other formats
- **Progress Tracking**: Visual feedback during background removal process

## Requirements

- Python 3.7 or higher
- Windows, macOS, or Linux

## Quick Start

### Option 1: Using Batch Files (Windows)
1. **Install dependencies**: Double-click `install_dependencies.bat`
2. **Run the app**: Double-click `run_app.bat`


### Option 2: Manual Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RichxCooper/Resize-Image.git
   cd Resize-Image
   ```
2. **(Optional) Create and activate a virtual environment:**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```
3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Run the app:**
   ```bash
   python image_resizer.py
   ```

2. **Run the application**:
   ```bash
   python image_resizer.py
   ```

## Usage

### Getting Started

1. **Launch the application** - The main window will open with a purple theme
2. **Select an image** - Click "Select Image" to choose an image file
3. **View images** - Original and processed images are displayed side by side

### Image Resizing

1. **Enter dimensions** - Set desired width and height in the input fields
2. **Resize** - Click "Resize Image" to apply the new dimensions
3. **Preview** - See the resized image in the right panel

### Background Removal

1. **Prepare image** - Load an image with a clear subject
2. **Remove background** - Click "Remove Background" (this may take a few moments)
3. **Wait for processing** - A progress bar shows the background removal status
4. **View result** - The processed image appears with transparent background

### Saving Images

1. **Save processed image** - Click "Save Image" button
2. **Choose format** - Select PNG (supports transparency) or JPEG
3. **Set filename** - Choose save location and filename
4. **Confirm** - Image is saved with appropriate naming convention

## Supported File Formats

- **Input**: PNG, JPG, JPEG, BMP, GIF, TIFF
- **Output**: PNG (with transparency support), JPEG

## Tips for Best Results

### Background Removal
- Use images with clear contrast between subject and background
- Ensure good lighting in the original image
- Simple backgrounds work best
- Higher resolution images generally produce better results

### Image Resizing
- Maintain aspect ratio for best visual quality
- Consider the final use case when choosing dimensions
- Use PNG format when transparency is needed

## Troubleshooting

### Common Issues

1. **Background removal fails**
   - Ensure the image has good contrast
   - Try with a different image
   - Check that the image file is not corrupted

2. **Application won't start**
   - Verify Python 3.7+ is installed
   - Check all dependencies are installed: `pip install -r requirements.txt`
   - Ensure tkinter is available (usually included with Python)

3. **Images don't display properly**
   - Check file format compatibility
   - Ensure image files are not corrupted
   - Try with different image files

### Performance Notes

- Background removal is CPU-intensive and may take several seconds
- Large images will take longer to process
- The application uses threading to prevent UI freezing during background removal

## Technical Details

- **GUI Framework**: Tkinter
- **Image Processing**: Pillow (PIL)
- **Background Removal**: rembg (AI-powered)
- **Threading**: Background processing to maintain UI responsiveness

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

---

**Enjoy using your new Image Resizer & Background Remover!** 🎨✨

