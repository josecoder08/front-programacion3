const Card = ({ data }) => {
  return (
    <div className="bg-white cursor-pointer w-full sm:w-56 h-auto sm:h-60 rounded-lg shadow-lg p-4">
      {/* La imagen está comentada, pero si decides usarla en el futuro, aquí la dejo organizada */}
      {/* <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data.data.category.name}</span>
        <img className="w-full h-full object-cover rounded-lg" src={data.data.images[0]} alt={data.data.title} />
        <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1">
          +</div>
      </figure> */}

      {/* Contenido principal */}
      <p className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <span className="text-sm font-light text-gray-700">{data.data.firtname}</span>
        <span className="text-lg font-medium text-gray-900">${data.data.lastname}</span>
      </p>
    </div>
  );
};

export default Card;