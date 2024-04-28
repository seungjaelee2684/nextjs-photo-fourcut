import { useEffect, useRef, useState } from "react";
import { BsCameraVideoOffFill } from "react-icons/bs";
import { MdFiberManualRecord } from "react-icons/md";

export default function Camera() {

  const cameraRef = useRef<HTMLVideoElement>(null);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onClickCaptureHandler = () => {
    const camera = cameraRef.current;

    if (camera) {
      const canvas = document.createElement('canvas');
      canvas.width = camera.videoWidth;
      canvas.height = camera.videoHeight;
      canvas.getContext('2d')?.drawImage(camera, 0, 0);
      const imageUrl = canvas.toDataURL('image.png');
      setImageSrc(imageUrl);
    };
  };

  useEffect(() => {
    const initCamera = async () => {
      try {
        const onCamera = await navigator.mediaDevices.getUserMedia({ video: true });
        if (cameraRef.current) {
          cameraRef.current.srcObject = onCamera;
        };
        setIsConnect(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setIsConnect(false);
      };
    };
    
    initCamera();

    return () => {
      if (cameraRef.current && cameraRef.current.srcObject) {
        const tracks = (cameraRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isConnect]);

  console.log(isConnect);

  return (
    <section className="
      w-[700px]
      h-[600px]
      flex
      flex-col
      justify-center
      items-center
      relative
    ">
      {(isConnect)
        && <MdFiberManualRecord className="
          absolute
          top-20
          right-10
          text-[40px]
          text-red-500
        " />}
      {(isConnect)
        ? <video
          ref={cameraRef}
          autoPlay
          playsInline
          className="
            w-[100%]
            h-[100%]
          " />
        : <div className="
          w-[100%]
          h-[100%]
          bg-black
          text-white
          gap-4
          flex
          flex-col
          justify-center
          items-center">
          <BsCameraVideoOffFill className="text-white text-[60px]"/>
          카메라를 연결해주세요
        </div>}
        <button
          onClick={onClickCaptureHandler}
          className="w-[140px] h-[40px] border hover:bg-black-200">
          Capture
        </button>
        {(imageSrc) && <img src={imageSrc} alt="캡쳐" />}
    </section>
  )
};