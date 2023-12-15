interface ComponentProp {
  page: number;
  totalPage: number;
  previousFunction: () => void;
  nextFunction: () => void;
  setFunction: (arg0: number) => void;
}

export default function ExploreNFTPagination({
  page,
  totalPage,
  previousFunction,
  nextFunction,
  setFunction,
}: ComponentProp) {
  let pages1 = [
    { page0: page - 1 },
    { page0: page },
    { page0: page + 1 },
    //  { page: currentPage + 3 },
  ];

  if (page == Math.ceil(totalPage)) {
    pages1 = [{ page0: page - 3 }, { page0: page - 2 }, { page0: page - 1 }];
  }

  if (page == Math.ceil(totalPage) - 1) {
    pages1 = [{ page0: page - 2 }, { page0: page - 1 }, { page0: page }];
  }

  if (page == 1) {
    pages1 = [{ page0: page }, { page0: page + 1 }, { page0: page + 2 }];
  }

  if (Math.ceil(totalPage) == 3 || Math.ceil(totalPage) == 2) {
    pages1 = [{ page0: 1 }, { page0: 2 }];
  }

  return (
    <div className="flex  rounded-lg font-[Poppins] z-30 content-center	justify-center text-white	mb-10 ">
      {page >= 2 ? (
        <button
          onClick={previousFunction}
          className="sm:h-12 
        sm:px-4 sm:mr-12 mr-3"
        >
          Prev
        </button>
      ) : null}
      {/*<button onClick={first} className={`h-12 border-2 rounded-full mr-4 border-white
       w-12 ${1 === currentPage && 'bg-[#64B3AE] text-white'}`}>
     {1}
  </button>
  <button onClick={null} className="h-12  rounded-full mr-4
        px-4 ">
     .  .  .
</button>*/}
      {pages1.map((pg, i) =>
        pg.page0 <= Math.ceil(totalPage) ? (
          <div key={i}>
            <button
              key={i}
              onClick={() => setFunction(pg.page0)}
              className={`sm:h-12 border-2 rounded-full sm:mr-4 border-white
       sm:w-12 w-10 mr-2 h-10 ${
         pg.page0 === page && 'bg-mgreen text-black border-black'
       }`}
            >
              {pg.page0}
            </button>
          </div>
        ) : null
      )}
      <button
        className="sm:h-12  rounded-full sm:mr-4 border-2 
        sm:px-4 mr-2 px-2 h-10"
      >
        . . .
      </button>

      <button
        onClick={previousFunction}
        className={`sm:h-12 border-2 rounded-full sm:mr-4 border-white
       sm:w-12 w-10 h-10 ${
         Math.ceil(totalPage) === page && 'bg-mgreen text-black border-black'
       }`}
      >
        {Math.ceil(totalPage)}
      </button>
      {page < totalPage ? (
        <button
          onClick={nextFunction}
          className="sm:h-12 
        sm:px-4 sm:ml-12 ml-3"
        >
          Next
        </button>
      ) : null}
    </div>
  );
}
