import { useEffect, useRef, useState } from "react";
import { BsCameraVideoOffFill } from "react-icons/bs";
import { MdFiberManualRecord } from "react-icons/md";

const CameraSection = `
  w-[100%]
  flex
  flex-col
  justify-center
  items-center
  relative
  gap-3
`;

const CameraIcon = `
  absolute
  top-[15%]
  right-[5%]
  text-[40px]
  text-red-500
`;

const NoneCamera = `
  w-[600px]
  h-[600px]
  bg-black
  text-white
  gap-4
  flex
  flex-col
  justify-center
  items-center
`;

export default function Camera() {

  const cameraRef = useRef<HTMLVideoElement>(null);
  const imgArr: number[] = [0, 1, 2, 3];
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string[]>([]);

  const onClickCaptureHandler = () => {
    const camera = cameraRef.current;

    if (camera) {
      const canvas = document.createElement('canvas');
      canvas.width = camera.videoWidth;
      canvas.height = camera.videoHeight;
      canvas.getContext('2d')?.drawImage(camera, 0, 0);
      const imageUrl = canvas.toDataURL('image.png');
      setImageSrc([...imageSrc, imageUrl]);
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
    <section className={CameraSection}>
      {(isConnect)
        ? <div className="relative">
          <MdFiberManualRecord className={CameraIcon} />
          <video
            ref={cameraRef}
            autoPlay
            playsInline
            className="w-[600px] h-[600px]" />
        </div>
        : <div className={NoneCamera}>
          <BsCameraVideoOffFill className="text-white text-[60px]" />
          카메라를 연결해주세요
        </div>}
      <button
        onClick={onClickCaptureHandler}
        className="w-[140px] h-[40px] rounded border hover:bg-gray-100">
        Capture
      </button>
      <div className="w-[600px] flex justify-center align-center gap-6">
        {imgArr?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="w-[100px] h-[100px] border">
              {(imageSrc[item]) && <img src={imageSrc[item]} alt="캡쳐" className="w-[100%] h-[100%] cover" />}
            </div>
          )
        })}
        
      </div>
    </section>
  )
};