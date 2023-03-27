import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import { useRouter } from 'next/router';
import MovieCard from '@/components/MovieCard';
import useSearch from '@/hooks/useSearch';
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

interface SearchResult {
  id: string;
  title: string;
  description: string;
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}

const SearchPage = () => {
    const { isOpen, closeModal } = useInfoModal();
    const router = useRouter();
    const { q } = router.query;
    const { data: searchResults, isLoading } = useSearch(q as string);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
    <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <div className="px-8 md:px-24 mt-8 space-y-16">
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                Search Results:&nbsp;
            </p>
            {searchResults.length === 0 ? (
          <p className="text-white">No results found.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {searchResults.map((result: SearchResult) => (
              <MovieCard key={result.id} data={result} />
            ))}
          </div>
        )}
    
        </div>
    </>
    );
  };
  
  export default SearchPage;




