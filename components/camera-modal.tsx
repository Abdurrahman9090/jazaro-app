"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Camera, RotateCcw, Zap, Upload, CheckCircle, AlertCircle } from "lucide-react"
import * as tf from "@tensorflow/tfjs"
import * as cocoSsd from "@tensorflow-models/coco-ssd"

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
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const [error, setError] = useState<string | null>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)
  const [isModelLoading, setIsModelLoading] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const detectionIntervalRef = useRef<NodeJS.Timeout>()

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
      if (!videoRef.current || !model) return

      try {
        // Detect objects in the current video frame
        const predictions = await model.detect(videoRef.current)

        // Clear canvas and draw video frame
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        context.drawImage(
          videoRef.current,
          0,
          0,
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
      await new Promise((resolve) => {
        img.onload = resolve
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

        // Mock data for home accessories
        const mockData = {
          'chair': { issue: 'Broken leg', severity: 'Medium', cost: '$50-100' },
          'couch': { issue: 'Torn fabric', severity: 'Medium', cost: '$150-300' },
          'table': { issue: 'Scratched surface', severity: 'Low', cost: '$30-80' },
          'lamp': { issue: 'Flickering light', severity: 'Low', cost: '$20-50' },
          'tv': { issue: 'Cracked screen', severity: 'High', cost: '$200-500' },
          'refrigerator': { issue: 'Not cooling', severity: 'High', cost: '$300-600' },
          'microwave': { issue: 'Not heating', severity: 'Medium', cost: '$80-150' },
          'clock': { issue: 'Not working', severity: 'Low', cost: '$15-40' },
          'vase': { issue: 'Cracked', severity: 'Low', cost: '$25-60' },
          'painting': { issue: 'Damaged frame', severity: 'Low', cost: '$40-100' },
          'mirror': { issue: 'Cracked glass', severity: 'Medium', cost: '$60-120' },
          'curtain': { issue: 'Torn fabric', severity: 'Low', cost: '$30-80' },
          'carpet': { issue: 'Stained', severity: 'Medium', cost: '$100-250' },
          'bed': { issue: 'Broken frame', severity: 'High', cost: '$200-400' },
          'desk': { issue: 'Wobbly legs', severity: 'Low', cost: '$40-90' },
          'bookshelf': { issue: 'Broken shelf', severity: 'Medium', cost: '$50-120' },
          'window': { issue: 'Cracked glass', severity: 'High', cost: '$150-300' },
          'door': { issue: 'Hinges loose', severity: 'Medium', cost: '$70-150' },
          'cabinet': { issue: 'Broken handle', severity: 'Low', cost: '$20-50' },
          'sink': { issue: 'Leaking', severity: 'High', cost: '$100-250' },
          'toilet': { issue: 'Running water', severity: 'High', cost: '$120-300' },
          'shower': { issue: 'Clogged drain', severity: 'Medium', cost: '$80-200' },
          'bathtub': { issue: 'Cracked', severity: 'High', cost: '$300-600' },
          'faucet': { issue: 'Leaking', severity: 'Medium', cost: '$40-100' },
          'light': { issue: 'Flickering', severity: 'Low', cost: '$15-40' },
          'fan': { issue: 'Not spinning', severity: 'Medium', cost: '$30-80' },
          'heater': { issue: 'Not heating', severity: 'High', cost: '$150-300' },
          'air conditioner': { issue: 'Not cooling', severity: 'High', cost: '$200-500' },
          'oven': { issue: 'Not heating', severity: 'High', cost: '$150-400' },
          'stove': { issue: 'Broken burner', severity: 'Medium', cost: '$80-200' },
          'dishwasher': { issue: 'Not cleaning', severity: 'High', cost: '$200-400' },
          'washing machine': { issue: 'Not spinning', severity: 'High', cost: '$250-500' },
          'dryer': { issue: 'Not drying', severity: 'High', cost: '$200-450' },
          'vacuum': { issue: 'Not sucking', severity: 'Medium', cost: '$50-150' },
          'blender': { issue: 'Not blending', severity: 'Low', cost: '$30-80' },
          'toaster': { issue: 'Not toasting', severity: 'Low', cost: '$20-50' },
          'coffee maker': { issue: 'Not brewing', severity: 'Low', cost: '$40-100' },
          'kettle': { issue: 'Not heating', severity: 'Low', cost: '$25-60' },
          'iron': { issue: 'Not heating', severity: 'Low', cost: '$20-50' },
          'hair dryer': { issue: 'Not blowing', severity: 'Low', cost: '$25-70' },
          'toothbrush': { issue: 'Not charging', severity: 'Low', cost: '$15-40' },
          'scale': { issue: 'Not accurate', severity: 'Low', cost: '$20-50' },
          'thermostat': { issue: 'Not regulating', severity: 'High', cost: '$100-250' },
          'smoke detector': { issue: 'Not working', severity: 'High', cost: '$30-80' },
          'carbon monoxide detector': { issue: 'Not working', severity: 'High', cost: '$40-100' },
          'fire extinguisher': { issue: 'Expired', severity: 'High', cost: '$30-80' },
          'first aid kit': { issue: 'Missing items', severity: 'Medium', cost: '$20-50' },
          'toolbox': { issue: 'Missing tools', severity: 'Low', cost: '$30-80' },
          'ladder': { issue: 'Broken rung', severity: 'High', cost: '$50-150' },
          'bicycle': { issue: 'Flat tire', severity: 'Low', cost: '$20-50' },
          'car': { issue: 'Scratched paint', severity: 'Medium', cost: '$200-500' },
          'motorcycle': { issue: 'Broken mirror', severity: 'Low', cost: '$30-80' },
          'scooter': { issue: 'Flat tire', severity: 'Low', cost: '$15-40' },
          'skateboard': { issue: 'Broken wheel', severity: 'Low', cost: '$10-30' },
          'surfboard': { issue: 'Cracked', severity: 'Medium', cost: '$100-300' },
          'tennis racket': { issue: 'Broken string', severity: 'Low', cost: '$20-50' },
          'golf club': { issue: 'Broken shaft', severity: 'Low', cost: '$50-150' },
          'basketball': { issue: 'Flat', severity: 'Low', cost: '$15-40' },
          'football': { issue: 'Flat', severity: 'Low', cost: '$15-40' },
          'baseball': { issue: 'Cracked', severity: 'Low', cost: '$5-15' },
          'soccer ball': { issue: 'Flat', severity: 'Low', cost: '$15-40' },
          'volleyball': { issue: 'Flat', severity: 'Low', cost: '$15-40' },
          'hockey stick': { issue: 'Broken', severity: 'Low', cost: '$30-80' },
          'pool cue': { issue: 'Broken tip', severity: 'Low', cost: '$20-50' },
          'dart board': { issue: 'Damaged', severity: 'Low', cost: '$20-50' },
          'chess board': { issue: 'Missing pieces', severity: 'Low', cost: '$15-40' },
          'puzzle': { issue: 'Missing pieces', severity: 'Low', cost: '$10-30' },
          'book': { issue: 'Torn pages', severity: 'Low', cost: '$5-20' },
          'magazine': { issue: 'Torn cover', severity: 'Low', cost: '$3-10' },
          'newspaper': { issue: 'Torn', severity: 'Low', cost: '$1-5' },
          'map': { issue: 'Torn', severity: 'Low', cost: '$5-15' },
          'globe': { issue: 'Broken stand', severity: 'Low', cost: '$20-50' },
          'telescope': { issue: 'Broken lens', severity: 'Medium', cost: '$50-150' },
          'microscope': { issue: 'Broken lens', severity: 'Medium', cost: '$100-300' },
          'binoculars': { issue: 'Broken lens', severity: 'Medium', cost: '$50-150' },
          'camera': { issue: 'Broken lens', severity: 'High', cost: '$100-300' },
          'phone': { issue: 'Cracked screen', severity: 'High', cost: '$100-300' },
          'laptop': { issue: 'Broken screen', severity: 'High', cost: '$200-500' },
          'keyboard': { issue: 'Sticky keys', severity: 'Low', cost: '$20-50' },
          'mouse': { issue: 'Not clicking', severity: 'Low', cost: '$15-40' },
          'monitor': { issue: 'Dead pixels', severity: 'Medium', cost: '$100-300' },
          'printer': { issue: 'Paper jam', severity: 'Low', cost: '$30-80' },
          'scanner': { issue: 'Not scanning', severity: 'Low', cost: '$40-100' },
          'speaker': { issue: 'No sound', severity: 'Low', cost: '$30-80' },
          'headphones': { issue: 'No sound', severity: 'Low', cost: '$20-50' },
          'microphone': { issue: 'Not working', severity: 'Low', cost: '$20-50' },
          'guitar': { issue: 'Broken string', severity: 'Low', cost: '$10-30' },
          'piano': { issue: 'Out of tune', severity: 'Medium', cost: '$100-300' },
          'drum': { issue: 'Broken skin', severity: 'Low', cost: '$30-80' },
          'violin': { issue: 'Broken string', severity: 'Low', cost: '$20-50' },
          'trumpet': { issue: 'Stuck valve', severity: 'Low', cost: '$30-80' },
          'saxophone': { issue: 'Stuck key', severity: 'Low', cost: '$40-100' },
          'flute': { issue: 'Stuck key', severity: 'Low', cost: '$30-80' },
          'clarinet': { issue: 'Stuck key', severity: 'Low', cost: '$30-80' },
          'trombone': { issue: 'Stuck slide', severity: 'Low', cost: '$40-100' },
          'accordion': { issue: 'Stuck key', severity: 'Low', cost: '$50-150' },
          'harmonica': { issue: 'Stuck reed', severity: 'Low', cost: '$10-30' },
          'tambourine': { issue: 'Broken jingle', severity: 'Low', cost: '$10-30' },
          'maracas': { issue: 'Broken handle', severity: 'Low', cost: '$10-30' },
          'castanets': { issue: 'Broken string', severity: 'Low', cost: '$5-15' },
          'triangle': { issue: 'Broken', severity: 'Low', cost: '$5-15' },
          'cymbals': { issue: 'Cracked', severity: 'Low', cost: '$20-50' },
          'gong': { issue: 'Cracked', severity: 'Low', cost: '$50-150' },
          'xylophone': { issue: 'Broken key', severity: 'Low', cost: '$30-80' },
          'marimba': { issue: 'Broken key', severity: 'Low', cost: '$50-150' },
          'vibraphone': { issue: 'Broken key', severity: 'Low', cost: '$50-150' },
          'glockenspiel': { issue: 'Broken key', severity: 'Low', cost: '$30-80' },
          'chimes': { issue: 'Broken tube', severity: 'Low', cost: '$20-50' },
          'bells': { issue: 'Broken clapper', severity: 'Low', cost: '$15-40' },
          'whistle': { issue: 'Not working', severity: 'Low', cost: '$5-15' },
          'kazoo': { issue: 'Not working', severity: 'Low', cost: '$5-15' },
          'recorder': { issue: 'Stuck key', severity: 'Low', cost: '$10-30' },
          'ocarina': { issue: 'Cracked', severity: 'Low', cost: '$10-30' },
          'pan flute': { issue: 'Broken tube', severity: 'Low', cost: '$20-50' },
          'didgeridoo': { issue: 'Cracked', severity: 'Low', cost: '$50-150' },
          'bagpipes': { issue: 'Leaking air', severity: 'Low', cost: '$100-300' },
          'mandolin': { issue: 'Broken string', severity: 'Low', cost: '$20-50' },
          'banjo': { issue: 'Broken string', severity: 'Low', cost: '$30-80' },
          'ukulele': { issue: 'Broken string', severity: 'Low', cost: '$15-40' },
          'sitar': { issue: 'Broken string', severity: 'Low', cost: '$50-150' },
          'harp': { issue: 'Broken string', severity: 'Low', cost: '$100-300' },
          'cello': { issue: 'Broken string', severity: 'Low', cost: '$50-150' },
          'double bass': { issue: 'Broken string', severity: 'Low', cost: '$100-300' },
          'viola': { issue: 'Broken string', severity: 'Low', cost: '$40-100' },
          'bassoon': { issue: 'Stuck key', severity: 'Low', cost: '$50-150' },
          'oboe': { issue: 'Stuck key', severity: 'Low', cost: '$50-150' },
          'english horn': { issue: 'Stuck key', severity: 'Low', cost: '$50-150' },
          'french horn': { issue: 'Stuck valve', severity: 'Low', cost: '$50-150' },
          'tuba': { issue: 'Stuck valve', severity: 'Low', cost: '$100-300' },
          'euphonium': { issue: 'Stuck valve', severity: 'Low', cost: '$50-150' },
          'baritone': { issue: 'Stuck valve', severity: 'Low', cost: '$50-150' },
          'trombone': { issue: 'Stuck slide', severity: 'Low', cost: '$40-100' },
          'cornet': { issue: 'Stuck valve', severity: 'Low', cost: '$30-80' },
          'flugelhorn': { issue: 'Stuck valve', severity: 'Low', cost: '$40-100' },
          'piccolo': { issue: 'Stuck key', severity: 'Low', cost: '$20-50' },
          'fife': { issue: 'Stuck key', severity: 'Low', cost: '$15-40' },
          'panpipe': { issue: 'Broken tube', severity: 'Low', cost: '$20-50' },
          'ocarina': { issue: 'Cracked', severity: 'Low', cost: '$10-30' },
          'recorder': { issue: 'Stuck key', severity: 'Low', cost: '$10-30' },
          'whistle': { issue: 'Not working', severity: 'Low', cost: '$5-15' },
          'kazoo': { issue: 'Not working', severity: 'Low', cost: '$5-15' },
          'harmonica': { issue: 'Stuck reed', severity: 'Low', cost: '$10-30' },
          'accordion': { issue: 'Stuck key', severity: 'Low', cost: '$50-150' },
          'concertina': { issue: 'Stuck key', severity: 'Low', cost: '$40-100' },
          'bandoneon': { issue: 'Stuck key', severity: 'Low', cost: '$50-150' },
          'melodica': { issue: 'Stuck key', severity: 'Low', cost: '$20-50' },
          'harmonium': { issue: 'Stuck key', severity: 'Low', cost: '$50-150' },
          'organ': { issue: 'Stuck key', severity: 'High', cost: '$200-500' },
          'synthesizer': { issue: 'Not working', severity: 'High', cost: '$100-300' },
          'keyboard': { issue: 'Sticky keys', severity: 'Low', cost: '$20-50' },
          'piano': { issue: 'Out of tune', severity: 'Medium', cost: '$100-300' },
          'grand piano': { issue: 'Out of tune', severity: 'High', cost: '$300-800' },
          'upright piano': { issue: 'Out of tune', severity: 'Medium', cost: '$200-500' },
          'electric piano': { issue: 'Not working', severity: 'High', cost: '$100-300' },
          'digital piano': { issue: 'Not working', severity: 'High', cost: '$100-300' },
          'harpsichord': { issue: 'Out of tune', severity: 'High', cost: '$200-500' },
          'clavichord': { issue: 'Out of tune', severity: 'High', cost: '$200-500' },
          'virginal': { issue: 'Out of tune', severity: 'High', cost: '$200-500' },
          'spinet': { issue: 'Out of tune', severity: 'High', cost: '$200-500' },
          'fortepiano': { issue: 'Out of tune', severity: 'High', cost: '$200-500' },
          'pianola': { issue: 'Not working', severity: 'High', cost: '$200-500' },
          'player piano': { issue: 'Not working', severity: 'High', cost: '$200-500' },
          'celesta': { issue: 'Out of tune', severity: 'High', cost: '$200-500' },
          'glockenspiel': { issue: 'Broken key', severity: 'Low', cost: '$30-80' },
          'xylophone': { issue: 'Broken key', severity: 'Low', cost: '$30-80' },
          'marimba': { issue: 'Broken key', severity: 'Low', cost: '$50-150' },
          'vibraphone': { issue: 'Broken key', severity: 'Low', cost: '$50-150' },
          'tubular bells': { issue: 'Broken tube', severity: 'Low', cost: '$50-150' },
          'chimes': { issue: 'Broken tube', severity: 'Low', cost: '$20-50' },
          'bells': { issue: 'Broken clapper', severity: 'Low', cost: '$15-40' },
          'gong': { issue: 'Cracked', severity: 'Low', cost: '$50-150' },
          'tam-tam': { issue: 'Cracked', severity: 'Low', cost: '$50-150' },
          'cymbals': { issue: 'Cracked', severity: 'Low', cost: '$20-50' },
          'hi-hat': { issue: 'Not closing', severity: 'Low', cost: '$30-80' },
          'ride cymbal': { issue: 'Cracked', severity: 'Low', cost: '$30-80' },
          'crash cymbal': { issue: 'Cracked', severity: 'Low', cost: '$30-80' },
          'splash cymbal': { issue: 'Cracked', severity: 'Low', cost: '$20-50' },
          'china cymbal': { issue: 'Cracked', severity: 'Low', cost: '$30-80' },
          'sizzle cymbal': { issue: 'Cracked', severity: 'Low', cost: '$30-80' },
          'ride bell': { issue: 'Cracked', severity: 'Low', cost: '$20-50' },
          'cowbell': { issue: 'Cracked', severity: 'Low', cost: '$15-40' },
          'agogo': { issue: 'Cracked', severity: 'Low', cost: '$15-40' },
          'tambourine': { issue: 'Broken jingle', severity: 'Low', cost: '$10-30' },
          'maracas': { issue: 'Broken handle', severity: 'Low', cost: '$10-30' },
          'castanets': { issue: 'Broken string', severity: 'Low', cost: '$5-15' },
          'claves': { issue: 'Broken', severity: 'Low', cost: '$5-15' },
          'guiro': { issue: 'Broken scraper', severity: 'Low', cost: '$10-30' },
          'vibraslap': { issue: 'Broken', severity: 'Low', cost: '$15-40' },
          'cabasa': { issue: 'Broken beads', severity: 'Low', cost: '$15-40' },
          'shaker': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'rain stick': { issue: 'Broken', severity: 'Low', cost: '$15-40' },
          'wind chimes': { issue: 'Broken tube', severity: 'Low', cost: '$20-50' },
          'triangle': { issue: 'Broken', severity: 'Low', cost: '$5-15' },
          'wood block': { issue: 'Cracked', severity: 'Low', cost: '$10-30' },
          'temple block': { issue: 'Cracked', severity: 'Low', cost: '$15-40' },
          'log drum': { issue: 'Cracked', severity: 'Low', cost: '$30-80' },
          'steel drum': { issue: 'Cracked', severity: 'Low', cost: '$50-150' },
          'timpani': { issue: 'Broken head', severity: 'Low', cost: '$100-300' },
          'bass drum': { issue: 'Broken head', severity: 'Low', cost: '$50-150' },
          'snare drum': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'tom-tom': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'floor tom': { issue: 'Broken head', severity: 'Low', cost: '$40-100' },
          'bongo': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'congas': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'timbales': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'djembe': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'cajon': { issue: 'Cracked', severity: 'Low', cost: '$30-80' },
          'darbuka': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'tabla': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'bodhran': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'frame drum': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'tambourine': { issue: 'Broken jingle', severity: 'Low', cost: '$10-30' },
          'riq': { issue: 'Broken jingle', severity: 'Low', cost: '$20-50' },
          'tar': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'bendir': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'daf': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'doholla': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'davul': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'tapan': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'dhol': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'dholak': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'mridangam': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'kanjira': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'ghatam': { issue: 'Cracked', severity: 'Low', cost: '$20-50' },
          'morsing': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'ghungroo': { issue: 'Broken bell', severity: 'Low', cost: '$15-40' },
          'manjira': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'kartal': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'chimta': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'khartal': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'damru': { issue: 'Broken head', severity: 'Low', cost: '$10-30' },
          'duff': { issue: 'Broken head', severity: 'Low', cost: '$10-30' },
          'daf': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'darbuka': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'doholla': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'davul': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'tapan': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'dhol': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'dholak': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'mridangam': { issue: 'Broken head', severity: 'Low', cost: '$30-80' },
          'kanjira': { issue: 'Broken head', severity: 'Low', cost: '$20-50' },
          'ghatam': { issue: 'Cracked', severity: 'Low', cost: '$20-50' },
          'morsing': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'ghungroo': { issue: 'Broken bell', severity: 'Low', cost: '$15-40' },
          'manjira': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'kartal': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'chimta': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'khartal': { issue: 'Broken', severity: 'Low', cost: '$10-30' },
          'damru': { issue: 'Broken head', severity: 'Low', cost: '$10-30' },
          'duff': { issue: 'Broken head', severity: 'Low', cost: '$10-30' }
        }

        const objectName = pred.class.toLowerCase()
        const mockInfo = mockData[objectName as keyof typeof mockData] || {
          issue: 'Unknown issue',
          severity: 'Low',
          cost: '$20-50'
        }

        return {
          object: pred.class,
          confidence: pred.score,
          bbox: pred.bbox,
          type: 'home_accessory',
          ...mockInfo
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_8px_32px_rgba(0,188,212,0.3)] rounded-[20px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 text-[#006064] hover:text-[#00838F] hover:bg-[#00BCD4]/10 rounded-[10px]"
            >
              <X className="h-5 w-5" />
            </Button>
            <CardTitle className="text-2xl font-bold text-[#00838F]">Camera</CardTitle>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
          <CardDescription className="text-[#00838F]/80">
            Take a photo or upload an image
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[10px] p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">{error}</span>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() => {
                  setError(null)
                  startCamera()
                }}
              >
                Retry
              </Button>
            </div>
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
                      <div className="w-8 h-8 border-2 border-[#00BCD4] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm text-[#00838F]">
                        {isModelLoading ? "Loading AI model..." : "Initializing camera..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFacingMode(prev => prev === "user" ? "environment" : "user")
                    stopCamera()
                    startCamera()
                  }}
                  className="text-[#00838F] hover:text-[#00BCD4]"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Switch Camera
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={capturePhoto}
                  className="bg-[#00BCD4] text-white hover:bg-[#00838F]"
                  disabled={!isVideoReady}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Capture
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click()
                    }
                  }}
                  className="text-[#00838F] hover:text-[#00BCD4]"
                >
                  <Upload className="h-4 w-4 mr-2" />
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
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm">AI Analyzing...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <div className="bg-gradient-to-r from-[#00BCD4]/10 to-[#26C6DA]/10 backdrop-blur-[10px] rounded-[10px] p-4 border border-[#00BCD4]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                    <span className="font-semibold text-[#006064]">AI Detection Complete</span>
                  </div>
                  <div className="space-y-2">
                    {analysisResult.map((result: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#00838F]">Object:</span>
                          <span className="font-medium text-[#006064]">{result.object}</span>
                        </div>
                        {result.type === 'home_accessory' && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#00838F]">Issue:</span>
                              <span className="font-medium text-[#006064]">{result.issue}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#00838F]">Severity:</span>
                              <Badge
                                className={`${
                                  result.severity === "High"
                                    ? "bg-red-100 text-red-800"
                                    : result.severity === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {result.severity}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#00838F]">Est. Cost:</span>
                              <span className="font-medium text-[#4CAF50]">{result.cost}</span>
                            </div>
                          </>
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
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCapturedImage(null)
                    setAnalysisResult(null)
                    startCamera()
                  }}
                  className="text-[#00838F] hover:text-[#00BCD4]"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake
                </Button>
                {!analysisResult && !isAnalyzing && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={analyzeImage}
                    className="bg-[#00BCD4] text-white hover:bg-[#00838F]"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Analyze
                  </Button>
                )}
                {analysisResult && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onCapture(capturedImage)}
                    className="bg-[#00BCD4] text-white hover:bg-[#00838F]"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
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
        </CardContent>
      </Card>
    </div>
  )
}
