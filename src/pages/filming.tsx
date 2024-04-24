"use client";

import { Article } from "@/styles/articleStyle";
import { useEffect, useRef, useState } from "react";

export default function FilmingPage() {

    const cameraRef = useRef<HTMLVideoElement>(null);
    // const [isCamera, setIsCamera] = useState<boolean>(false);

    useEffect(() => {
        const initCamera = async () =>{
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (cameraRef.current) {
                    cameraRef.current.srcObject = stream;
                };
            } catch (error) {
                console.error("Error accessing camera:", error);
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

    return (
        <article className={Article}>
            <section className="w-[100%] h-[100vh - 50px] flex justify-center">
                <video ref={cameraRef} autoPlay playsInline />
            </section>
        </article>
    )
};