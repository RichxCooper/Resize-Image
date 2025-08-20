import React, { useState } from 'react'
import Header from './components/Header'
import ImageUpload from './components/ImageUpload'
import ImageEditor from './components/ImageEditor'
import BackgroundRemover from './components/BackgroundRemover'
import SaveOptions from './components/SaveOptions'
import { ImageProvider } from './context/ImageContext'

function App() {
  const [currentStep, setCurrentStep] = useState('upload')

  const steps = [
    { id: 'upload', label: 'Upload Image', icon: '📁' },
    { id: 'edit', label: 'Resize & Edit', icon: '✏️' },
    { id: 'background', label: 'Remove Background', icon: '🎨' },
    { id: 'save', label: 'Save Image', icon: '💾' }
  ]

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'upload':
        return <ImageUpload onNext={() => setCurrentStep('edit')} />
      case 'edit':
        return <ImageEditor onNext={() => setCurrentStep('background')} onBack={() => setCurrentStep('upload')} />
      case 'background':
        return <BackgroundRemover onNext={() => setCurrentStep('save')} onBack={() => setCurrentStep('edit')} />
      case 'save':
        return <SaveOptions onBack={() => setCurrentStep('background')} />
      default:
        return <ImageUpload onNext={() => setCurrentStep('edit')} />
    }
  }

  return (
    <ImageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-medium transition-all duration-300 ${
                    currentStep === step.id
                      ? 'bg-primary-600 text-white scale-110'
                      : steps.findIndex(s => s.id === currentStep) > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-8">
              {steps.map((step) => (
                <span
                  key={step.id}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    currentStep === step.id
                      ? 'text-primary-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="animate-fade-in">
            {renderCurrentStep()}
          </div>
        </main>
      </div>
    </ImageProvider>
  )
}

export default App
