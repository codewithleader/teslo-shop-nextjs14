'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={
          {
            width: '100vw',
            height: '400px',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        loop={true}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className='mySwiper2'
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <Image
              src={`/products/${img}`}
              alt={title}
              // className='object-fill'
              width={600}
              height={500}
              className='object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
