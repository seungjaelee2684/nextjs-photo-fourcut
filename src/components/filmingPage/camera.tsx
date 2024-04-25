import { useEffect, useRef, useState } from "react";

export default function Camera() {

  const cameraRef = useRef<HTMLVideoElement>(null);
  const [isConnect, setIsConnect] = useState<boolean>(false);

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
  }, []);

  console.log(isConnect);

  return (
    <section className="w-[700px] h-[600px] flex justify-center">
      {(isConnect)
        ? <video
          ref={cameraRef}
          autoPlay
          playsInline
          className="
            w-[100%]
            h-[100%]
          " />
        : <div className="w-[100%] h-[100%] bg-black rounded-md">ddd</div>}
    </section>
  )
};