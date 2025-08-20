import React, { createContext, useContext, useReducer } from 'react'

const ImageContext = createContext()

const initialState = {
  originalImage: null,
  editedImage: null,
  processedImage: null,
  imageDimensions: { width: 0, height: 0 },
  targetDimensions: { width: 800, height: 600 },
  aspectRatio: 'free',
  isProcessing: false,
  processingError: null,
  backgroundRemoved: false
}

const imageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORIGINAL_IMAGE':
      return {
        ...state,
        originalImage: action.payload,
        imageDimensions: action.payload ? {
          width: action.payload.naturalWidth || action.payload.width,
          height: action.payload.naturalHeight || action.payload.height
        } : { width: 0, height: 0 },
        targetDimensions: action.payload ? {
          width: action.payload.naturalWidth || action.payload.width,
          height: action.payload.naturalHeight || action.payload.height
        } : { width: 800, height: 600 }
      }
    
    case 'SET_EDITED_IMAGE':
      return {
        ...state,
        editedImage: action.payload
      }
    
    case 'SET_PROCESSED_IMAGE':
      return {
        ...state,
        processedImage: action.payload
      }
    
    case 'SET_TARGET_DIMENSIONS':
      return {
        ...state,
        targetDimensions: action.payload
      }
    
    case 'SET_ASPECT_RATIO':
      return {
        ...state,
        aspectRatio: action.payload
      }
    
    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload
      }
    
    case 'SET_PROCESSING_ERROR':
      return {
        ...state,
        processingError: action.payload
      }
    
    case 'SET_BACKGROUND_REMOVED':
      return {
        ...state,
        backgroundRemoved: action.payload
      }
    
    case 'RESET':
      return initialState
    
    default:
      return state
  }
}

export const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, initialState)

  const value = {
    ...state,
    dispatch
  }

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  )
}

export const useImage = () => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider')
  }
  return context
}
