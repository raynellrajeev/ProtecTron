import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const ContentScanner = ({ content, highlightWords, scanDuration = 3, reverseDuration = 1 }) => {
  const [scanning, setScanning] = useState(false)
  const [aiProbability, setAiProbability] = useState(0)
  const containerRef = useRef(null)
  const scannerRef = useRef(null)
  const contentRef = useRef(null)
  const scannerAnimation = useAnimation()
  const [highlightedWords, setHighlightedWords] = useState([])
  const [animationPhase, setAnimationPhase] = useState('idle')

  const startScanning = async () => {
    if (scanning || !containerRef.current) return

    setScanning(true)
    setAiProbability(0)
    setHighlightedWords([])
    setAnimationPhase('forward')

    const containerWidth = containerRef.current.offsetWidth - 110

    // Forward scan
    await scannerAnimation.start({
      x: containerWidth,
      transition: { duration: scanDuration, ease: 'linear' }
    })

    setAnimationPhase('paused')

    // Pause
    await new Promise((resolve) => setTimeout(resolve, 200))

    setAnimationPhase('reverse')

    // Backward scan
    await scannerAnimation.start({
      x: '-87%',
      transition: { duration: reverseDuration, ease: 'linear' }
    })

    setScanning(false)
    setHighlightedWords([])
    setAnimationPhase('idle')
  }

  useEffect(() => {
    let interval
    let pauseTimeout

    if (animationPhase === 'forward') {
      interval = setInterval(
        () => {
          setAiProbability((prev) =>
            Math.min(prev + 1, Math.floor(content.length / highlightWords.length))
          )
        },
        (scanDuration * 1000) / 55
      )
    } else if (animationPhase === 'paused') {
      //delay before starting reverse
      pauseTimeout = setTimeout(() => {
        setAnimationPhase('reverse')
      }, 200)
    } else if (animationPhase === 'reverse') {
      interval = setInterval(
        () => {
          setAiProbability((prev) => Math.max(prev - 1, 0))
        },
        (reverseDuration * 1000) / 40
      )
    }

    return () => {
      clearInterval(interval)
      clearTimeout(pauseTimeout)
    }
  }, [animationPhase, scanDuration, reverseDuration, content.length, highlightWords.length])

  useEffect(() => {
    if (scanning && scannerRef.current && contentRef.current) {
      const updateHighlightedWords = () => {
        const scannerRect = scannerRef.current.getBoundingClientRect()
        const contentRect = contentRef.current.getBoundingClientRect()
        const scannerRightEdge = scannerRect.right - contentRect.left

        const newHighlightedWords = highlightWords.filter((phrase) => {
          const phraseElements = contentRef.current.querySelectorAll(`[data-phrase="${phrase}"]`)
          return Array.from(phraseElements).some((element) => {
            const elementRect = element.getBoundingClientRect()
            const elementRightEdge = elementRect.right - contentRect.left
            return elementRightEdge <= scannerRightEdge
          })
        })

        setHighlightedWords(newHighlightedWords)
      }

      const animationFrame = requestAnimationFrame(function animate() {
        updateHighlightedWords()
        if (scanning) {
          requestAnimationFrame(animate)
        }
      })

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [scanning, highlightWords])

  const highlightText = (text) => {
    let result = text
    highlightWords.forEach((phrase) => {
      const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      result = result.replace(
        regex,
        (match) =>
          `<span class="highlight ${highlightedWords.includes(phrase) ? 'active' : ''}" data-phrase="${phrase}">${match}</span>`
      )
    })
    return result
  }

  const renderAiProbability = (probability) => {
    const digits = probability.toString().padStart(2, '0').split('').map(Number)

    const digitVariants = {
      initial: { y: 0 },
      animate: {
        y: [0, -30, 0],
        transition: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 1.5,
          ease: 'easeInOut'
        }
      }
    }

    return (
      <>
        <div className="inline-flex items-center">
          <div className="inline-flex h-8 overflow-hidden">
            {digits.map((digit, index) => (
              <motion.div
                key={`${index}-${digit}`}
                variants={digitVariants}
                initial="initial"
                animate="animate"
                className="inline-flex h-8 w-6 flex-col items-center justify-center"
              >
                {[digit, (digit + 1) % 10, (digit + 2) % 10].map((n, i) => (
                  <span key={i} className="font-bold leading-8 text-purple-900">
                    {n}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className=" mx-auto w-full   p-14 ">
      <motion.div
        ref={containerRef}
        className="relative overflow-hidden rounded  p-4 "
        style={{ minHeight: '120px' }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          ref={scannerRef}
          className="pointer-events-none absolute  left-0 h-[calc(100%+40px)]"
          initial={{ x: '-100%' }}
          animate={scannerAnimation}
        >
          <div className="flex h-full flex-row-reverse">
            <div className=" w-1.5 bg-[#2196F3]" />
            <div className=" w-24 bg-custom-gradient" />
          </div>
        </motion.div>
      </motion.div>
      <div className="flex justify-center">
        <button
          onClick={startScanning}
          className="mt-4 rounded-full bg-[#2196F3] px-4 w-full text-white text-sm"
          disabled={scanning}
        >
          {scanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>

      <style>{`
        .highlight {
          transition: background-color 0.3s ease;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .highlight.active {
          background-color: #2196F3;
        }
        .scanned-text {
          color: #4B0082;
        }
      `}</style>
    </div>
  )
}

export default ContentScanner
