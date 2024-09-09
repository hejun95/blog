"use client"

import Image from "next/image";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <main className="w-svw h-svh overflow-x-hidden">
      <div className="w-full font-mono">
        <p className="fixed z-10 left-44 top-20 w-auto text-4xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          我的博客-林休休是大美女
        </p>
        {[1, 2, 3, 4, 5].map((el) => (
          <div style={{ display: 'block', width: '100%', height: '100%' }} key={el}>
            <img
              src={`./home_${el}.jpg`}
              alt="home image"
              style={{ width: '100%', height: '100%' }}
            // data-aos="fade-up" data-aos-duration="800"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
