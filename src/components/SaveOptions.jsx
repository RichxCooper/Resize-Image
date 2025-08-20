import React, { useState, useRef } from 'react'
import { useImage } from '../context/ImageContext'

const SaveOptions = ({ onBack }) => {
  const { processedImage, editedImage, originalImage, targetDimensions } = useImage()
  const [selectedFormat, setSelectedFormat] = useState('png')
  const [quality, setQuality] = useState(90)
  const [fileName, setFileName] = useState('processed-image')
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef(null)

  const formatOptions = [
    { id: 'png', label: 'PNG', description: 'Lossless, supports transparency', extension: '.png' },
    { id: 'jpg', label: 'JPEG', description: 'Good compression, smaller file size', extension: '.jpg' },
    { id: 'webp', label: 'WebP', description: 'Modern format, excellent compression', extension: '.webp' },
    { id: 'gif', label: 'GIF', description: 'Supports animation, limited colors', extension: '.gif' }
  ]

  const qualityOptions = [
    { value: 100, label: 'Maximum (100%)' },
    { value: 90, label: 'High (90%)' },
    { value: 80, label: 'Good (80%)' },
    { value: 70, label: 'Medium (70%)' },
    { value: 60, label: 'Low (60%)' }
  ]

  const getImageToSave = () => {
    // Use processed image if available, otherwise use edited image
    return processedImage || editedImage || originalImage
  }

  const downloadImage = async () => {
    const imageToSave = getImageToSave()
    if (!imageToSave) return

    setIsProcessing(true)

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      // Create a new image element
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = targetDimensions.width
        canvas.height = targetDimensions.height
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // Convert to selected format
        let mimeType, dataUrl
        
        switch (selectedFormat) {
          case 'png':
            mimeType = 'image/png'
            dataUrl = canvas.toDataURL(mimeType)
            break
          case 'jpg':
            mimeType = 'image/jpeg'
            dataUrl = canvas.toDataURL(mimeType, quality / 100)
            break
          case 'webp':
            mimeType = 'image/webp'
            dataUrl = canvas.toDataURL(mimeType, quality / 100)
            break
          case 'gif':
            mimeType = 'image/gif'
            dataUrl = canvas.toDataURL(mimeType)
            break
          default:
            mimeType = 'image/png'
            dataUrl = canvas.toDataURL(mimeType)
        }
        
        // Create download link
        const link = document.createElement('a')
        link.download = `${fileName}${formatOptions.find(f => f.id === selectedFormat).extension}`
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        setIsProcessing(false)
      }
      
      img.src = imageToSave
    } catch (error) {
      console.error('Error saving image:', error)
      setIsProcessing(false)
    }
  }

  const downloadAllFormats = async () => {
    const imageToSave = getImageToSave()
    if (!imageToSave) return

    setIsProcessing(true)

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        canvas.width = targetDimensions.width
        canvas.height = targetDimensions.height
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // Download each format
        formatOptions.forEach((format, index) => {
          setTimeout(() => {
            let mimeType, dataUrl
            
            switch (format.id) {
              case 'png':
                mimeType = 'image/png'
                dataUrl = canvas.toDataURL(mimeType)
                break
              case 'jpg':
                mimeType = 'image/jpeg'
                dataUrl = canvas.toDataURL(mimeType, quality / 100)
                break
              case 'webp':
                mimeType = 'image/webp'
                dataUrl = canvas.toDataURL(mimeType, quality / 100)
                break
              case 'gif':
                mimeType = 'image/gpif'
                dataUrl = canvas.toDataURL(mimeType)
                break
              default:
                mimeType = 'image/png'
                dataUrl = canvas.toDataURL(mimeType)
            }
            
            const link = document.createElement('a')
            link.download = `${fileName}-${format.id}${format.extension}`
            link.href = dataUrl
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            if (index === formatOptions.length - 1) {
              setIsProcessing(false)
            }
          }, index * 500) // Stagger downloads
        })
      }
      
      img.src = imageToSave
    } catch (error) {
      console.error('Error saving images:', error)
      setIsProcessing(false)
    }
  }

  const getFileSizeEstimate = () => {
    const imageToSave = getImageToSave()
    if (!imageToSave) return 'Unknown'
    
    const pixels = targetDimensions.width * targetDimensions.height
    let bytesPerPixel = 4 // RGBA
    
    switch (selectedFormat) {
      case 'jpg':
        bytesPerPixel = 3 // RGB
        break
      case 'gif':
        bytesPerPixel = 1 // Indexed color
        break
    }
    
    const estimatedBytes = (pixels * bytesPerPixel * quality) / 100
    const mb = estimatedBytes / (1024 * 1024)
    
    return mb < 1 ? `${Math.round(estimatedBytes / 1024)}KB` : `${mb.toFixed(1)}MB`
  }

  if (!getImageToSave()) {
    return (
      <div className="text-center">
        <p className="text-gray-600">No image to save</p>
        <button onClick={onBack} className="btn-secondary mt-4">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Panel */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Save Your Image
          </h2>

          {/* File Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="input-field"
              placeholder="Enter file name"
            />
          </div>

          {/* Format Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">File Format</h3>
            <div className="space-y-2">
              {formatOptions.map((format) => (
                <label key={format.id} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="format"
                    value={format.id}
                    checked={selectedFormat === format.id}
                    onChange={() => setSelectedFormat(format.id)}
                    className="mr-3 mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{format.label}</div>
                    <div className="text-sm text-gray-500">{format.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Quality Settings */}
          {selectedFormat !== 'png' && selectedFormat !== 'gif' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          )}

          {/* File Size Estimate */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              Estimated file size: <span className="font-medium">{getFileSizeEstimate()}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Dimensions: {targetDimensions.width} × {targetDimensions.height} pixels
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-3">
            <button
              onClick={downloadImage}
              disabled={isProcessing}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Download ${selectedFormat.toUpperCase()}`}
            </button>
            
            <button
              onClick={downloadAllFormats}
              disabled={isProcessing}
              className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Download All Formats'}
            </button>
          </div>

          {/* Navigation */}
          <div className="mt-6">
            <button onClick={onBack} className="btn-secondary w-full">
              ← Back
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Final Preview</h3>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="text-center text-sm text-gray-600 mb-2">
              {selectedFormat.toUpperCase()} Format
            </div>
            <div className="text-center text-xs text-gray-500">
              Quality: {quality}% | Size: {getFileSizeEstimate()}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={getImageToSave()}
              alt="Final Preview"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-800">
              <span className="text-lg mr-2">✅</span>
              <div>
                <div className="font-medium">Ready to Download</div>
                <div className="text-sm text-green-700">
                  Your image has been processed and is ready to save
                </div>
              </div>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            className="hidden"
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

export default SaveOptions
