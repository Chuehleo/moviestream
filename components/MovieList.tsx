import React, { useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import MovieCard from './MovieCard';

    interface MovieListProps {
        data: Record<string, any>[];
        title: string;
    }

    const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
        const listRef = useRef<HTMLDivElement>(null);
        const [sliderPosition, setSliderPosition] = useState(0);
        const [showControls, setShowControls] = useState(false);
      
        const handleDirection = (direction: 'left' | 'right') => {
          const listElement = listRef.current;
          if (listElement) {
            const slideWidth = 100 / data.length;
            const minTranslateX = -(data.length - 1) * slideWidth;
            const maxTranslateX = 0;
            let newSliderPosition = sliderPosition;
      
            if (direction === 'left' && sliderPosition > 0) {
              newSliderPosition--;
            } else if (direction === 'right' && sliderPosition < data.length - 1) {
              newSliderPosition++;
            }
      
            const newTranslateX = -newSliderPosition * slideWidth;
      
            if (newTranslateX < minTranslateX) {
              newSliderPosition = data.length - 1;
            } else if (newTranslateX > maxTranslateX) {
              newSliderPosition = 0;
            }
      
            listElement.style.transform = `translateX(${newTranslateX}%)`;
            setSliderPosition(newSliderPosition);
          }
        };

        if (isEmpty(data)) {
          return null;
      }
    
      
  return (
    <Container
      className="px-4 md:px-12 mt-8 space-y-8"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          &nbsp;&nbsp;{title}
        </p>
        <div className="wrapper">
          <div
            className={`slider-action left ${
              !showControls ? 'none' : ''
            } flex j-center a-center`}
          >
            <AiOutlineLeft onClick={() => handleDirection('left')} className="text-white hover:text-gray-300 cursor-pointer"/>
          </div>
          <div className="slider flex" ref={listRef}>
            {data.map((movie) => (
              <MovieCard key={movie.id} data={movie}/>
            ))}
          </div>
          <div
            className={`slider-action right ${
              !showControls ? 'none' : ''
            } flex j-center a-center`}
          >
            <AiOutlineRight onClick={() => handleDirection('right')} className="text-white hover:text-gray-300 cursor-pointer"/>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ showControls: boolean }>`
  gap: 1rem;
  position: relative;
  padding: 3rem 0;

  .wrapper {
    position: relative;
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 1%;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
      justify-content: flex-end;
      align-items: center;
    }
    .right {
        right: 0;
        justify-content: flex-end;
        align-items: center;
    }
  }
`;

 export default MovieList;
