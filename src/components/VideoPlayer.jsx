import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaExpand,
  FaCompress,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import flvjs from "flv.js";
import Hls from "hls.js";
import { Button, Flex, Image, Spin } from "antd";
import { useLocation, useNavigate } from "react-router";
import useLiveDetail from "../hooks/useLiveDetail";
import Countdown from "./CountDown";
import { MdOutlineUpdateDisabled, MdPlayDisabled } from "react-icons/md";
import dayjs from "dayjs";
import { CiStreamOn } from "react-icons/ci";
import useGetMasterLink from "../hooks/useGetMasterLink";
import { extractStreamUrls } from "../utils/helper";
import {
  videoHeightSettingInHome,
  videoHeightSettingInRoom,
} from "../utils/constant";

import DefaultBanner from "../assets/news.webp";

const LivestreamPlayer = ({ liveId }) => {
  const pathname = useLocation().pathname;
  const isLivePage = pathname.includes("/live/");
  const isLiveMobilePage = pathname.includes("/live-mobile");
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const volumeControlRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoLiveHeightSetting = `${
    isFullscreen
      ? "!h-full"
      : isLivePage || isLiveMobilePage
      ? videoHeightSettingInRoom
      : videoHeightSettingInHome
  }`;
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(
    !pathname.includes("/live/") && !pathname.includes("/live-mobile")
  );

  const { data: liveData, isLoading: isLiveDetailLoading } =
    useLiveDetail(liveId);
  const liveDetailData = liveData?.data?.data;
  const masterLink = liveDetailData?.masterLink;
  const flvUrl = liveDetailData?.flvLink;
  let hlsUrl = liveDetailData?.hlsLink;
  let isStreaming = liveDetailData?.isStreaming;

  const { masterLink: masterLinkData } = useGetMasterLink(masterLink);
  const links = masterLinkData?.data?.data
    ? extractStreamUrls(masterLinkData?.data?.data)
    : null;
  Array.isArray(links) && links.length > 0 ? (hlsUrl = links[0].url) : null;

  const isDefaultLivestream = liveDetailData?.isDefaultLivestream;
  isDefaultLivestream && (hlsUrl = liveDetailData?.defaultLink);

  const getVolumePercentageStyle = () => {
    return {
      background: `linear-gradient(to right, white ${volume}%, rgba(255, 255, 255, 0.3) ${volume}%)`,
    };
  };

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  useEffect(() => {
    if (isLiveDetailLoading) return;

    if (flvUrl || hlsUrl) {
      initializePlayer();
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      destroyPlayer();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [flvUrl, hlsUrl, isLiveDetailLoading]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (liveDetailData?.scheduleTime) {
        if (dayjs().isAfter(dayjs(liveDetailData?.scheduleTime))) {
          setIsLive(true);
        } else {
          setIsLive(false);
        }
      }
    }, 1000);

    if (liveDetailData?.isStreaming) {
      clearInterval(intervalId);
      setIsLive(true);
    }

    return () => clearInterval(intervalId);
  }, [liveDetailData]);

  const initializePlayer = () => {
    setError(null);
    setIsLoading(true);

    // Check if FLV is available and preferred
    if (flvUrl && !isIOS) {
      // console.log("Attempting to play FLV:", flvUrl);
      // console.log("FLV.js Support:", flvjs.isSupported());
      // console.log("Video element ready:", videoRef.current);
      if (flvjs.isSupported()) {
        initializeFLVPlayer();
        setIsLoading(false);
        return; // Exit after initializing FLV
      } else {
        console.warn("FLV not supported, falling back to HLS");
        setIsLoading(false);
      }
    }

    // Fallback to HLS
    if (hlsUrl) {
      // console.log("Attempting to play HLS:", hlsUrl);
      initializeHLSPlayer();
      setIsLoading(false);
    } else {
      setError("No streaming URL available");
      setIsLoading(false);
    }
  };

  const initializeHLSPlayer = () => {
    try {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = hlsUrl;
        startPlayback();
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          lowLatencyMode: true,
          liveSyncDuration: 0,
          liveMaxLatencyDuration: 1,
          initialLiveManifestSize: 0,
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS Error:", event, data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setError("Network error occurred. Retrying...");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setError("Media error occurred. Recovering...");
                hls.recoverMediaError();
                break;
              default:
                setError("Fatal streaming error occurred");
                destroyPlayer();
                setTimeout(initializePlayer, 5000);
                break;
            }
          }
        });

        hls.loadSource(hlsUrl);
        hls.attachMedia(videoRef.current);
        playerRef.current = hls;

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          startPlayback();
        });
      } else {
        setError("HLS playback is not supported in this browser");
      }
    } catch (error) {
      console.error("HLS initialization error:", error);
      setError("Failed to initialize HLS player");
    }
  };

  const initializeFLVPlayer = () => {
    try {
      if (flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: flvUrl,
          isLive: true,
        });

        flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail) => {
          // console.error("FLV Error Type:", errorType);
          // console.error("Error Details:", errorDetail);
          // console.error("Player Info:", flvPlayer.getStatisticsInfo());
          setError("Stream error occurred. Retrying...");
          destroyPlayer();
          setTimeout(initializePlayer, 5000);
        });

        // flvPlayer.on(flvjs.Events.STATISTICS_INFO, (stats) => {
        //   console.log("Player Statistics:", stats);
        // });

        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();
        playerRef.current = flvPlayer;

        startPlayback();
      } else {
        setError("FLV playback is not supported in this browser");
      }
    } catch (error) {
      console.error("FLV initialization error:", error);
      setError("Failed to initialize FLV player");
    }
  };

  const startPlayback = () => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Playback failed:", error);
          if (error.name === "NotAllowedError") {
            setNeedsInteraction(true);
          } else {
            console.error("Playback failed:", error);
            // setError("Failed to start playback. Please try again.");
          }
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  const handleInitialPlay = () => {
    navigate(`/live/${liveId}`);
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
      }
    }
  };

  const destroyPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.src = "";
      videoRef.current.load();
    }
  };

  const handleReplay = () => {
    destroyPlayer();
    initializePlayer();
  };

  const handleFullscreen = () => {
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
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(
      !!(document.fullscreenElement || document.webkitFullscreenElement)
    );
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Playback failed:", error);
            setError("Failed to start playback. Please try again.");
            setIsPlaying(false);
          });
      }
    }
  };

  const handleVolumeChange = (e) => {
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
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "OK9 Live",
        text: "Hãy xem thử livestream của chúng tôi!!!",
        url: window.location.href,
      });
    }
  };

  return (
    <div className={`video-player `}>
      <div
        ref={containerRef}
        className={`w-full bg-black  ${
          isLivePage ? "rounded-2xl" : "rounded-2xl"
        } ${videoLiveHeightSetting} border border-[var(--color-brand-primary)] overflow-hidden relative`}
      >
        {!isStreaming && !isLiveDetailLoading && !isLoading && (
          <div className={`bg-black/80 z-0 w-full h-full`}>
            <Flex
              vertical
              justify="center"
              align="center"
              className="w-full h-full "
            >
              <Image
                // src={liveDetailData?.thumbnail ?? DefaultBanner}
                src={DefaultBanner}
                preview={false}
                loading="lazy"
              />
            </Flex>
          </div>
        )}

        {(isLiveDetailLoading || isLoading) && (
          <div className={`relative ${videoLiveHeightSetting}`}>
            <Spin
              size="large"
              className="absolute top-1/2 left-1/2 -translate-x-[90%] -translate-y-2/3 live-detail-spinning"
            />
          </div>
        )}

        <video
          ref={videoRef}
          className={`object-contain w-full ${videoLiveHeightSetting}`}
          playsInline
          muted={isMuted}
          loop
        />

        {needsInteraction && !isLiveDetailLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer">
            <Button
              variant="outlined"
              className="md:p-6 p-2 font-sfProDisplay rounded-full !bg-white hover:!bg-[var(--color-brand-primary)] !text-[var(--color-brand-primary)] md:text-base text-[12px] hover:!text-white uppercase font-bold border-[var(--color-brand-primary)] hover:!border-white"
              onClick={handleInitialPlay}
              style={{
                borderRadius: "43.963px",
                border: " 1.499px solid text-[var(--color-brand-primary)]",
                background:
                  "radial-gradient(76.16% 76.16% at 31.97% 19.67%, #FFF 0%, rgba(255, 255, 255, 0.00) 69.79%, rgba(255, 255, 255, 0.00) 100%), #F1F1F1",
                boxShadow:
                  "0px 1.998px 4.696px 0px rgba(0, 0, 0, 0.07), 0px -2.998px 7.993px 0px rgba(255, 255, 255, 0.25) inset, 5.995px 8.993px 8.993px 0px rgba(255, 255, 255, 0.60) inset, 0px 1.998px 1.998px 0px rgba(255, 255, 255, 0.60) inset, -9.992px -11.99px 17.985px 0px rgba(91, 216, 255, 0.10) inset, 2.998px 3.997px 7.993px 0px rgba(255, 255, 255, 0.70)",
              }}
            >
              Vào Phòng Live
            </Button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-between items-center gap-4">
            <Flex gap={16}>
              {isStreaming ? (
                <>
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
                    onClick={handleReplay}
                    className="text-white hover:text-gray-200"
                  >
                    <FaRedo className="md:text-xl text-lg" />
                  </button>
                </>
              ) : (
                <>
                  <button className="text-white hover:text-gray-200">
                    <MdPlayDisabled className="md:text-2xl text-lg" />
                  </button>
                  <button className="text-white hover:text-gray-200">
                    <MdOutlineUpdateDisabled className="md:text-2xl text-lg" />
                  </button>
                </>
              )}
            </Flex>
            {!isStreaming && liveDetailData?.scheduleTime && (
              <Flex>
                <Countdown time={liveDetailData?.scheduleTime} />
              </Flex>
            )}
            <Flex gap={16}>
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

              {isStreaming && (
                <div className="items-center px-1 gap-1 flex rounded-lg bg-red-500 text-white">
                  <CiStreamOn
                    className="text-xl animate-pulse"
                    strokeWidth={1}
                  />
                  <span className="text-[12px] uppercase">trực tiếp</span>
                </div>
              )}

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
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestreamPlayer;
