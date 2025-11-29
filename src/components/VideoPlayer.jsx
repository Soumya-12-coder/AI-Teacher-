import React, { useRef, useEffect, useState } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

const VideoPlayer = ({ videoUrl, subtitles = [], onEnded, onProgress }) => {
  const playerRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  const plyrOptions = {
    controls: [
      'play-large',
      'restart',
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'captions',
      'settings',
      'pip',
      'fullscreen'
    ],
    settings: ['captions', 'quality', 'speed'],
    captions: {
      active: true,
      update: true,
      language: 'en'
    },
    quality: {
      default: 720,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
    },
    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
    },
    keyboard: {
      focused: true,
      global: false
    },
    tooltips: {
      controls: true,
      seek: true
    },
    hideControls: true,
    clickToPlay: true,
    disableContextMenu: false
  }

  useEffect(() => {
    const player = playerRef.current?.plyr
    if (player && isReady) {
      // Add event listeners
      player.on('ended', () => {
        if (onEnded) onEnded()
      })

      player.on('timeupdate', () => {
        if (onProgress) {
          const progress = (player.currentTime / player.duration) * 100
          onProgress(progress)
        }
      })

      // Set quality if available
      if (player.quality) {
        player.quality = 720
      }

      return () => {
        if (player) {
          player.off('ended')
          player.off('timeupdate')
        }
      }
    }
  }, [isReady, onEnded, onProgress])

  const handleReady = () => {
    setIsReady(true)
  }

  return (
    <div className="relative">
      <Plyr
        ref={playerRef}
        source={{
          type: 'video',
          sources: [
            {
              src: videoUrl,
              type: 'video/mp4',
              size: 720
            }
          ],
          tracks: subtitles.map((subtitle, index) => ({
            kind: 'captions',
            label: subtitle.label,
            src: subtitle.src,
            srclang: subtitle.srclang,
            default: index === 0
          }))
        }}
        options={plyrOptions}
        onReady={handleReady}
      />
      
      {/* Loading overlay */}
      {!isReady && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer