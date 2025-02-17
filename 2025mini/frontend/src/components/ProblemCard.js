const ProblemCard = ({ imgSrc, alt, description }) => {
    return (
      <div className="flex flex-col items-center">
        <img src={imgSrc} alt={alt} className="w-1/2 rounded-md shadow-lg"/>
        <p className="mt-4 text-gray-600">{description}</p>
      </div>
    );
  };
  
  export default ProblemCard;
  