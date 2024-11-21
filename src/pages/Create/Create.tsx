import SuperheroForm from '../../components/SuperheroForm/SuperheroForm';

const CreatePage = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-600 text-center py-8">
          Create Superhero
        </h1>
        <SuperheroForm />
      </div>
    </>
  );
};

export default CreatePage;
