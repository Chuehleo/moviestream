import { useRef } from 'react';
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return{
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  const favoriteSectionRef = useRef<HTMLDivElement>(null);
  const favoriteOnClick = () => {
    if (favoriteSectionRef.current) {
      favoriteSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar favoriteOnClick={favoriteOnClick} />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <div ref={favoriteSectionRef}>
          <MovieList title="Favorites" data={favorites} />
        </div>
      </div>
    </>
  )
}
