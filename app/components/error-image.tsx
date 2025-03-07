'use client'

import Image, { ImageProps } from 'next/image'

const FALLBACK_IMAGE = "/images/placeholder.webp"

export default function ErrorImage(props: ImageProps) {
  return (
    <Image
      {...props}
      src={props.src || FALLBACK_IMAGE}
      onError={(e) => {
        const img = e.target as HTMLImageElement
        img.src = FALLBACK_IMAGE
      }}
    />
  )
}