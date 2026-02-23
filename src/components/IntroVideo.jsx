import React, { useState, useRef, useEffect } from 'react';
import { Play, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroVideo = ({ src, onVideoEnd }) => {
    const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSkip, setShowSkip] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Try to autoplay
        const promise = video.play();
        if (promise !== undefined) {
            promise
                .then(() => {
                    setIsPlaying(true);
                    setIsAutoplayBlocked(false);
                })
                .catch((error) => {
                    console.warn("Autoplay was prevented:", error);
                    setIsAutoplayBlocked(true);
                });
        }

        const skipTimer = setTimeout(() => setShowSkip(true), 1500);
        return () => clearTimeout(skipTimer);
    }, [src]);

    const handlePlayClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
            setIsAutoplayBlocked(false);
        }
    };

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl group border border-gray-800">
            <video
                ref={videoRef}
                src={src}
                muted
                playsInline
                preload="metadata"
                onEnded={onVideoEnd}
                className="w-full h-full object-cover"
            />

            <AnimatePresence>
                {isAutoplayBlocked && !isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 p-4"
                    >
                        <button
                            onClick={handlePlayClick}
                            className="group relative flex flex-col items-center gap-4 transition-transform hover:scale-105"
                        >
                            <div className="w-20 h-20 flex items-center justify-center bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/40 text-white group-hover:bg-indigo-500 transition-colors">
                                <Play size={32} fill="currentColor" className="ml-1" />
                            </div>
                            <span className="text-white font-bold text-lg tracking-wide uppercase">Tap to Start</span>
                        </button>
                    </motion.div>
                )}

                {showSkip && isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-4 right-4 z-20"
                    >
                        <button
                            onClick={onVideoEnd}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
                        >
                            Skip <SkipForward size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Bar Overlay */}
            <div className="absolute bottom-0 left-0 h-1 bg-indigo-500/50 w-full overflow-hidden">
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-indigo-500 origin-left"
                />
            </div>
        </div>
    );
};

export default IntroVideo;
