"use client";

import Camera from "@/components/filmingPage/camera";
import { Article } from "@/styles/articleStyle";
import { useEffect, useRef, useState } from "react";

export default function FilmingPage() {

    // const [isCamera, setIsCamera] = useState<boolean>(false);

    return (
        <article className={Article}>
            <Camera />
        </article>
    )
};