import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import geoSpatialAnalysisIcon from "../../assets/image/geoSpatialAnalysis.png";
import geoSpatialAnalysisImage from "../../assets/image/geoSpatialAnalysisImage.jpg";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const GeoSpatialAnalysis = () => {

  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    return navigate("/geoSpatialCropAnalysis");
  };

  return (
    <div className="py-20 ">
      <div
        className="w-full flex flex-wrap mx-auto justify-center items-center bg-opacity-50 
        max-w-[1450px] rounded-3xl md:py-10 bg-gradient-to-br from-gray-900 via-gray-700 to-black text-white"
      >
        {/* Image Div (Order: 1 on small screens, 3 on large screens) */}
        <div
          className="w-full order-1 md:order-3 md:flex-[0_0_40%] md:w-auto p-4 text-center mb-8 md:mb-0"
        >
          <img
            src={geoSpatialAnalysisImage}
            alt="Groundwater Analysis"
            className="w-[90%] max-w-[200px] md:max-w-[350px] mx-auto 
            md:w-[min(90%,_400px)] rounded-3xl"
            data-aos="fade-up"
          />
        </div>

        {/* Heading (Order: 2 on all screens) */}
        <div className="w-full md:flex-[0_0_55%] md:w-auto p-4 md:p-4 flex items-center">
          <h1 className="text-3xl mb-8 flex items-center text-white-light" data-aos={"fade-up"}>
          {t("geoSpatialAnalysisCardheading")}{" "}
            <img src={geoSpatialAnalysisIcon} alt="" className="w-12 h-12 ml-2" />
          </h1>
        </div>

        {/* Text and Button (Order: 3 on small screens, 2 on large screens) */}
        <div
          className="w-full order-2 md:order-2 md:flex-[0_0_55%] md:w-auto p-4 md:p-8"
        >
          <p className="text-[20px] text-white-light" data-aos={"fade-up"}>
          {t("geoSpatialAnalysisdescription")}
          </p>
          <button
            className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg 
            font-semibold transition duration-500 ease-in-out transform hover:scale-105 
            hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 
            focus:ring-gray-500 text-white-light"
            onClick={handleButtonClick}
            data-aos={"fade-up"}
          >
            {t("geoSpatialAnalysisbutton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeoSpatialAnalysis;
