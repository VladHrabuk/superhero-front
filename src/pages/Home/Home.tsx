import SuperheroService from '../../api/api';
import SuperheroCard from '../../components/SuperheroCard/SuperheroCard';
import { ISuperhero } from '../../types/ISuperhero';
import { useInfiniteQuery } from '@tanstack/react-query';

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['superheros'],
      queryFn: ({ pageParam = 1 }) =>
        SuperheroService.getAllSuperheros(pageParam, 5),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.nextPage : undefined;
      },
      initialPageParam: 1,
    });

  const currentSuperheros =
    data?.pages.flatMap((page) => page.superheroes) || [];

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-gray-600 text-center py-8">
        Superheros
      </h1>
      <div className="flex gap-10 flex-wrap justify-center m-10">
        {currentSuperheros.map((superhero: ISuperhero) => {
          return (
            <SuperheroCard
              key={superhero.id}
              superhero={superhero}
              refetch={refetch}
            ></SuperheroCard>
          );
        })}
      </div>
      <div className="flex justify-center py-4">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        ) : (
          <p className="text-gray-500">No more superheroes to load</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
