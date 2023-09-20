'use client';

import { useEffect, useState } from "react";
import { today } from "./server-thing";

export const ClientThing = () => {
    const [time, setTime] = useState<number | undefined>();
    useEffect(() => {
        (async () => {
            setTime(await today());
        })();
    }, []);
    return <div>
        <h1>Client Thing</h1>
        <p>Time: {time}</p>
    </div>;
}