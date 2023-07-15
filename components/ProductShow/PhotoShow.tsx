import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination } from "swiper";

interface Props {
  product: FirestoreData;
}

function PhotoShow({ product }: Props) {
  const [photoOnSlide, setPhotoOnSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const handleButtonClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
      setPhotoOnSlide(index);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "flex-start", md: "flex-end" }}
      alignItems={{ xs: "center", md: "flex-start" }}
      gap="20px"
      width="94%"
      padding={{ xs: "10px", md: "0px" }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ xs: "row", md: "column" }}
        gap="10px"
      >
        {product.photos?.map((photo, index) => (
          <Box
            key={index}
            width={{ xs: "50px", md: "80px" }}
            height={{ xs: "50px", md: "80px" }}
            sx={{ cursor: "pointer" }}
            position="relative"
            borderRadius="20px"
            onClick={() => handleButtonClick(index)}
          >
            <Image
              src={photo}
              alt="image"
              fill
              style={{
                border:
                  index === photoOnSlide
                    ? "2px solid lightblue"
                    : "2px solid #FFF6F6",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        width={{ xs: "100%", md: "80%" }}
        height={{ xs: "400px", md: "650px" }}
        position="relative"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        borderRadius="20px"
      >
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Pagination]}
          onSwiper={setSwiperInstance}
          className="mySwiper"
          onSlideChange={(swiper) => {
            setPhotoOnSlide(swiper.activeIndex);
          }}
          style={{ borderRadius: "20px" }}
        >
          {product.photos?.map((photo, index) => (
            <SwiperSlide key={index}>
              <Image src={photo} alt="image" objectFit="scale-down" fill />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default PhotoShow;
