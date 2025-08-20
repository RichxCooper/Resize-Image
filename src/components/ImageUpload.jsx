import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useImage } from '../context/ImageContext'

const ImageUpload = ({ onNext }) => {
  const { dispatch } = useImage()
  const [uploadError, setUploadError] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    setUploadError(null)
    
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file')
      return
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        dispatch({ type: 'SET_ORIGINAL_IMAGE', payload: img })
        onNext()
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [dispatch, onNext])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upload Your Image
          </h2>
          <p className="text-gray-600">
            Drag and drop your image here, or click to browse
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="text-center">
            <div className="text-6xl mb-4">
              {isDragActive ? '📁' : '📸'}
            </div>
            
            {isDragActive ? (
              <p className="text-primary-600 font-medium">
                Drop your image here...
              </p>
            ) : (
              <>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF, BMP, WEBP up to 10MB
                </p>
              </>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{uploadError}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-blue-600 text-xl">📏</span>
            </div>
            <span>Resize to any dimensions</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-green-600 text-xl">🎨</span>
            </div>
            <span>Remove backgrounds</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-purple-600 text-xl">💾</span>
            </div>
            <span>Save in multiple formats</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
