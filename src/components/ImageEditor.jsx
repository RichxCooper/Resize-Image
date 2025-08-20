import React, { useState, useEffect, useRef } from 'react'
import { useImage } from '../context/ImageContext'

const ImageEditor = ({ onNext, onBack }) => {
  const { 
    originalImage, 
    targetDimensions, 
    aspectRatio, 
    dispatch 
  } = useImage()
  
  const [localDimensions, setLocalDimensions] = useState(targetDimensions)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const canvasRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const aspectRatios = [
    { id: 'free', label: 'Free', ratio: null },
    { id: '1:1', label: 'Square (1:1)', ratio: 1 },
    { id: '4:3', label: 'Standard (4:3)', ratio: 4/3 },
    { id: '16:9', label: 'Widescreen (16:9)', ratio: 16/9 },
    { id: '3:2', label: 'Photo (3:2)', ratio: 3/2 },
    { id: '5:4', label: 'Portrait (5:4)', ratio: 5/4 }
  ]

  useEffect(() => {
    if (originalImage) {
      setLocalDimensions({
        width: originalImage.naturalWidth || originalImage.width,
        height: originalImage.naturalHeight || originalImage.height
      })
      generatePreview()
    }
  }, [originalImage])

  useEffect(() => {
    if (maintainAspectRatio && aspectRatio !== 'free') {
      const selectedRatio = aspectRatios.find(ar => ar.id === aspectRatio)
      if (selectedRatio && selectedRatio.ratio) {
        const newHeight = Math.round(localDimensions.width / selectedRatio.ratio)
        setLocalDimensions(prev => ({ ...prev, height: newHeight }))
      }
    }
  }, [localDimensions.width, aspectRatio, maintainAspectRatio])

  const generatePreview = () => {
    if (!originalImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = localDimensions.width
    canvas.height = localDimensions.height
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw resized image
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height)
    
    // Convert to data URL for preview
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
    setPreviewUrl(dataUrl)
  }

  useEffect(() => {
    generatePreview()
  }, [localDimensions])

  const handleDimensionChange = (dimension, value) => {
    const newValue = parseInt(value) || 0
    if (newValue <= 0) return

    if (dimension === 'width') {
      setLocalDimensions(prev => ({ ...prev, width: newValue }))
    } else {
      setLocalDimensions(prev => ({ ...prev, height: newValue }))
    }
  }

  const handleAspectRatioChange = (newAspectRatio) => {
    dispatch({ type: 'SET_ASPECT_RATIO', payload: newAspectRatio })
    
    if (newAspectRatio !== 'free') {
      const selectedRatio = aspectRatios.find(ar => ar.id === newAspectRatio)
      if (selectedRatio && selectedRatio.ratio) {
        const newHeight = Math.round(localDimensions.width / selectedRatio.ratio)
        setLocalDimensions(prev => ({ ...prev, height: newHeight }))
      }
    }
  }

  const handleMaintainAspectRatio = (checked) => {
    setMaintainAspectRatio(checked)
    if (!checked) {
      dispatch({ type: 'SET_ASPECT_RATIO', payload: 'free' })
    }
  }

  const handleNext = () => {
    dispatch({ type: 'SET_TARGET_DIMENSIONS', payload: localDimensions })
    dispatch({ type: 'SET_EDITED_IMAGE', payload: previewUrl })
    onNext()
  }

  if (!originalImage) {
    return (
      <div className="text-center">
        <p className="text-gray-600">No image loaded</p>
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
            Resize & Edit Image
          </h2>

          {/* Original Image Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Original Image</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Width:</span>
                <span className="ml-2 font-medium">{originalImage.naturalWidth || originalImage.width}px</span>
              </div>
              <div>
                <span className="text-gray-600">Height:</span>
                <span className="ml-2 font-medium">{originalImage.naturalHeight || originalImage.height}px</span>
              </div>
            </div>
          </div>

          {/* Dimensions Control */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">New Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={localDimensions.width}
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                  className="input-field"
                  min="1"
                  max="4000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={localDimensions.height}
                  onChange={(e) => handleDimensionChange('height', e.target.value)}
                  className="input-field"
                  min="1"
                  max="4000"
                />
              </div>
            </div>
          </div>

          {/* Aspect Ratio Control */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Aspect Ratio</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => handleMaintainAspectRatio(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Maintain</span>
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio.id}
                  onClick={() => handleAspectRatioChange(ratio.id)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    aspectRatio === ratio.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Quick Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLocalDimensions({ width: 800, height: 600 })}
                className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                800 × 600
              </button>
              <button
                onClick={() => setLocalDimensions({ width: 1920, height: 1080 })}
                className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                1920 × 1080
              </button>
              <button
                onClick={() => setLocalDimensions({ width: 1200, height: 1200 })}
                className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                1200 × 1200
              </button>
              <button
                onClick={() => setLocalDimensions({ width: 1500, height: 1000 })}
                className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                1500 × 1000
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex space-x-4">
            <button onClick={onBack} className="btn-secondary flex-1">
              ← Back
            </button>
            <button onClick={handleNext} className="btn-primary flex-1">
              Continue →
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="text-center text-sm text-gray-600 mb-2">
              New Size: {localDimensions.width} × {localDimensions.height} pixels
            </div>
            <div className="text-center text-xs text-gray-500">
              {Math.round((localDimensions.width * localDimensions.height) / 1000)}K pixels
            </div>
          </div>

          {previewUrl && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          )}

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

export default ImageEditor
