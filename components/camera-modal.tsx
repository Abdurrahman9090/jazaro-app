"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button, Card, Checkbox, Modal, Spin, Alert } from "antd"
import { 
  CloseOutlined, 
  CameraOutlined, 
  RotateLeftOutlined, 
  UploadOutlined, 
  CheckCircleOutlined, 
  ThunderboltOutlined 
} from "@ant-design/icons"
import * as tf from "@tensorflow/tfjs"
import * as cocoSsd from "@tensorflow-models/coco-ssd"

// Object categories and their checklists
const objectChecklists: { [key: string]: string[] } = {
  car: ["Electronics", "Tires", "Hardware", "Body"],
  chair: ["Frame/Structure", "Upholstery", "Cushions", "Wheels"],
  sofa: ["Frame/Structure", "Upholstery", "Cushions"],
  table: ["Frame/Structure", "Surface/Finish"],
  bed: ["Frame/Structure", "Mattress"],
  refrigerator: ["Electronics", "Mechanical", "Exterior"],
  microwave: ["Electronics", "Mechanical", "Exterior"],
  vase: ["Surface", "Material"],
  tv: ["Screen", "Connectivity", "Software"],
  laptop: ["Screen", "Battery", "Software"],
  knife: ["Surface", "Functionality"],
  bicycle: ["Frame", "Tires/Wheels", "Mechanical"],
  handbag: ["Material", "Functionality"],
  bench: ["Frame/Structure", "Upholstery", "Surface/Finish"],
  "dining table": ["Frame/Structure", "Surface/Finish"],
  couch: ["Frame/Structure", "Upholstery", "Cushions"],
  oven: ["Electronics", "Mechanical", "Exterior"],
  toaster: ["Electronics", "Mechanical", "Exterior"],
  sink: ["Surface", "Functionality", "Plumbing"],
  spoon: ["Surface", "Functionality"],
  fork: ["Surface", "Functionality"],
  bowl: ["Surface", "Material"],
  cup: ["Surface", "Material"],
  "potted plant": ["Plant Health", "Pot Condition"],
  mirror: ["Surface", "Frame"],
  clock: ["Mechanism", "Surface", "Frame"],
  book: ["Cover", "Pages", "Binding"],
  scissors: ["Blades", "Handles", "Functionality"],
  mouse: ["Connectivity", "Buttons", "Sensor"],
  keyboard: ["Keys", "Connectivity", "Surface"],
  remote: ["Buttons", "Connectivity", "Battery"],
  "cell phone": ["Screen", "Battery", "Software"],
  umbrella: ["Fabric", "Frame", "Mechanism"]
}

interface CameraModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (imageData: string) => void
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [selectedIssues, setSelectedIssues] = useState<{ [key: string]: boolean }>({})
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const [error, setError] = useState<string | null>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)
  const [isModelLoading, setIsModelLoading] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load COCO-SSD model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true)
        await tf.ready()
        const loadedModel = await cocoSsd.load()
        setModel(loadedModel)
        console.log("COCO-SSD model loaded successfully")
      } catch (err) {
        console.error("Error loading COCO-SSD model:", err)
        setError("Failed to load object detection model")
      } finally {
        setIsModelLoading(false)
      }
    }
    loadModel()
  }, [])

  // Run object detection
  const runObjectDetection = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !model) return

    const context = canvasRef.current.getContext("2d")
    if (!context) return

    const detectFrame = async () => {
      if (!videoRef.current || !model || !canvasRef.current) return

      try {
        // Detect objects in the current video frame
        const predictions = await model.detect(videoRef.current)

        // Clear canvas and draw video frame
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        context.drawImage(
          videoRef.current,
          0, 0,
          canvasRef.current.width,
          canvasRef.current.height
        )

        // Draw bounding boxes and labels
        predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox
          context.beginPath()
          context.rect(x, y, width, height)
          context.lineWidth = 2
          context.strokeStyle = "#00BCD4"
          context.fillStyle = "#00BCD4"
          context.stroke()
          context.fillText(
            `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
            x,
            y > 10 ? y - 5 : 10
          )
        })

        // Continue detection loop
        detectionIntervalRef.current = setTimeout(detectFrame, 100)
      } catch (err) {
        console.error("Error during object detection:", err)
      }
    }

    detectFrame()
  }, [model])

  // Start camera stream
  const startCamera = useCallback(async () => {
    if (isInitializing) {
      console.log("Camera initialization already in progress")
      return
    }

    try {
      setIsInitializing(true)
      setError(null)
      setIsVideoReady(false)

      const constraints = {
        video: {
          facingMode: facingMode
        }
      }

      console.log("Requesting camera access...")
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      console.log("Camera access granted")

      setStream(mediaStream)
      
      if (videoRef.current) {
        const videoElement = videoRef.current
        videoElement.srcObject = mediaStream

        // Wait for video to be ready
        videoElement.onloadedmetadata = () => {
          console.log("Video metadata loaded")
          videoElement.play()
            .then(() => {
              console.log("Video playback started")
              setIsVideoReady(true)
              // Start object detection when video is ready
              if (model && !isModelLoading) {
                runObjectDetection()
              }
            })
            .catch(err => {
              console.error("Error playing video:", err)
              setError("Error starting video stream")
              stopCamera()
            })
        }

        videoElement.onerror = (err) => {
          console.error("Video element error:", err)
          setError("Error with video element")
          stopCamera()
        }
      } else {
        console.error("Video element reference not found")
        setError("Camera view not initialized properly")
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError("Camera access denied. Please allow camera access in your browser settings.")
        } else if (err.name === "NotFoundError") {
          setError("No camera found. Please connect a camera and try again.")
        } else if (err.name === "NotReadableError") {
          setError("Camera is in use by another application. Please close other applications using the camera.")
        } else {
          setError(`Camera error: ${err.message}`)
        }
      } else {
        setError("Unable to access camera. Please check permissions.")
      }
      stopCamera()
    } finally {
      setIsInitializing(false)
    }
  }, [facingMode, model, isModelLoading, runObjectDetection])

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop()
      })
      setStream(null)
    }
    if (detectionIntervalRef.current) {
      clearTimeout(detectionIntervalRef.current)
    }
    setIsVideoReady(false)
    setIsInitializing(false)
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
      videoRef.current.onloadedmetadata = null
      videoRef.current.onerror = null
    }
  }, [stream])

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen && !capturedImage && !isInitializing) {
      startCamera()
    }
    return () => {
      if (!isOpen) {
        stopCamera()
        setCapturedImage(null)
        setAnalysisResult(null)
        setError(null)
      }
    }
  }, [isOpen, capturedImage, startCamera, stopCamera, isInitializing])

  // Analyze captured image
  const analyzeImage = useCallback(async () => {
    if (!capturedImage || !model) return

    setIsAnalyzing(true)
    try {
      // Create a temporary image element
      const img = new Image()
      img.src = capturedImage
      await new Promise<void>((resolve) => {
        img.onload = () => resolve()
      })

      // Detect objects in the image
      const predictions = await model.detect(img)
      
      // Process predictions and add mock data for home accessories
      const processedResults = predictions.map(pred => {
        const isPersonOrAnimal = ['person', 'dog', 'cat', 'bird', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'].includes(pred.class.toLowerCase())
        
        if (isPersonOrAnimal) {
          return {
            object: pred.class,
            confidence: pred.score,
            bbox: pred.bbox,
            type: 'person_or_animal'
          }
        }

        const objectName = pred.class.toLowerCase()
        const checklist = objectChecklists[objectName] || []
        
        // Initialize selected issues for this object
        const initialSelectedIssues: { [key: string]: boolean } = {}
        checklist.forEach(issue => {
          initialSelectedIssues[issue] = false
        })
        setSelectedIssues(initialSelectedIssues)

        return {
          object: pred.class,
          confidence: pred.score,
          bbox: pred.bbox,
          type: 'home_accessory',
          checklist: checklist
        }
      })

      setAnalysisResult(processedResults)
    } catch (err) {
      console.error("Error analyzing image:", err)
      setError("Failed to analyze image")
    } finally {
      setIsAnalyzing(false)
    }
  }, [capturedImage, model])

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }, [stopCamera])

  if (!isOpen) return null

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
      className="camera-modal"
      styles={{
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)'
        },
        content: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 188, 212, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 188, 212, 0.3)'
        }
      }}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            type="text"
            size="small"
            onClick={onClose}
            icon={<CloseOutlined />}
            className="text-[#006064] hover:text-[#00838F] hover:bg-[#00BCD4]/10 rounded-[10px]"
          />
          <h2 className="text-2xl font-bold text-[#00838F]">Camera</h2>
          <div className="w-10" />
        </div>
        <p className="text-[#00838F]/80 text-center">Take a photo or upload an image</p>

        {/* Error Message */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            action={
              <Button
                size="small"
                onClick={() => {
                  setError(null)
                  startCamera()
                }}
              >
                Retry
              </Button>
            }
          />
        )}

        {/* Camera View */}
        {!capturedImage && !error && (
          <div className="relative">
            <div className="relative w-full h-64 bg-gray-100 rounded-[10px] overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${!isVideoReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                width={640}
                height={480}
              />
              {!isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Spin size="large" />
                    <p className="text-sm text-[#00838F] mt-2">
                      {isModelLoading ? "Loading AI model..." : "Initializing camera..."}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                icon={<RotateLeftOutlined />}
                onClick={() => {
                  setFacingMode(prev => prev === "user" ? "environment" : "user")
                  stopCamera()
                  startCamera()
                }}
                className="text-[#00838F] hover:text-[#00BCD4]"
              >
                Switch Camera
              </Button>
              <Button
                type="primary"
                icon={<CameraOutlined />}
                onClick={capturePhoto}
                disabled={!isVideoReady}
                className="bg-[#00BCD4] border-[#00BCD4] hover:bg-[#00838F] hover:border-[#00838F]"
              >
                Capture
              </Button>
              <Button
                icon={<UploadOutlined />}
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click()
                  }
                }}
                className="text-[#00838F] hover:text-[#00BCD4]"
              >
                Upload
              </Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    const result = e.target?.result as string
                    setCapturedImage(result)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
          </div>
        )}

        {/* Captured Image */}
        {capturedImage && (
          <div className="space-y-4">
            <div className="relative w-full h-64 bg-gray-100 rounded-[10px] overflow-hidden">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white">
                    <Spin size="large" />
                    <p className="text-sm mt-2">AI Analyzing...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="bg-gradient-to-r from-[#00BCD4]/10 to-[#26C6DA]/10 backdrop-blur-[10px] rounded-[10px] p-4 border border-[#00BCD4]/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircleOutlined className="text-[#4CAF50]" />
                  <span className="font-semibold text-[#006064]">AI Detection Complete</span>
                </div>
                <div className="space-y-4">
                  {analysisResult.map((result: any, index: number) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#00838F]">Object:</span>
                        <span className="font-medium text-[#006064]">{result.object}</span>
                      </div>
                      {result.type === 'home_accessory' && result.checklist && (
                        <div className="space-y-2">
                          <span className="text-sm text-[#00838F]">Issue Checklist:</span>
                          <div className="space-y-2">
                            {result.checklist.map((issue: string) => (
                              <div key={issue} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={selectedIssues[issue] || false}
                                  onChange={(e) => {
                                    setSelectedIssues(prev => ({
                                      ...prev,
                                      [issue]: e.target.checked
                                    }))
                                  }}
                                >
                                  {issue}
                                </Checkbox>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#00838F]">Confidence:</span>
                        <span className="font-medium text-[#006064]">
                          {Math.round(result.confidence * 100)}%
                        </span>
                      </div>
                      {index < analysisResult.length - 1 && (
                        <div className="border-b border-[#00BCD4]/20 my-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center gap-2">
              <Button
                icon={<RotateLeftOutlined />}
                onClick={() => {
                  setCapturedImage(null)
                  setAnalysisResult(null)
                  setSelectedIssues({})
                  startCamera()
                }}
                className="text-[#00838F] hover:text-[#00BCD4]"
              >
                Retake
              </Button>
              {!analysisResult && !isAnalyzing && (
                <Button
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  onClick={analyzeImage}
                  className="bg-[#00BCD4] border-[#00BCD4] hover:bg-[#00838F] hover:border-[#00838F]"
                >
                  Analyze
                </Button>
              )}
              {analysisResult && (
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => onCapture(capturedImage)}
                  className="bg-[#00BCD4] border-[#00BCD4] hover:bg-[#00838F] hover:border-[#00838F]"
                >
                  Use Photo
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-[#00BCD4]/10 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30">
          <h4 className="font-medium text-[#006064] mb-2">📸 How it works:</h4>
          <ul className="text-sm text-[#00838F] space-y-1">
            <li>• Point camera at broken item</li>
            <li>• Tap capture button or upload photo</li>
            <li>• AI analyzes and identifies issues</li>
            <li>• Get instant repair estimates</li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}
