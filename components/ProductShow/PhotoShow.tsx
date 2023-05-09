import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { Product } from "@/pages/product-page/[productID]";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

interface Props {
  product: Product;
}

function PhotoShow({ product }: Props) {
  const [photoOnSlide, setPhotoOnSlide] = useState(product.photoUrl[0]);
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
        flexDirection={{ xs: "row", md: "column" }}
        gap="10px"
      >
        {product.photoUrl.map((photo, index) => (
          <Box
            width={{ xs: "50px", md: "80px" }}
            height={{ xs: "50px", md: "80px" }}
            position="relative"
            borderRadius="20px"
          >
            <Image
              key={index}
              src={photo}
              alt="image"
              fill
              style={{
                border:
                  photo === photoOnSlide
                    ? "2px solid lightblue"
                    : "2px solid #FFF6F6",
                borderRadius: "20px",
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
          className="mySwiper"
          onSlideChange={(swiper) => {
            setPhotoOnSlide(product.photoUrl[swiper.activeIndex]);
          }}
          style={{ borderRadius: "20px" }}
        >
          {product.photoUrl.map((photo, index) => (
            <SwiperSlide key={index}>
              <Image src={photo} alt="image" objectFit="cover" fill />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default PhotoShow;
