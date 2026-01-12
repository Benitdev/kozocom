"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tile } from "./tile";

interface TileState {
  number: number;
  isFlipped?: boolean; // Deprecated - no longer used
  isSelected: boolean | null; // null = unknown, true = selected/taken, false = available
  isSelecting: boolean;
}

export function TileGrid() {
  const [tiles, setTiles] = useState<TileState[]>(() => {
    // Initialize 100 tiles
    return Array.from({ length: 100 }, (_, i) => ({
      number: i + 1,
      isSelected: null,
      isSelecting: false,
    }));
  });

  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  // Load initial status of all tiles
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const response = await fetch("/api/tiles/status");
        if (response.ok) {
          const data = await response.json();
          const status = data.status as Record<number, boolean>;

          setTiles((prev) =>
            prev.map((tile) => ({
              ...tile,
              isSelected: status[tile.number] ? true : false, // true = selected/taken, false = available
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load tile status:", error);
      } finally {
        setIsLoadingStatus(false);
      }
    };

    loadStatus();
  }, []);

  const handleTileClick = async (tileNumber: number) => {
    const tileIndex = tileNumber - 1;
    const tile = tiles[tileIndex];

    // Don't allow clicks if already selecting or if already selected
    if (tile.isSelecting || tile.isSelected === true) {
      return;
    }

    // Show loading state immediately
    setTiles((prev) =>
      prev.map((t, i) => (i === tileIndex ? { ...t, isSelecting: true } : t))
    );

    try {
      // Single API call that checks and selects
      const selectResponse = await fetch("/api/tiles/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: tileNumber }),
      });

      const selectData = await selectResponse.json();

      if (selectResponse.status === 409 || selectData.isSelected) {
        // Already selected by someone else
        setTiles((prev) =>
          prev.map((t, i) =>
            i === tileIndex ? { ...t, isSelected: true, isSelecting: false } : t
          )
        );
      } else if (selectResponse.ok) {
        // Successfully selected - mark as taken (disabled)
        setTiles((prev) =>
          prev.map((t, i) =>
            i === tileIndex
              ? { ...t, isSelected: true, isSelecting: false } // true = taken/selected
              : t
          )
        );
      } else {
        // Error selecting - reset state
        setTiles((prev) =>
          prev.map((t, i) =>
            i === tileIndex ? { ...t, isSelecting: false } : t
          )
        );
      }
    } catch (error) {
      console.error("Error handling tile click:", error);
      // Reset state on error
      setTiles((prev) =>
        prev.map((t, i) => (i === tileIndex ? { ...t, isSelecting: false } : t))
      );
    }
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl p-4">
      {isLoadingStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col items-center justify-center gap-3"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-8 w-8 rounded-full border-4 border-blue-500/30 border-t-blue-400"
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0.4)",
                  "0 0 20px rgba(59, 130, 246, 0.8)",
                  "0 0 0px rgba(59, 130, 246, 0.4)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm font-medium text-blue-300 sm:text-base"
          >
            Loading tile status...
          </motion.p>
        </motion.div>
      )}
      <div className="grid h-full grid-cols-10 gap-2 overflow-y-auto p-2 sm:gap-3 md:gap-4">
        {tiles.map((tile, index) => (
          <motion.div
            className="flex items-center justify-center"
            key={tile.number}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.01,
              duration: 0.3,
            }}
          >
            <Tile
              number={tile.number}
              isFlipped={tile.isFlipped}
              isSelected={tile.isSelected}
              isSelecting={tile.isSelecting}
              onClick={() => handleTileClick(tile.number)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
