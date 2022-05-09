import html2canvas from 'html2canvas'
import { Camera, Trash } from "phosphor-react";
import { useState } from 'react';
import { Loading } from '../Loading';

interface ScreenshotButtonProps {
  onScreenshotTaken: (screenshot: string | null) => void;
  screenshotTaken: string | null;
}

export function ScreenshotButton({onScreenshotTaken, screenshotTaken}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    onScreenshotTaken(base64image)

    setIsTakingScreenshot(false)
  }

  if(screenshotTaken) {
    return (
      <button
        type='button'
        className='p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
        style={{backgroundImage: `url(${screenshotTaken})`, backgroundSize: 180}}
        onClick={() => onScreenshotTaken(null)}
      >
        <Trash weight='fill' />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 "
      onClick={handleTakeScreenshot}
    >
      {!isTakingScreenshot && <Camera className="w-6 h-6" />}
      {isTakingScreenshot && <Loading />}
    </button>
  );
}
