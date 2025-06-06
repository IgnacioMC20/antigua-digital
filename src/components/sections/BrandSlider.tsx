/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import jsDark from '@/assets/slider/js-logo-dark.svg';
import jsColor from '@/assets/slider/js-logo.svg';
import mongodbDark from '@/assets/slider/mongodb-logo-dark.svg';
import mongodbColor from '@/assets/slider/mongodb-logo.svg';
import mysqlDark from '@/assets/slider/mysql-logo-dark.svg';
import mysqlColor from '@/assets/slider/mysql-logo.svg';
import nextjsDark from '@/assets/slider/nextjs-logo-dark.svg';
import nextjsColor from '@/assets/slider/nextjs-logo.svg';
import nodejsDark from '@/assets/slider/nodejs-logo-dark.svg';
import nodejsColor from '@/assets/slider/nodejs-logo.svg';
import reactDark from '@/assets/slider/react-logo-dark.svg';
import reactColor from '@/assets/slider/react-logo.svg';
import tailwindDark from '@/assets/slider/tailwindcss-logo-dark.svg';
import tailwindColor from '@/assets/slider/tailwindcss-logo.svg';
import tsDark from '@/assets/slider/ts-logo-dark.svg';
import tsColor from '@/assets/slider/ts-logo.svg';
import { fadeIn } from '@/lib/animations';
import { MotionBox } from '@/lib/motionComponents';

const brandData = [
  { name: 'JavaScript', darkLogo: jsDark, colorLogo: jsColor },
  { name: 'TypeScript', darkLogo: tsDark, colorLogo: tsColor },
  { name: 'React', darkLogo: reactDark, colorLogo: reactColor },
  { name: 'Next.js', darkLogo: nextjsDark, colorLogo: nextjsColor },
  { name: 'Node.js', darkLogo: nodejsDark, colorLogo: nodejsColor },
  { name: 'Tailwind CSS', darkLogo: tailwindDark, colorLogo: tailwindColor },
  { name: 'MongoDB', darkLogo: mongodbDark, colorLogo: mongodbColor },
  { name: 'MySQL', darkLogo: mysqlDark, colorLogo: mysqlColor },
];

export const BrandSlider: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleCenterIndices, setVisibleCenterIndices] = useState<number[]>([]);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const swiperRef = useRef(null);

  const swiperOptions = {
    modules: [Autoplay, Navigation, Pagination],
    spaceBetween: 30,
    slidesPerView: 5,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { spaceBetween: 20, slidesPerView: 1 },
      375: { spaceBetween: 20, slidesPerView: 2 },
      576: { spaceBetween: 20, slidesPerView: 3 },
      768: { spaceBetween: 30, slidesPerView: 4 },
      992: { spaceBetween: 30, slidesPerView: 5 },
    },
    onSwiper: (swiper: any) => {
      swiperRef.current = swiper;
      updateVisibleIndices(swiper);
    },
    onResize: (swiper: any) => updateVisibleIndices(swiper),
    onSlideChange: (swiper: any) => updateVisibleIndices(swiper),
  };

  const updateVisibleIndices = (swiper: any) => {
    const slidesPerView = Math.floor(swiper.params.slidesPerView as number);
    const start = swiper.realIndex;
    const totalSlides = brandData.length;
    const visibleIndices = Array.from({ length: slidesPerView }, (_, i) => (start + i) % totalSlides);

    let centerCount = 1;
    if (slidesPerView <= 2) centerCount = visibleIndices.length;
    else if (slidesPerView <= 4) centerCount = 2;
    else centerCount = 3;

    const middle = Math.floor(visibleIndices.length / 2);
    const centerIndices = visibleIndices.slice(middle - Math.floor(centerCount / 2), middle + Math.ceil(centerCount / 2));
    setVisibleCenterIndices(centerIndices);
  };

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      sx={{ width: '100%', overflow: 'hidden', maxWidth: '100vw' }}
    >
      <Swiper {...swiperOptions} style={{ overflow: 'hidden', width: '100%' }}>
        {brandData.map((brand, index) => {
          const showColor =
            hoveredIndex === index || visibleCenterIndices.includes(index);
          const logoToShow = showColor ? brand.colorLogo : brand.darkLogo;

          return (
            <SwiperSlide key={brand.name + index}>
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100px',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '75px',
                    height: '75px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {imageError[index] ? (
                    <Box
                      sx={{
                        width: 150,
                        height: 60,
                        backgroundColor: '#f1f1f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {brand.name}
                    </Box>
                  ) : (
                    <Image
                      src={logoToShow}
                      alt={brand.name}
                      fill
                      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      onError={() =>
                        setImageError(prev => ({ ...prev, [index]: true }))
                      }
                    />
                  )}
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </MotionBox>
  );
};
