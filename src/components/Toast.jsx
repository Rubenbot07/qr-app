import {  useEffect, useState } from 'react'

export function Toast({ toast }) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    if (toast) {
        setProgress(100);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 20);

        return () => clearInterval(interval);
    }
}, [toast]);


    return (
        <>
            {toast && (
                <div className="bg-blue-800 p-2 rounded-xl flex flex-col w-auto absolute bottom-4 right-4 items-center justify-center" > 
                    <p className="text-white" role="alert" aria-live='assertive'>URL Copied to clipboard</p>
                    <div className="bg-white h-2" style={{ width: `${progress}%` }}></div>
                </div>
            )}
        </>
    )
}