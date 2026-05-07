'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import hero1 from '@/img/hero1.png';
import hero2 from '@/img/hero2.png';
import styles from './HeroSlider.module.css';

interface HeroSliderProps {
  children: React.ReactNode;
}

export default function HeroSlider({ children }: HeroSliderProps) {
  return (
    <div className={styles.heroWrapper}>
      <Splide
        className={styles.heroSplide}
        options={{
          type: 'fade',
          rewind: true,
          autoplay: true,
          interval: 5000,
          speed: 5000,
          pauseOnHover: false,
          pauseOnFocus: false,
          arrows: false,
          pagination: false,
          drag: false,
        }}
      >
        <SplideSlide>
          <Image
            src={hero1}
            alt=""
            fill
            priority
            className={styles.heroImage}
          />
        </SplideSlide>
        <SplideSlide>
          <Image
            src={hero2}
            alt=""
            fill
            priority
            className={styles.heroImage}
          />
        </SplideSlide>
      </Splide>

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        {children}
      </div>
    </div>
  );
}
