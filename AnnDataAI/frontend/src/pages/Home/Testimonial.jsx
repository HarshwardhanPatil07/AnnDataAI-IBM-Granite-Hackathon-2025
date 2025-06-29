import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { testimonials } from "../../data/testimonials.js";
import { useTranslation } from "react-i18next";

export default function Testimonial() {
    const { t } = useTranslation();
    const swiperRef = useRef(null);

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6" data-aos="fade-up">
                        {t("testimonialsheading")}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                        {t("testimonialsdescription")}
                    </p>
                    <div className="mt-8 w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="200"></div>
                </div>

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="testimonial-swiper pb-16"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                                onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                                onMouseLeave={() => swiperRef.current?.autoplay.start()}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Quote decoration */}
                                <div className="absolute top-4 right-6 text-6xl text-emerald-100 dark:text-emerald-900 font-serif">"</div>
                                
                                {/* Profile section */}
                                <div className="flex items-center mb-6 relative z-10">
                                    <div className="relative">
                                        <img
                                            src={testimonial.image}
                                            alt={t(`testimonials.${index}.name`)}
                                            className="w-16 h-16 object-cover rounded-full border-4 border-emerald-500 group-hover:border-blue-500 transition-colors duration-300"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4 text-left">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                            {t(`testimonials.${index}.name`)}
                                        </h3>
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                            {t(`testimonials.${index}.role`)}
                                        </p>
                                    </div>
                                </div>

                                {/* Testimonial text */}
                                <div className="relative z-10">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base italic">
                                        "{t(`testimonials.${index}.message`)}"
                                    </p>
                                </div>

                                {/* Rating stars */}
                                <div className="flex justify-center mt-6 space-x-1">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <svg key={starIndex} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Gradient accent */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}