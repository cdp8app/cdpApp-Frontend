import Image, { ImageProps } from "next/image";

export default function DebugImage(props: ImageProps) {
  if (!props.width || !props.height) {
    console.warn(`Missing dimensions for image: ${props.src}`);
  }
  return <Image {...props} />;
}
