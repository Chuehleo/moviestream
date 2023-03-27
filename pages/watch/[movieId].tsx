import React from 'react';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';



const VideoPlayer = styled.video`
  height: 100%;
  width: 100%;
  &::-webkit-media-controls-timeline{
    background-color: rgb(2 132 199);
    padding-bottom: 0;
    margin-bottom: 20px;
  }
  
  &::-webkit-slider-thumb {
    background-color: rgb(2 132 199);
  }
  
  &::-webkit-slider-runnable-track {
    background-color: rgb(2 132 199);
  }
`;
const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  
  return (
    <div className="h-screen w-screen bg-black">
      <nav 
        className="
        fixed 
        w-full 
        p-4 
        z-10 
        flex 
        flex-row 
        items-center 
        gap-8 
        bg-black 
        bg-opacity-70
        "
      >
        <AiOutlineArrowLeft onClick={() => router.push('/')} className="text-white cursor-pointer" size={40} />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">
            Watching:&nbsp;
            </span> 
            {data?.title}
        </p>
      </nav>
      <VideoPlayer autoPlay controls src={data?.videoUrl} />
    </div>
   
  )
}

export default Watch;