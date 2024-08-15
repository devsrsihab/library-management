import React from "react";
import { Carousel } from "antd";



const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  margin: "0 15px",
  border: "2px solid #",
  padding: "15px",
};



const BookCarousel: React.FC = () => (
  <div className="w-full bg-[#364d79]">
    <Carousel
      dots={true}
      slidesToShow={3}
      slidesToScroll={1}
      arrows
      infinite={true}
      autoplay
    >
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
      <div>
        <h3 style={contentStyle}>5</h3>
      </div>
      <div>
        <h3 style={contentStyle}>6</h3>
      </div>
      <div>
        <h3 style={contentStyle}>7</h3>
      </div>
      <div>
        <h3 style={contentStyle}>8</h3>
      </div>
    </Carousel>
  </div>
);

export default BookCarousel;
