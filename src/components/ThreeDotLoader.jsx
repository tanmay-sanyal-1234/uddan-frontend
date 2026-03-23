import { Oval, ThreeDots } from "react-loader-spinner";

const ThreeDotLoader = ({loader}) => {
  return (
      <ThreeDots
        visible={loader}
        height="80"
        width="80"
        color="#2563eb"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
  );
};


export default ThreeDotLoader;
