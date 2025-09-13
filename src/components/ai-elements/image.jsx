/** biome-ignore-all lint/performance/noImgElement: "ai-elements is framework agnostic" */
/** biome-ignore-all lint/nursery/useImageSize: "size will be handled by props" */

import { cn } from "@/lib/utils";
import { ImageModal } from "./image-modal";
import { useState } from "react";

export const Image = ({ base64, uint8Array, mediaType, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ImageModal
      base64={base64}
      mediaType={mediaType}
      alt={props.alt}
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <img
        {...props}
        alt={props.alt}
        className={cn(
          "h-auto max-w-full overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity",
          props.className,
        )}
        src={`data:${mediaType};base64,${base64}`}
        onClick={() => setIsModalOpen(true)}
      />
    </ImageModal>
  );
};
