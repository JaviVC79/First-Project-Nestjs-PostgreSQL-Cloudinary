import homeImage from '../../public/home.jpg';

function TaskPage() {
  return (
    // Contenedor principal responsive
    <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 text-white min-h-screen">
      {/* Sección de la imagen */}
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img
          src={homeImage}
          alt="Home"
          className="rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>

      {/* Sección del texto */}
      <div className="w-full md:w-1/2 text-center md:text-left p-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold py-4">
          TaskPage
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">
          Note your task everywhere
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">
          Make the most of your time
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">
          No more downtime
        </p>
      </div>
    </div>
  );
}

export default TaskPage;
