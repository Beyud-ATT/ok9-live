// VideoPlayer.js
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaExpand,
  FaCompress,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { Spin } from "antd";

const VideoPlayer = forwardRef(
  (
    {
      url,
      poster,
      initialMuted = true,
      initialVolume = 0,
      autoPlay = false,
      showControls = true,
      className = "",
      classNames = { wrapper: "", video: "" },
      height = "xl:h-[560px] md:h-[450px] h-[200px]",
      onPlay,
      onPause,
      onError,
      renderCustomOverlay,
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const volumeControlRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(initialMuted);
    const [volume, setVolume] = useState(initialVolume);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const heightSetting = height;
    const videoHeightSetting = `${isFullscreen ? "!h-full" : heightSetting}`;

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      videoElement: videoRef.current,
      play: () => {
        if (videoRef.current) {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              onPlay?.();
            })
            .catch((error) => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
              setError("Playback failed. User interaction may be required.");
              onError?.(error);
            });
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
          onPause?.();
        }
      },
      setMuted: (muted) => {
        if (videoRef.current) {
          videoRef.current.muted = muted;
          setIsMuted(muted);
          if (muted) setVolume(0);
        }
      },
      setVolume: (newVolume) => {
        if (videoRef.current) {
          const volumeValue = Math.max(0, Math.min(100, newVolume));
          videoRef.current.volume = volumeValue / 100;
          setVolume(volumeValue);
          if (volumeValue === 0) {
            setIsMuted(true);
            videoRef.current.muted = true;
          } else if (isMuted) {
            setIsMuted(false);
            videoRef.current.muted = false;
          }
        }
      },
      setSource: (newUrl) => {
        if (videoRef.current) {
          const wasPlaying = !videoRef.current.paused;
          videoRef.current.src = newUrl;
          videoRef.current.load();
          if (wasPlaying) {
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch((e) => {
                setIsPlaying(false);
                onError?.(e);
              });
          }
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      getDuration: () => videoRef.current?.duration || 0,
      seek: (time) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      reset: () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }
      },
      destroy: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.src = "";
          videoRef.current.load();
        }
      },
    }));

    useEffect(() => {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );

      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
        document.removeEventListener(
          "webkitfullscreenchange",
          handleFullscreenChange
        );
      };
    }, []);

    useEffect(() => {
      if (url && videoRef.current) {
        setIsLoading(true);
        setError(null);

        videoRef.current.src = url;
        videoRef.current.load();

        if (autoPlay) {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              onPlay?.();
            })
            .catch((error) => {
              console.error("Autoplay failed:", error);
              setIsPlaying(false);
              onError?.(error);
            });
        }
      }
    }, [url, autoPlay, onPlay, onError]);

    const getVolumePercentageStyle = () => {
      return {
        background: `linear-gradient(to right, white ${volume}%, rgba(255, 255, 255, 0.3) ${volume}%)`,
      };
    };

    const toggleMute = () => {
      if (videoRef.current) {
        const newMutedState = !isMuted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);

        if (newMutedState) {
          setVolume(0);
        } else {
          setVolume(50);
          videoRef.current.volume = 0.5;
        }
      }
    };

    const handleFullscreenChange = useCallback(() => {
      setIsFullscreen(
        !!(document.fullscreenElement || document.webkitFullscreenElement)
      );
    }, []);

    const handleFullscreen = useCallback(() => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }, []);

    const handlePlayPause = useCallback(() => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
          onPause?.();
        } else {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              onPlay?.();
            })
            .catch((error) => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
              onError?.(error);
            });
        }
      }
    }, [isPlaying, onPlay, onPause, onError]);

    const handleReload = useCallback(() => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const wasPlaying = !videoRef.current.paused;

        videoRef.current.load();

        // Try to restore position
        videoRef.current.currentTime = currentTime;

        if (wasPlaying) {
          videoRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((e) => {
              setIsPlaying(false);
              onError?.(e);
            });
        }
      }
    }, [onError]);

    const handleVolumeChange = useCallback(
      (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
          videoRef.current.volume = newVolume / 100;
          if (newVolume === 0) {
            setIsMuted(true);
            videoRef.current.muted = true;
          } else if (isMuted) {
            setIsMuted(false);
            videoRef.current.muted = false;
          }
        }
      },
      [isMuted]
    );

    const handleVideoLoaded = () => {
      setIsLoading(false);
    };

    const handleVideoError = (e) => {
      setIsLoading(false);
      setError("Error loading video");
      onError?.(e);
    };

    return (
      <div className={`video-player ${className}`}>
        <div
          ref={containerRef}
          className={`w-full bg-black ${heightSetting} overflow-hidden relative ${
            classNames.wrapper || ""
          }`}
        >
          {isLoading && (
            <div
              className={`absolute inset-0 flex items-center justify-center ${heightSetting}`}
            >
              <Spin size="large" />
            </div>
          )}

          {error && (
            <div
              className={`absolute inset-0 flex items-center justify-center ${heightSetting} bg-black/80`}
            >
              <div className="text-white text-center px-4">
                <p>{error}</p>
                <button
                  onClick={handleReload}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            className={`object-contain w-full ${videoHeightSetting} ${
              classNames?.video || ""
            }`}
            playsInline
            muted={isMuted}
            poster={poster}
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            onEnded={() => setIsPlaying(false)}
          />

          {renderCustomOverlay && renderCustomOverlay()}

          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-gray-200"
                  >
                    {isPlaying ? (
                      <FaPause className="md:text-xl text-lg" />
                    ) : (
                      <FaPlay className="md:text-xl text-lg" />
                    )}
                  </button>
                  <button
                    onClick={handleReload}
                    className="text-white hover:text-gray-200"
                  >
                    <FaRedo className="md:text-xl text-lg" />
                  </button>
                </div>

                <div className="flex gap-4">
                  <div ref={volumeControlRef} className="flex items-center">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-gray-200"
                    >
                      {isMuted ? (
                        <FaVolumeMute className="md:text-xl text-lg" />
                      ) : (
                        <FaVolumeUp className="md:text-xl text-lg" />
                      )}
                    </button>
                    <div className="w-24 h-8 rounded-lg items-center px-3 transform rotate-270 md:flex hidden">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={getVolumePercentageStyle()}
                        className="w-full h-1 rounded-lg appearance-none cursor-pointer 
                          [&::-webkit-slider-thumb]:appearance-none 
                          [&::-webkit-slider-thumb]:w-3 
                          [&::-webkit-slider-thumb]:h-3 
                          [&::-webkit-slider-thumb]:bg-white 
                          [&::-webkit-slider-thumb]:rounded-full 
                          [&::-webkit-slider-thumb]:shadow-md
                          [&::-webkit-slider-thumb]:hover:w-4
                          [&::-webkit-slider-thumb]:hover:h-4
                          [&::-webkit-slider-thumb]:transition-all
                          [&::-webkit-slider-runnable-track]:rounded-lg
                          [&::-webkit-slider-runnable-track]:bg-transparent
                          [&::-moz-range-thumb]:w-3
                          [&::-moz-range-thumb]:h-3
                          [&::-moz-range-thumb]:bg-white
                          [&::-moz-range-thumb]:border-0
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-track]:rounded-lg
                          [&::-moz-range-track]:bg-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="text-white hover:text-gray-200"
                  >
                    {isFullscreen ? (
                      <FaCompress size={20} />
                    ) : (
                      <FaExpand size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default VideoPlayer;
