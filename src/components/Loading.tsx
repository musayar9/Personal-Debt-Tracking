import { ColorRing } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e"]}
      />
    </div>
  );
};

export default Loading;
