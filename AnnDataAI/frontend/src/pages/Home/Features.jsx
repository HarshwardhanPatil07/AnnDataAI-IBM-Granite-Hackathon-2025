import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import CardData from "../../data/featuresCardData";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Features = () => {

  const {t} = useTranslation();

  const handleCardClick = (index)=>{
    console.log(`Clicked ${index}`);
    
  }

  const navigate = useNavigate();
  return (
    <>
      <section className="services-section py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
              {t("featureCardheading")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("featureCarddescription")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {CardData.map((data, index) => (
              <Card 
                key={index} 
                className="group w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
                onClick={() => navigate(data.path)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image Header with Gradient Overlay */}
                <CardHeader className="relative h-48 m-0 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 z-20 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </div>
                </CardHeader>

                {/* Content */}
                <CardBody className="p-6">
                  <Typography variant="h5" className="mb-3 text-gray-900 dark:text-white font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {t(data.title)}
                  </Typography>
                  <Typography className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(data.description)}
                  </Typography>
                </CardBody>

                {/* Enhanced Footer */}
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(data.path);
                    }}
                  >
                    <span className="flex items-center justify-center">
                      Explore Feature
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </CardFooter>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-br-3xl"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
