import React, { useState, useEffect, useRef } from 'react'
import { useImage } from '../context/ImageContext'

const BackgroundRemover = ({ onNext, onBack }) => {
  const { editedImage, dispatch } = useImage()
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [resultImage, setResultImage] = useState(null)
  const [removalQuality, setRemovalQuality] = useState('high')
  const [showOriginal, setShowOriginal] = useState(false)
  const canvasRef = useRef(null)

  const qualityOptions = [
    { id: 'low', label: 'Low (Fast)', time: 2000, quality: 0.7 },
    { id: 'medium', label: 'Medium', time: 4000, quality: 0.85 },
    { id: 'high', label: 'High (Slow)', time: 6000, quality: 0.95 }
  ]

  useEffect(() => {
    if (editedImage) {
      // Simulate background removal process
      simulateBackgroundRemoval()
    }
  }, [editedImage])

  const simulateBackgroundRemoval = async () => {
    if (!editedImage) return

    setIsProcessing(true)
    setProcessingProgress(0)

    const selectedQuality = qualityOptions.find(q => q.id === removalQuality)
    const totalSteps = 10
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = (currentStep / totalSteps) * 100
      setProcessingProgress(progress)

      if (currentStep >= totalSteps) {
        clearInterval(interval)
        processImage()
      }
    }, selectedQuality.time / totalSteps)
  }

  const processImage = () => {
    if (!editedImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Create a new image element to work with
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw the original image
      ctx.drawImage(img, 0, 0)
      
      // Get image data for processing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      // Simple background removal simulation
      // This is a basic algorithm - in a real app, you'd use AI/ML services
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        // Simple threshold-based background detection
        // This is just for demonstration - real AI would be much more sophisticated
        const brightness = (r + g + b) / 3
        const isBackground = brightness > 240 || (r > 250 && g > 250 && b > 250)
        
        if (isBackground) {
          data[i + 3] = 0 // Make transparent
        }
      }
      
      // Put the processed image data back
      ctx.putImageData(imageData, 0, 0)
      
      // Convert to data URL
      const processedDataUrl = canvas.toDataURL('image/png')
      setResultImage(processedDataUrl)
      
      // Update context
      dispatch({ type: 'SET_PROCESSED_IMAGE', payload: processedDataUrl })
      dispatch({ type: 'SET_BACKGROUND_REMOVED', payload: true })
      
      setIsProcessing(false)
      setProcessingProgress(100)
    }
    
    img.src = editedImage
  }

  const handleQualityChange = (quality) => {
    setRemovalQuality(quality)
    if (resultImage) {
      // Re-process with new quality
      simulateBackgroundRemoval()
    }
  }

  const handleNext = () => {
    if (resultImage) {
      onNext()
    }
  }

  if (!editedImage) {
    return (
      <div className="text-center">
        <p className="text-gray-600">No image to process</p>
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
            Remove Background
          </h2>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Removal Quality</h3>
            <div className="space-y-2">
              {qualityOptions.map((option) => (
                <label key={option.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="quality"
                    value={option.id}
                    checked={removalQuality === option.id}
                    onChange={() => handleQualityChange(option.id)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">
                      Processing time: ~{option.time / 1000}s
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700 font-medium">Processing...</span>
                <span className="text-blue-600 text-sm">{Math.round(processingProgress)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <p className="text-blue-600 text-sm mt-2">
                AI is analyzing your image and removing the background
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Tips for Best Results</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use high contrast between subject and background</li>
              <li>• Ensure good lighting on your subject</li>
              <li>• Avoid complex backgrounds with similar colors</li>
              <li>• Higher quality settings take longer but give better results</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex space-x-4">
            <button onClick={onBack} className="btn-secondary flex-1">
              ← Back
            </button>
            <button 
              onClick={handleNext} 
              disabled={!resultImage || isProcessing}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Preview</h3>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={showOriginal}
                onChange={(e) => setShowOriginal(e.target.checked)}
                className="mr-2"
              />
              Show Original
            </label>
          </div>

          {/* Image Comparison */}
          <div className="space-y-4">
            {showOriginal && (
              <div>
                <div className="text-sm text-gray-600 mb-2">Original Image</div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={editedImage}
                    alt="Original"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
              </div>
            )}

            {resultImage && (
              <div>
                <div className="text-sm text-gray-600 mb-2">Background Removed</div>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={resultImage}
                    alt="Background Removed"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Transparent background (checkerboard pattern)
                </div>
              </div>
            )}

            {!resultImage && !isProcessing && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-2">🎨</div>
                <p>Click "Process" to remove the background</p>
              </div>
            )}
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

export default BackgroundRemover
