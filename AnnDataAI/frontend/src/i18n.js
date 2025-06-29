// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // FAQ translations
      "faqheading": "Frequently Asked Questions",
      "faq.question1": "What is AnnDataAI – the Advanced Agricultural Intelligence Platform?",
      "faq.answer1": "AnnDataAI is an innovative IBM Granite AI-powered platform that provides real-time, data-driven insights to help farmers optimize crop management, predict agricultural trends, and improve overall farm productivity through advanced analytics.",
      "faq.question2": "How does AnnDataAI work?",
      "faq.answer2": "It integrates data from soil sensors, weather forecasts, satellite imagery, and historical crop records with IBM Granite AI machine learning models to deliver actionable recommendations tailored to your farm's specific needs.",
      "faq.question3": "What technologies power AnnDataAI?",
      "faq.answer3": "AnnDataAI leverages IBM Granite AI, IoT sensors, cloud computing, artificial intelligence, machine learning, and advanced data analytics to continuously monitor environmental conditions and analyze agricultural patterns for precise decision support.",
      "faq.question4": "How accurate are the system's predictions?",
      "faq.answer4": "Our system is designed to achieve over 90% accuracy in agricultural predictions and recommendations. It continuously improves through machine learning and ongoing data integration, ensuring reliable insights over time.",
      "faq.question5": "What challenges does AnnDataAI address?",
      "faq.answer5": "It tackles issues such as unpredictable agricultural conditions, resource optimization, and market forecasting by providing timely insights and recommendations, helping farmers maximize efficiency and profitability.",
      "faq.question6": "How does the system analyze soil and crop conditions?",
      "faq.answer6": "By using IoT-based sensors and advanced analytics to monitor moisture, pH, nutrient levels, and crop health, AnnDataAI offers tailored advice on irrigation, fertilization, and management to maintain optimal growing conditions.",
      "faq.question7": "Does AnnDataAI offer real-time agricultural insights?",
      "faq.answer7": "Yes, the platform integrates with multiple data sources to provide real-time agricultural intelligence, market trends, and environmental predictions that assist in strategic farm planning and decision-making.",
        

       // Info sections translations
       "info.section1.title": "What is an Automated Irrigation System?",
       "info.section1.content1": "An automated irrigation system uses IoT-based sensors to monitor soil moisture and automate water delivery to crops. It ensures the right amount of water is supplied at the right time, improving crop yield while conserving water.",
       "info.section1.content2": "By analyzing environmental data and crop requirements, the system can activate or deactivate pumps, minimizing water waste and promoting sustainable agriculture.",
 
       "info.section2.title": "Why is Smart Irrigation Important?",
       "info.section2.content1": "Efficient irrigation management reduces water consumption and helps prevent over-watering or under-watering of crops.",
       "info.section2.content2": "Smart irrigation promotes sustainable farming practices, ensuring optimal crop health and minimizing resource wastage.",
       "info.section2.content3": "It enables farmers to make data-driven decisions by integrating weather forecasts, crop-specific data, and soil health information.",
 
       "info.section3.title": "How Our System Works",
       "info.section3.content1": "Our system collects data from soil moisture sensors and sends it to the cloud in real-time.",
       "info.section3.content2": "Using crop-specific datasets and weather APIs, the system analyzes moisture levels to determine whether irrigation is needed.",
       "info.section3.content3": "If needed, the system activates the motor remotely, delivering the precise amount of water required.",
       "info.section3.content4": "Users can monitor the status of the pump and receive notifications through our web application.",
 
       "info.section4.title": "Key Features of Our System",
       "info.section4.content1": "Real-time soil moisture monitoring with IoT sensors.",
       "info.section4.content2": "Integration with weather APIs for accurate predictions.",
       "info.section4.content3": "Automated motor control for irrigation.",
       "info.section4.content4": "User-friendly web interface for monitoring and management.",
       "info.section4.content5": "Cloud storage of historical data for insights and analytics.",
 
       "info.section5.title": "Our Goals",
       "info.section5.content1": "Efficient Water Management through Smart Irrigation.",
       "info.section5.content2": "Improving Crop Yield with Automated Systems.",
       "info.section5.content3": "Supporting Farmers with Data-Driven Insights.",
       "info.section5.content4": "Promoting Sustainable and Resource-Conscious Agriculture.",
 
       "info.section6.title": "Get Started with Smart Irrigation",
       "info.section6.content1": "Begin your journey towards efficient water management with our automated irrigation system. With just a few steps, you can monitor, control, and optimize your irrigation process from anywhere, ensuring sustainable use of water resources and healthy crops.",
 

       // HomePage texts
       "homepage.title": "AnnDataAI",
       "homepage.description": "Leverage our advanced IBM Granite AI-powered agricultural intelligence platform to enhance your farming practices. Our comprehensive data analytics provide personalized crop insights, soil analysis, market predictions, and data-driven recommendations to optimize agricultural productivity.",
       "homepage.getStarted": "Get Started",
       "homepage.viewMore": "View More",
       
       // Main Hero Section
       "hero.badge": "Powered by IBM Granite AI",
       "hero.mainTitle": "Transform Your Farm with IBM Granite AI",
       "hero.benefit1": "Increase yields by 35%",
       "hero.benefit1sub": "with AI-powered crop recommendations",
       "hero.benefit2": "Save ₹2+ lakhs annually",
       "hero.benefit2sub": "through optimized resource management",
       "hero.benefit3": "Access 15+ AI tools",
       "hero.benefit3sub": "for complete farm intelligence",
       "hero.startAnalyzing": "Start Analyzing",
       "hero.visitShop": "Visit Shop",
       "hero.signInToStart": "Sign In to Start",
       "hero.createAccount": "Create Account",
       "hero.signInRequired": "🔒 Sign in required:",
       "hero.signInMessage": "Access advanced IBM Granite AI agricultural analysis tools and features",
       "hero.yieldIncrease": "Crop Yield Increase",
       "hero.aiTools": "AI Analysis Tools",
       "hero.annualSavings": "Annual Savings",
       
       // Financial Support Section
       "financial.title": "Financial Support for Farmers",
       "financial.description": "Access government schemes, smart loan recommendations, and educational resources to grow your farming business",
       "financial.govSchemes": "Government Schemes",
       "financial.smartLoan": "Smart Loan Finder",
       "financial.education": "Farmer Education",
       "financial.schemesTitle": "Government Schemes",
       "financial.schemesDescription": "Find government schemes tailored to your farming needs",
       "financial.getAIRecommendations": "Get AI Recommendations",
       "financial.loading": "Loading...",
       "financial.loanTitle": "Smart Loan Finder",
       "financial.loanDescription": "Get personalized loan recommendations based on your farming profile",
       "financial.educationTitle": "Farmer Education",
       "financial.educationDescription": "Access AI-powered educational content and training resources",
       "financial.fetchRecommendations": "Fetch Recommendations",
       "financial.generateContent": "Generate Content",
       "financial.shareDetails": "Share Your Details",
       "financial.age": "Age",
       "financial.enterAge": "Enter your age",

       "testimonialsheading": "What people are saying.",
  "testimonialsdescription": "Hear from those who’ve experienced the impact firsthand.",
  
  "testimonials.0.message": "The AI-powered crop recommendation feature has transformed how we choose crops for our fields. It ensures that we plant the right crop for the soil and weather, leading to better productivity and sustainable farming.",
  "testimonials.0.name": "Dr. Arjun Patel",
  "testimonials.0.role": "Agronomist",

  "testimonials.1.message": "With personalized fertilizer suggestions, we’ve optimized crop nutrition and reduced waste. The precise recommendations have improved the health of our crops while lowering costs.",
  "testimonials.1.name": "Priya Mehta",
  "testimonials.1.role": "Agricultural Consultant",

  "testimonials.2.message": "The crop yield prediction tool has been a game-changer for our farm. It gives us a clear understanding of potential yields, helping us plan for harvests and manage resources more effectively.",
  "testimonials.2.name": "Suresh Kumar",
  "testimonials.2.role": "Farm Manager",

  "testimonials.3.message": "The combination of weather data, crop recommendations, and irrigation control has greatly benefited our village's agricultural efforts. This platform provides all the insights we need in one place.",
  "testimonials.3.name": "Anjali Singh",
  "testimonials.3.role": "Local Government Official",

  "testimonials.4.message": "The system’s AI-driven insights have been pivotal in identifying crops suited for varying soil conditions across our region. It has empowered farmers to make better planting decisions.",
  "testimonials.4.name": "Rahul Desai",
  "testimonials.4.role": "Soil Scientist",

  "testimonials.5.message": "Since using this platform, my farm’s yield has improved significantly. The crop recommendation and irrigation control tools have taken the guesswork out of farming and made everything more efficient.",
  "testimonials.5.name": "Ravi Sharma",
  "testimonials.5.role": "Farmer",

      // Features Card Section

        "featureCardheading": "Explore our Features",
        "featureCarddescription":"Explore how our smart irrigation system empowers farmers with real-time data and intelligent automation for efficient water management.",

        "featuresCard.title1": "Crop Recommendation",
        "featuresCard.description1": "Recommends Location wise suitable crops based on soil types and region specific weather",

        "featuresCard.title2": "PestPedia",
        "featuresCard.description2": "PestPedia helps identify pests, their impact on crops, and the best pesticides for control. It provides eco-friendly pest management solutions.",

        "featuresCard.title3": "Crop Swapping & Optimization",
        "featuresCard.description3": "Predict crop yield and production based on location and real-time weather updates. Optimize crop selection for better productivity and sustainability.",

        "featuresCard.title4": "Crop Market Trend Analyzer",
        "featuresCard.description4": "Analyze the crop and vegetable prices in market and provide suggestions to optimize farmer's profit",


       // Features Section
"featureheading": "Our Features",
"featuredescription": "Discover how our IBM Granite AI-driven solutions empower farmers with data-driven insights, optimized crop management, and sustainable farming practices.",

"feature1title": "IBM Granite AI Crop Recommendation",
"feature1description": "Receive IBM Granite AI-powered recommendations for the best crops to grow based on soil conditions, weather, and location-specific data.",

"feature2title": "PestPedia – Smart Pest Management",
"feature2description": "Identify pests with IBM Granite AI, understand their impact on crops, and access eco-friendly solutions to mitigate infestations effectively.",

"feature3title": "Crop Swapping & Optimization",
"feature3description": "Optimize crop selection using IBM Granite AI by predicting yield and production based on real-time weather updates and market trends.",

"feature4title": "Crop Market Trend Analyzer",
"feature4description": "Analyze market prices for crops with IBM Granite AI insights, providing valuable data to maximize farmer profits and enhance sustainability.",
       "mapCardheading": "Why AI-Driven Farming Matters?",
"mapCarddescription1": "Enhance crop productivity with real-time monitoring of soil conditions and weather patterns.",
"mapCarddescription2": "Utilize AI-powered insights to make data-driven decisions for efficient resource management.",
"mapCarddescription3": "Automate irrigation, pest control, and fertilization using smart sensors and cloud-based control systems.",
        // Optimal Crop Season Card Section
        "optimalCropSeasonCardheading": "IBM Granite AI Crop Season Predictor",
        "optimalCropSeasonCarddescription": "The IBM Granite AI Optimal Cropping Season Predictor is an intelligent tool designed to help users determine the ideal season for growing specific crops. It analyzes a variety of factors, including cropping year, crop type, and state, to provide accurate recommendations, ensuring farmers achieve the best yield with minimal water and resource usage.",
        "optimalCropSeasonCardbutton":" Find Optimal Cropping Season",

        // GeoSpatial Analysis Card Section
        "geoSpatialAnalysisCardheading": "Geospatial Analysis of Crops",
        "geoSpatialAnalysisdescription":"Explore crop patterns and production trends with heatmaps and seasonal analysis. Our system enables you to visualize historical crop yields and areas, analyze patterns across different seasons, and generate insights for better agricultural decisions. Select crop types, districts, or seasons to discover hidden patterns through visual representations.",
        "geoSpatialAnalysisbutton":" Start Geospatial Analysis",

        // Contact Us Section
        "contactusheading":"Contact Us",
        "contactusdescription":"Got a technical issue? Want to send feedback about a beta feature Need details about our Business plan? Let us know.",
    },
  },
  te: {
    translation: {
     "faqheading": "తరచుగా అడుగు ప్రశ్నలు",
  "faq.question1": "అన్నదాతAI - అధునాతన వ్యవసాయ మేధస్సు ప్లాట్‌ఫారమ్ అంటే ఏమిటి?",
  "faq.answer1": "అన్నదాతAI ఒక వినూత్న AI ఆధారిత వేదిక, ఇది రైతులకు పంట నిర్వహణను మెరుగుపరిచేందుకు, కీటకాల మరియు వ్యాధుల వ్యాప్తిని అంచనా వేయడానికి మరియు వ్యవసాయ స్థిరత్వాన్ని మెరుగుపరిచేందుకు రియల్-టైమ్ డేటా ఆధారిత విశ్లేషణలను అందిస్తుంది.",
  
  "faq.question2": "అన్నదాతAI ఎలా పనిచేస్తుంది?",
  "faq.answer2": "ఇది మట్టి సెన్సార్లు, వాతావరణ సూచనలు, ఉపగ్రహ చిత్రాలు మరియు పంట చరిత్ర డేటాను AI, మెషిన్ లెర్నింగ్ మోడల్స్ ద్వారా విలీనం చేసి, మీ వ్యవసాయ అవసరాలకు అనుగుణంగా మార్గదర్శక సూచనలను అందిస్తుంది.",
  
  "faq.question3": "అన్నదాతAI ఏ సాంకేతిక పరిజ్ఞానాలను ఉపయోగిస్తుంది?",
  "faq.answer3": "అన్నదాతAI IoT సెన్సార్లు, క్లౌడ్ కంప్యూటింగ్, AI, మెషిన్ లెర్నింగ్ మరియు ఇమేజ్ ప్రాసెసింగ్ టెక్నిక్స్‌ను ఉపయోగించి, పర్యావరణ పరిస్థితుల నిరంతర పర్యవేక్షణను నిర్వహిస్తుంది మరియు పంట ఆరోగ్యాన్ని విశ్లేషించడానికి సహాయపడుతుంది.",
  
  "faq.question4": "ఈ వ్యవస్థ సూచనల విశ్వసనీయత ఎంత?",
  "faq.answer4": "మా వ్యవస్థ 85% కి పైగా ఖచ్చితత్వంతో కీటకాల మరియు వ్యాధి ప్రమాదాలను గుర్తించేందుకు రూపొందించబడింది. ఇది వినియోగదారు అభిప్రాయాన్ని మరియు కొనసాగుతున్న డేటా సమీకరణను ఉపయోగించి నిరంతరం మెరుగుపరుచుకుంటుంది.",
  
  "faq.question5": "అన్నదాతAI ఏవిధమైన సవాళ్లను పరిష్కరిస్తుంది?",
  "faq.answer5": "ఇది రైతులకు మట్టిలో అనిశ్చితమైన మార్పులు, కీటకాల దాడులు మరియు వ్యాధుల ఉద్భవాన్ని ముందుగా హెచ్చరికలు, సలహాలు అందించి సహాయపడుతుంది, తద్వారా నష్టం తగ్గించుకుని, వనరులను సమర్థంగా ఉపయోగించుకునేలా చేస్తుంది.",
  
  "faq.question6": "మట్టి పరిస్థితుల విశ్లేషణను ఈ వ్యవస్థ ఎలా నిర్వహిస్తుంది?",
  "faq.answer6": "ఇది IoT ఆధారిత మట్టి సెన్సార్లను ఉపయోగించి తేమ, pH, మరియు పోషక స్థాయిలను మానిటర్ చేస్తుంది మరియు నీటిపారుదల, ఎరువుల వినియోగం, మట్టి నిర్వహణకు ప్రత్యేకమైన సూచనలను అందిస్తుంది.",
  
  "faq.question7": "అన్నదాతAI స్థానిక వాతావరణ సూచనలను అందిస్తుందా?",
  "faq.answer7": "అవును, ఈ వేదిక నమ్మదగిన వాతావరణ APIలతో సమన్వయం చేయబడింది, తద్వారా స్థానిక, సమయానుసారమైన వాతావరణ సూచనలను అందించి, నీటిపారుదల షెడ్యూలింగ్ మరియు పంటలను ప్రతికూల వాతావరణ పరిస్థితుల నుండి రక్షించడానికి సహాయపడుతుంది.",

      // Info sections translations in Telugu
      "info.section1.title": "ఆటోమేటెడ్ ఇర్రిగేషన్ సిస్టమ్ అంటే ఏమిటి?",
      "info.section1.content1": "ఆటోమేటెడ్ ఇర్రిగేషన్ సిస్టమ్ IoT-బేస్డ్ సెన్సార్లను ఉపయోగించి నేల ఆర్ద్రతను పర్యవేక్షిస్తుంది మరియు పంటలకు నీటి సరఫరాను ఆటోమేట్ చేస్తుంది. సరైన సమయంలో సరైన నీటిని సరఫరా చేయడం ద్వారా పంట దిగుబడిని మెరుగుపరుస్తుంది మరియు నీటిని సంరక్షిస్తుంది.",
      "info.section1.content2": "పర్యావరణ డేటా మరియు పంట అవసరాలను విశ్లేషించడం ద్వారా, సిస్టమ్ పంప్లను సక్రియం లేదా నిష్క్రియం చేయగలదు, నీటి వ్యర్థాన్ని తగ్గిస్తుంది మరియు స్థిరమైన వ్యవసాయాన్ని ప్రోత్సహిస్తుంది.",

      "info.section2.title": "స్మార్ట్ ఇర్రిగేషన్ ఎందుకు ముఖ్యమైనది?",
      "info.section2.content1": "సమర్థవంతమైన సాగునీటి నిర్వహణ నీటి వినియోగాన్ని తగ్గిస్తుంది మరియు పంటలను అధికంగా నీరు పెట్టడం లేదా తక్కువ పెట్టడం నివారించడంలో సహాయపడుతుంది.",
      "info.section2.content2": "స్మార్ట్ ఇర్రిగేషన్ స్థిరమైన వ్యవసాయ పద్ధతులను ప్రోత్సహిస్తుంది, పంటల ఆరోగ్యాన్ని ఉత్తమం చేస్తుంది మరియు వనరుల వ్యర్థాన్ని తగ్గిస్తుంది.",
      "info.section2.content3": "వాతావరణ అంచనాలు, పంట-నిర్దిష్ట డేటా మరియు నేల ఆరోగ్య సమాచారాన్ని సమగ్రపరచడం ద్వారా రైతులు డేటా-ఆధారిత నిర్ణయాలు తీసుకోవడానికి ఇది అనుమతిస్తుంది.",

      "info.section3.title": "మా సిస్టమ్ ఎలా పనిచేస్తుంది",
      "info.section3.content1": "మా సిస్టమ్ నేల ఆర్ద్రత సెన్సార్ల నుండి డేటాను సేకరిస్తుంది మరియు రియల్-టైమ్లో క్లౌడ్కు పంపుతుంది.",
      "info.section3.content2": "పంట-నిర్దిష్ట డేటాసెట్లు మరియు వాతావరణ APIలను ఉపయోగించి, సాగునీరు అవసరమైనదో లేదో నిర్ణయించడానికి సిస్టమ్ ఆర్ద్రత స్థాయిలను విశ్లేషిస్తుంది.",
      "info.section3.content3": "అవసరమైతే, సిస్టమ్ రిమోట్గా మోటారును సక్రియం చేస్తుంది, అవసరమైన ఖచ్చితమైన నీటిని సరఫరా చేస్తుంది.",
      "info.section3.content4": "వినియోగదారులు మా వెబ్ అప్లికేషన్ ద్వారా పంప్ స్థితిని పర్యవేక్షించవచ్చు మరియు నోటిఫికేషన్లను స్వీకరించవచ్చు.",

      "info.section4.title": "మా సిస్టమ్ యొక్క ప్రధాన లక్షణాలు",
      "info.section4.content1": "IoT సెన్సార్లతో రియల్-టైమ్ నేల ఆర్ద్రత పర్యవేక్షణ",
      "info.section4.content2": "ఖచ్చితమైన అంచనాల కోసం వాతావరణ APIలతో ఇంటిగ్రేషన్",
      "info.section4.content3": "సాగునీటి కోసం ఆటోమేటెడ్ మోటార్ కంట్రోల్",
      "info.section4.content4": "పర్యవేక్షణ మరియు నిర్వహణ కోసం యూజర్-ఫ్రెండ్లీ వెబ్ ఇంటర్ఫేస్",
      "info.section4.content5": "ఇన్సైట్స్ మరియు విశ్లేషణల కోసం చారిత్రక డేటా యొక్క క్లౌడ్ స్టోరేజ్",

      "info.section5.title": "మా లక్ష్యాలు",
      "info.section5.content1": "స్మార్ట్ ఇర్రిగేషన్ ద్వారా సమర్థవంతమైన నీటి నిర్వహణ",
      "info.section5.content2": "ఆటోమేటెడ్ సిస్టమ్లతో పంట దిగుబడిని మెరుగుపరచడం",
      "info.section5.content3": "డేటా-ఆధారిత అంతర్దృష్టులతో రైతులకు మద్దతు",
      "info.section5.content4": "స్థిరమైన మరియు వనరుల-జాగ్రత్తగల వ్యవసాయాన్ని ప్రోత్సహించడం",

      "info.section6.title": "స్మార్ట్ ఇర్రిగేషన్తో ప్రారంభించండి",
      "info.section6.content1": "మా ఆటోమేటెడ్ ఇర్రిగేషన్ సిస్టమ్తో సమర్థవంతమైన నీటి నిర్వహణ వైపు మీ ప్రయాణాన్ని ప్రారంభించండి. కేవలం కొన్ని దశలతో, మీరు ఎక్కడి నుండైనా సాగునీటి ప్రక్రియను పర్యవేక్షించవచ్చు, నియంత్రించవచ్చు మరియు ఆప్టిమైజ్ చేయవచ్చు, నీటి వనరుల స్థిరమైన ఉపయోగం మరియు ఆరోగ్యకరమైన పంటలను నిర్ధారిస్తుంది.",

      // HomePage texts in Telugu
      "homepage.title": "అన్నదాతAI",
      "homepage.description": "మా ఆధునిక AI సాధనాలను ఉపయోగించి మీ వ్యవసాయ విధానాలను మెరుగుపరచుకోండి. మా ప్లాట్‌ఫారమ్ వ్యక్తిగత కీటకనాశన సిఫారసులు, నేల విశ్లేషణ, మరియు మార్కెట్ ధరల అంచనాలను అందిస్తుంది, जिससे మీరు ఆరోగ్యకరమైన పంటలను పండించి అధిక లాభాలను పొందవచ్చు.",
      "homepage.getStarted": "ప్రారంభించండి",
      "homepage.viewMore": "మరిన్ని చూడండి",
      
      // Main Hero Section in Telugu
      "hero.badge": "IBM Granite AI ద్వారా శక్తినిచ్చింది",
      "hero.mainTitle": "IBM Granite AI తో మీ వ్యవసాయాన్ని మార్చండి",
      "hero.benefit1": "దిగుబడిలో 35% పెరుగుదల",
      "hero.benefit1sub": "AI-ఆధారిత పంట సిఫారసులతో",
      "hero.benefit2": "వార్షికంగా ₹2+ లక్షల ఆదా",
      "hero.benefit2sub": "అనుకూలిత వనరుల నిర్వహణ ద్వారా",
      "hero.benefit3": "15+ AI సాధనాలకు ప్రవేశం",
      "hero.benefit3sub": "పూర్తి వ్యవసాయ తెలివితేటల కోసం",
      "hero.startAnalyzing": "విశ్లేషణ ప్రారంభించండి",
      "hero.visitShop": "దుకాణం చూడండి",
      "hero.signInToStart": "ప్రారంభించడానికి సైన్ ఇన్ చేయండి",
      "hero.createAccount": "ఖాతా సృష్టించండి",
      "hero.signInRequired": "🔒 సైన్ ఇన్ అవసరం:",
      "hero.signInMessage": "అధునాతన IBM Granite AI వ్యవసాయ విశ్లేషణ సాధనాలు మరియు లక్షణాలకు ప్రవేశం",
      "hero.yieldIncrease": "పంట దిగుబడి పెరుగుదల",
      "hero.aiTools": "AI విశ్లేషణ సాధనాలు",
      "hero.annualSavings": "వార్షిక ఆదా",
      
      // Financial Support Section in Telugu
      "financial.title": "రైతులకు ఆర్థిక సహాయం",
      "financial.description": "మీ వ్యవసాయ వ్యాపారాన్ని పెంచడానికి ప్రభుత్వ పథకాలు, స్మార్ట్ రుణ సిఫారసులు మరియు విద్యా వనరులను పొందండి",
      "financial.govSchemes": "ప్రభుత్వ పథకాలు",
      "financial.smartLoan": "స్మార్ట్ రుణ కనుగొనేవారు",
      "financial.education": "రైతు విద్య",
      "financial.schemesTitle": "ప్రభుత్వ పథకాలు",
      "financial.schemesDescription": "మీ వ్యవసాయ అవసరాలకు అనుకూలమైన ప్రభుత్వ పథకాలను కనుగొనండి",
      "financial.getAIRecommendations": "AI సిఫారసులను పొందండి",
      "financial.loading": "లోడ్ అవుతోంది...",
      "financial.loanTitle": "స్మార్ట్ రుణ కనుగొనేవారు",
      "financial.loanDescription": "మీ వ్యవసాయ ప్రొఫైల్ ఆధారంగా వ్యక్తిగత రుణ సిఫారసులను పొందండి",
      "financial.educationTitle": "రైతు విద్య",
      "financial.educationDescription": "AI-ఆధారిత విద్యా కంటెంట్ మరియు శిక్షణ వనరులకు ప్రవేశం",
      "financial.fetchRecommendations": "సిఫారసులను పొందండి",
      "financial.generateContent": "కంటెంట్ ఉత్పత్తి చేయండి",
      "financial.shareDetails": "మీ వివరాలను పంచుకోండి",
      "financial.age": "వయస్సు",
      "financial.enterAge": "మీ వయస్సును నమోదు చేయండి",

      "testimonialsheading": "ప్రజలు ఏమి చెబుతున్నారు.",
  "testimonialsdescription": "ఈ వ్యవస్థ ప్రభావాన్ని ప్రత్యక్షంగా అనుభవించిన వారిని వినండి.",

  "testimonials.0.message": "ఎయ్ఐ ఆధారిత పంట సిఫారసు ఫీచర్ మా వ్యవసాయ విధానాన్ని మార్చింది. ఇది నేల మరియు వాతావరణానికి సరిపడే పంటను వేసేలా చూసుకోవటంతో, అధిక ఉత్పాదకత మరియు స్థిరమైన వ్యవసాయానికి దారి తీసింది.",
  "testimonials.0.name": "డా. అర్జున్ పటేల్",
  "testimonials.0.role": "వ్యవసాయ శాస్త్రవేత్త",

  "testimonials.1.message": "వ్యక్తిగత ఎరువుల సూచనలతో, మేము పంట పోషణను మెరుగుపరచి వ్యర్థాలను తగ్గించాము. ఖచ్చితమైన సిఫారసులతో మా పంటల ఆరోగ్యం మెరుగుపడింది మరియు ఖర్చులు తగ్గాయి.",
  "testimonials.1.name": "ప్రియా మెహతా",
  "testimonials.1.role": "వ్యవసాయ సలహాదారు",

  "testimonials.2.message": "పంట దిగుబడి అంచనా సాధనం మా వ్యవసాయానికి గేమ్-చేంజర్‌గా మారింది. ఇది మాకు సంభావ్య దిగుబడులపై స్పష్టమైన అవగాహనను అందించడంతో పాటు, కోతల కోసం ప్రణాళికా రచన మరియు వనరుల నిర్వహణలో సహాయపడింది.",
  "testimonials.2.name": "సురేష్ కుమార్",
  "testimonials.2.role": "ఫార్మ్ మేనేజర్",

  "testimonials.3.message": "వాతావరణ డేటా, పంట సిఫారసులు, మరియు నీటిపారుదల నియంత్రణ కలయిక మా గ్రామంలోని వ్యవసాయ రంగానికి చాలా ప్రయోజనకరంగా మారింది. ఈ వేదిక అవసరమైన అన్ని వివరాలను ఒకే చోట అందిస్తుంది.",
  "testimonials.3.name": "అంజలి సింగ్",
  "testimonials.3.role": "స్థానిక ప్రభుత్వ అధికారి",

  "testimonials.4.message": "ఈ వ్యవస్థ యొక్క ఎయ్ఐ ఆధారిత విశ్లేషణలు వివిధ నేల పరిస్థితులకు అనుగుణమైన పంటలను గుర్తించడంలో కీలకమైన పాత్ర పోషించాయి. ఇది రైతులను మెరుగైన పంట ఎంపిక నిర్ణయాలను తీసుకునేలా చేసింది.",
  "testimonials.4.name": "రాహుల్ దేశాయి",
  "testimonials.4.role": "మట్టిశాస్త్రవేత్త",

  "testimonials.5.message": "ఈ వేదికను ఉపయోగించిన తరువాత, మా వ్యవసాయ దిగుబడి గణనీయంగా మెరుగుపడింది. పంట సిఫారసులు మరియు నీటిపారుదల నియంత్రణ సాధనాలు వ్యవసాయాన్ని మరింత సమర్థవంతంగా మార్చాయి.",
  "testimonials.5.name": "రవి శర్మ",
  "testimonials.5.role": "రైతు",

      // Features Card Section in Telugu
      "featureCardheading": "మా విశేషాలను అన్వేషించండి",
      "featureCarddescription":"రియల్-టైమ్ డేటా మరియు తెలివైన ఆటోమేషన్తో రైతులకు శక్తినిచ్చే మా స్మార్ట్ ఇర్రిగేషన్ సిస్టమ్ ఎలా పనిచేస్తుందో అన్వేషించండి.",

      "featuresCard.title1": "పంట సిఫారసు",
      "featuresCard.description1": "నేల రకాలు మరియు ప్రాంత-నిర్దిష్ట వాతావరణం ఆధారంగా సరిపోయే పంటలను సిఫారసు చేస్తుంది",

      "featuresCard.title2": "PestPedia",
      "featuresCard.description2": "కీటకాలను గుర్తించి, వాటి ప్రభావాన్ని అర్థం చేసుకుని, సరైన కీటకనాశనాలను ఎంచుకోవడానికి సహాయపడుతుంది",

      "featuresCard.title3": "పంట మార్పు & ఆప్టిమైజేషన్",
      "featuresCard.description3": "భౌగోళిక స్థానం మరియు తక్షణ వాతావరణ నవీకరణల ఆధారంగా పంట దిగుబడి మరియు ఉత్పత్తిని ఊహించండి. మెరుగైన ఉత్పాదకత మరియు స్థిరత్వానికి పంట ఎంపికను మెరుగుపరచండి.",

      "featuresCard.title4": "పంట మార్కెట్ ట్రెండ్ విశ్లేషకుడు",
      "featuresCard.description4": "మార్కెట్లో పంటలు మరియు కూరగాయల ధరలను విశ్లేషించి రైతుల లాభాన్ని ఆప్టిమైజ్ చేయడానికి సూచనలను అందిస్తుంది",

    "featureheading": "మా ప్రత్యేకతలు",
"featuredescription": "డేటా ఆధారిత అంచనాలు, మెరుగైన పంట నిర్వహణ మరియు స్థిరమైన వ్యవసాయ పద్ధతులతో రైతులను శక్తివంతం చేయడానికి మా AI ఆధారిత పరిష్కారాలు ఎలా సహాయపడతాయో తెలుసుకోండి.",

"feature1title": "పంట సూచన",
"feature1description": "మట్టినిల్వలు, వాతావరణం, మరియు ప్రదేశం-ప్రత్యేక డేటా ఆధారంగా పెంచడానికి ఉత్తమమైన పంటల కోసం AI ఆధారిత సూచనలు పొందండి.",

"feature2title": "పెస్ట్‌పీడియా – తెలివైన పురుగు నిర్వహణ",
"feature2description": "పురుగులను గుర్తించండి, అవి పంటలపై కలిగించే ప్రభావాన్ని అర్థం చేసుకోండి మరియు పర్యావరణానికి అనుకూలమైన పరిష్కారాలతో వాటిని సమర్థవంతంగా నివారించండి.",

"feature3title": "పంట మార్పిడి & ఆప్టిమైజేషన్",
"feature3description": "పంటల దిగుబడి మరియు ఉత్పత్తిని వాస్తవ-సమయ వాతావరణ నవీకరణలు మరియు మార్కెట్ ట్రెండ్ల ఆధారంగా అంచనా వేసి, సరైన పంటను ఎంచుకోవడానికి సహాయపడండి.",

"feature4title": "పంట మార్కెట్ ట్రెండ్ విశ్లేషకుడు",
"feature4description": "పంటలు మరియు కూరగాయల మార్కెట్ ధరలను విశ్లేషించి, రైతులు అధిక లాభాలను పొందడానికి మరియు వ్యవసాయాన్ని స్థిరంగా నిర్వహించడానికి విలువైన సూచనలు అందించండి.",

// Map Card Section in Telugu
"mapCardheading": "AI ఆధారిత వ్యవసాయం ఎందుకు ముఖ్యమైనది?",
"mapCarddescription1": "మట్టినిల్వలు మరియు వాతావరణ పరిస్థితుల实时 గమనిక ద్వారా పంట ఉత్పాదకతను మెరుగుపరచండి.",
"mapCarddescription2": "AI ఆధారిత విశ్లేషణలను ఉపయోగించి సమర్థవంతమైన వనరుల నిర్వహణకు డేటా ఆధారిత నిర్ణయాలను తీసుకోండి.",
"mapCarddescription3": "స్మార్ట్ సెన్సార్లు మరియు క్లౌడ్ ఆధారిత నియంత్రణ వ్యవస్థల ద్వారా నీరు పోయడం, పురుగుల నియంత్రణ మరియు ఎరువుల నిర్వహణను ఆటోమేట్ చేయండి.",
// Optimal Crop Section in Telugu
// అనుకూలమైన పంట సీజన్ కార్డ్ విభాగం  
"optimalCropSeasonCardheading": "అనుకూలమైన పంట సీజన్ సూచిక",  
"optimalCropSeasonCarddescription": "అనుకూలమైన పంట సీజన్ సూచిక అనేది ఒక బుద్ధిమంతమైన సాధనం, ఇది వినియోగదారులు నిర్దిష్ట పంటలకు అనువైన సీజన్‌ను గుర్తించడానికి సహాయపడుతుంది. ఇది పంట సంవత్సరము, పంట రకం మరియు రాష్ట్రం వంటి అనేక అంశాలను విశ్లేషించి ఖచ్చితమైన సిఫారసులను అందిస్తుంది, తద్వారా రైతులు తక్కువ నీరు మరియు వనరులతో గరిష్ట దిగుబడిని సాధించగలరు.",  
"optimalCropSeasonCardbutton": "అనుకూలమైన పంట సీజన్ కనుగొనండి",

    // GeoSpatial Analysis Section in Telugu
    // భౌగోళిక విశ్లేషణ కార్డ్ విభాగం  
"geoSpatialAnalysisCardheading": "పంటల భౌగోళిక విశ్లేషణ",  
"geoSpatialAnalysisdescription": "హీట్‌మ్యాప్స్ మరియు సీజనల్ విశ్లేషణ ద్వారా పంట నమూనాలను మరియు ఉత్పత్తి ధోరణులను అన్వేషించండి. మా వ్యవస్థ మీకు చారిత్రక పంట దిగుబడులు మరియు ప్రాంతాలను విజువలైజ్ చేయడానికి, వేర్వేరు సీజన్లలో నమూనాలను విశ్లేషించడానికి, మరియు మెరుగైన వ్యవసాయ నిర్ణయాలకు అమూల్యమైన అంతర్దృష్టులను రూపొందించడానికి అనుమతిస్తుంది. దాచిన నమూనాలను గ్రాఫికల్ ప్రాతినిధ్యాల ద్వారా కనుగొనడానికి పంట రకాలు, జిల్లాలు లేదా సీజన్లను ఎంచుకోండి.",
"geoSpatialAnalysisbutton": "భౌగోళిక విశ్లేషణను అన్వేషించండి",

"contactusheading": "మమ్మల్ని సంప్రదించండి",
"contactusdescription": "ఏదైనా సాంకేతిక సమస్య ఉందా? బీటా ఫీచర్ గురించి అభిప్రాయం పంపాలా? మా వ్యాపార ప్రణాళిక గురించి వివరాలు కావాలా? మాకు తెలియజేయండి."

    },
  },

  hi:{
    translation:{
        "faqheading": "अक्सर पूछे जाने वाले प्रश्न",
  "faq.question1": "अन्नदाताAI – उन्नत कृषि बुद्धिमत्ता प्लेटफॉर्म क्या है?",
  "faq.answer1": "अन्नदाताAI एक अभिनव एआई-संचालित मंच है जो किसानों को फसल प्रबंधन का अनुकूलन करने, कीट और रोग प्रकोपों की भविष्यवाणी करने और समग्र कृषि स्थिरता में सुधार करने के लिए वास्तविक समय में डेटा-संचालित अंतर्दृष्टि प्रदान करता है।",
  
  "faq.question2": "अन्नदाताAI कैसे काम करता है?",
  "faq.answer2": "यह मिट्टी के सेंसर, मौसम पूर्वानुमान, उपग्रह इमेजरी और ऐतिहासिक फसल रिकॉर्ड से डेटा एकीकृत करता है और उन्नत मशीन लर्निंग मॉडल का उपयोग करके आपके खेत की आवश्यकताओं के अनुसार क्रियाशील सिफारिशें प्रदान करता है।",
  
  "faq.question3": "अन्नदाताAI किन तकनीकों द्वारा संचालित है?",
  "faq.answer3": "अन्नदाताAI आईओटी सेंसर, क्लाउड कंप्यूटिंग, एआई, मशीन लर्निंग और इमेज प्रोसेसिंग तकनीकों का उपयोग करता है ताकि पर्यावरणीय परिस्थितियों की लगातार निगरानी की जा सके और सटीक निर्णय समर्थन के लिए फसल के स्वास्थ्य का विश्लेषण किया जा सके।",
  
  "faq.question4": "इस प्रणाली की भविष्यवाणियां कितनी सटीक हैं?",
  "faq.answer4": "हमारी प्रणाली कीट और रोग जोखिमों की पहचान में 85% से अधिक सटीकता प्राप्त करने के लिए डिज़ाइन की गई है। यह उपयोगकर्ता फीडबैक और निरंतर डेटा एकीकरण के माध्यम से समय के साथ सुधार करती रहती है, जिससे विश्वसनीय अंतर्दृष्टि प्रदान होती है।",
  
  "faq.question5": "अन्नदाताAI किन चुनौतियों का समाधान करता है?",
  "faq.answer5": "यह किसानों को मिट्टी की अप्रत्याशित स्थितियों, कीट संक्रमण और रोग प्रकोपों जैसी समस्याओं से निपटने में मदद करता है, समय पर अलर्ट और सिफारिशें प्रदान करके जोखिमों को कम करने और संसाधनों के अनुकूलन में सहायता करता है।",
  
  "faq.question6": "यह प्रणाली मिट्टी की स्थिति का विश्लेषण कैसे करती है?",
  "faq.answer6": "आईओटी आधारित मिट्टी सेंसर का उपयोग करके नमी, पीएच और पोषक तत्वों के स्तर की निगरानी करता है और सिंचाई, उर्वरक उपयोग और मिट्टी प्रबंधन पर विशेष रूप से अनुकूलित सलाह प्रदान करता है।",
  
  "faq.question7": "क्या अन्नदाताAI स्थानीय मौसम पूर्वानुमान प्रदान करता है?",
  "faq.answer7": "हाँ, यह मंच विश्वसनीय मौसम एपीआई के साथ एकीकृत है ताकि स्थानीय, वास्तविक समय के मौसम पूर्वानुमान प्रदान किए जा सकें, जो सिंचाई कार्यक्रमों की योजना बनाने और फसलों को प्रतिकूल मौसम से बचाने में मदद करता है।",

      // Info sections translations in Hindi
      "info.section1.title": "स्वचालित सिंचाई प्रणाली क्या है?",
      "info.section1.content1": "स्वचालित सिंचाई प्रणाली IoT-आधारित सेंसर का उपयोग कर मिट्टी की नमी की निगरानी करती है और फसलों को पानी की आपूर्ति स्वचालित करती है। यह सही समय पर सही मात्रा में पानी देकर फसल उत्पादन बढ़ाती है और जल संरक्षण करती है।",
      "info.section1.content2": "पर्यावरणीय डेटा और फसल आवश्यकताओं के विश्लेषण से यह पंप सक्रिय/निष्क्रिय कर सकती है, जिससे पानी की बर्बादी कम होती है और स्थायी कृषि को बढ़ावा मिलता है।",

      "info.section2.title": "स्मार्ट सिंचाई क्यों महत्वपूर्ण है?",
      "info.section2.content1": "कुशल सिंचाई प्रबंधन से जल खपत कम होती है और फसलों के अधिक/कम सिंचन को रोकता है।",
      "info.section2.content2": "स्मार्ट सिंचाई टिकाऊ कृषि पद्धतियों को बढ़ावा देती है, फसल स्वास्थ्य अनुकूलित करती है और संसाधन बर्बादी कम करती है।",
      "info.section2.content3": "मौसम पूर्वानुमान, फसल-विशिष्ट डेटा और मिट्टी स्वास्थ्य जानकारी को एकीकृत कर डेटा-आधारित निर्णय लेने में सक्षम बनाती है।",

      "info.section3.title": "हमारा सिस्टम कैसे काम करता है",
      "info.section3.content1": "हमारा सिस्टम मिट्टी की नमी सेंसर से डेटा एकत्र कर क्लाउड को रियल-टाइम भेजता है।",
      "info.section3.content2": "फसल-विशिष्ट डेटासेट और वेदर API का उपयोग कर नमी स्तर का विश्लेषण कर सिंचाई आवश्यकता निर्धारित करता है।",
      "info.section3.content3": "आवश्यकता होने पर सिस्टम रिमोट से मोटर सक्रिय कर सटीक मात्रा में पानी आपूर्ति करता है।",
      "info.section3.content4": "उपयोगकर्ता वेब एप्लिकेशन के माध्यम से पंप स्थिति निगरानी और सूचनाएं प्राप्त कर सकते हैं।",

      "info.section4.title": "हमारे सिस्टम की प्रमुख विशेषताएं",
      "info.section4.content1": "IoT सेंसर के साथ रियल-टाइम मिट्टी नमी निगरानी",
      "info.section4.content2": "सटीक पूर्वानुमान के लिए वेदर API एकीकरण",
      "info.section4.content3": "सिंचाई के लिए स्वचालित मोटर नियंत्रण",
      "info.section4.content4": "निगरानी और प्रबंधन के लिए उपयोगकर्ता-अनुकूल वेब इंटरफेस",
      "info.section4.content5": "इतिहास डेटा का क्लाउड संग्रहण विश्लेषण के लिए",

      "info.section5.title": "हमारे लक्ष्य",
      "info.section5.content1": "स्मार्ट सिंचाई के माध्यम से कुशल जल प्रबंधन",
      "info.section5.content2": "स्वचालित प्रणालियों के साथ फसल उत्पादन बढ़ाना",
      "info.section5.content3": "डेटा-आधारित अंतर्दृष्टि से किसानों को सहायता",
      "info.section5.content4": "टिकाऊ और संसाधन-सचेत कृषि को प्रोत्साहित करना",

      "info.section6.title": "स्मार्ट सिंचाई प्रारंभ करें",
      "info.section6.content1": "हमारी स्वचालित सिंचाई प्रणाली के साथ कुशल जल प्रबंधन की ओर अपनी यात्रा प्रारंभ करें। कुछ ही चरणों में, आप कहीं से भी सिंचाई प्रक्रिया निगरानी, नियंत्रण और अनुकूलित कर सकते हैं, जल संसाधनों के टिकाऊ उपयोग और स्वस्थ फसलों को सुनिश्चित करते हुए।",

      // HomePage texts in Hindi
      "homepage.title": "अन्नदाताAI",
      "homepage.description": "हमारे उन्नत AI टूल्स का उपयोग करके अपनी खेती की प्रक्रियाओं को बेहतर बनाएं। हमारा प्लेटफॉर्म आपको व्यक्तिगत कीटनाशक सिफारिशें, मिट्टी विश्लेषण और बाजार मूल्य पूर्वानुमान प्रदान करता है, जिससे आप स्वस्थ फसल उगा सकें और अधिक मुनाफा कमा सकें।",
      "homepage.getStarted": "प्रारंभ करें",
      "homepage.viewMore": "और देखें",
      
      // Main Hero Section in Hindi
      "hero.badge": "IBM Granite AI द्वारा संचालित",
      "hero.mainTitle": "IBM Granite AI के साथ अपने खेत को बदलें",
      "hero.benefit1": "उत्पादन में 35% की वृद्धि",
      "hero.benefit1sub": "AI-संचालित फसल सिफारिशों के साथ",
      "hero.benefit2": "सालाना ₹2+ लाख की बचत",
      "hero.benefit2sub": "अनुकूलित संसाधन प्रबंधन के माध्यम से",
      "hero.benefit3": "15+ AI टूल्स तक पहुंच",
      "hero.benefit3sub": "संपूर्ण फार्म इंटेलिजेंस के लिए",
      "hero.startAnalyzing": "विश्लेषण शुरू करें",
      "hero.visitShop": "दुकान देखें",
      "hero.signInToStart": "शुरू करने के लिए साइन इन करें",
      "hero.createAccount": "खाता बनाएं",
      "hero.signInRequired": "🔒 साइन इन आवश्यक:",
      "hero.signInMessage": "उन्नत IBM Granite AI कृषि विश्लेषण उपकरण और सुविधाओं तक पहुंच",
      "hero.yieldIncrease": "फसल उत्पादन वृद्धि",
      "hero.aiTools": "AI विश्लेषण उपकरण",
      "hero.annualSavings": "वार्षिक बचत",
      
      // Financial Support Section in Hindi
      "financial.title": "किसानों के लिए वित्तीय सहायता",
      "financial.description": "सरकारी योजनाओं, स्मार्ट ऋण सिफारिशों और शैक्षणिक संसाधनों तक पहुंच प्राप्त करें ताकि आप अपने कृषि व्यवसाय को बढ़ा सकें",
      "financial.govSchemes": "सरकारी योजनाएं",
      "financial.smartLoan": "स्मार्ट ऋण खोजकर्ता",
      "financial.education": "किसान शिक्षा",
      "financial.schemesTitle": "सरकारी योजनाएं",
      "financial.schemesDescription": "अपनी कृषि आवश्यकताओं के अनुकूल सरकारी योजनाएं खोजें",
      "financial.getAIRecommendations": "AI सिफारिशें प्राप्त करें",
      "financial.loading": "लोड हो रहा है...",
      "financial.loanTitle": "स्मार्ट ऋण खोजकर्ता",
      "financial.loanDescription": "अपनी कृषि प्रोफ़ाइल के आधार पर व्यक्तिगत ऋण सिफारिशें प्राप्त करें",
      "financial.educationTitle": "किसान शिक्षा",
      "financial.educationDescription": "AI-संचालित शैक्षणिक सामग्री और प्रशिक्षण संसाधनों तक पहुंच",
      "financial.fetchRecommendations": "सिफारिशें प्राप्त करें",
      "financial.generateContent": "सामग्री उत्पन्न करें",
      "financial.shareDetails": "अपना विवरण साझा करें",
      "financial.age": "आयु",
      "financial.enterAge": "अपनी आयु दर्ज करें",

     "testimonialsheading": "लोग क्या कह रहे हैं।",
  "testimonialsdescription": "उन लोगों से सुनें जिन्होंने इसका प्रभाव प्रत्यक्ष रूप से अनुभव किया है।",

  "testimonials.0.message": "एआई-संचालित फसल सिफारिश सुविधा ने हमारी खेती की प्रक्रिया बदल दी है। यह सुनिश्चित करता है कि हम मिट्टी और मौसम के अनुसार सही फसल लगाएं, जिससे बेहतर उत्पादन और सतत खेती संभव हो सके।",
  "testimonials.0.name": "डॉ. अर्जुन पटेल",
  "testimonials.0.role": "कृषिविज्ञानी",

  "testimonials.1.message": "व्यक्तिगत उर्वरक सुझावों से, हमने फसल पोषण को अनुकूलित किया और अपव्यय को कम किया। सटीक सिफारिशों ने हमारी फसलों के स्वास्थ्य में सुधार किया और लागत को घटाया।",
  "testimonials.1.name": "प्रिया मेहता",
  "testimonials.1.role": "कृषि सलाहकार",

  "testimonials.2.message": "फसल उपज पूर्वानुमान उपकरण हमारे खेत के लिए एक गेम-चेंजर रहा है। यह हमें संभावित उपज की स्पष्ट समझ देता है, जिससे हमें कटाई की योजना बनाने और संसाधनों का बेहतर प्रबंधन करने में मदद मिलती है।",
  "testimonials.2.name": "सुरेश कुमार",
  "testimonials.2.role": "फार्म प्रबंधक",

  "testimonials.3.message": "मौसम डेटा, फसल सिफारिशें और सिंचाई नियंत्रण के संयोजन ने हमारे गांव की कृषि गतिविधियों को अत्यधिक लाभ पहुंचाया है। यह मंच हमें सभी आवश्यक जानकारियाँ एक ही स्थान पर प्रदान करता है।",
  "testimonials.3.name": "अंजलि सिंह",
  "testimonials.3.role": "स्थानीय सरकारी अधिकारी",

  "testimonials.4.message": "इस प्रणाली की एआई-संचालित अंतर्दृष्टि ने विभिन्न मिट्टी की स्थितियों के लिए उपयुक्त फसलों की पहचान करने में महत्वपूर्ण भूमिका निभाई है। इससे किसानों को बेहतर फसल लगाने के निर्णय लेने में मदद मिली है।",
  "testimonials.4.name": "राहुल देसाई",
  "testimonials.4.role": "मृदा वैज्ञानिक",

  "testimonials.5.message": "इस मंच का उपयोग करने के बाद से, मेरे खेत की उपज में उल्लेखनीय वृद्धि हुई है। फसल सिफारिश और सिंचाई नियंत्रण उपकरणों ने खेती को अधिक कुशल बना दिया है।",
  "testimonials.5.name": "रवि शर्मा",
  "testimonials.5.role": "किसान",

      // Features Card Section in Hindi
      "featureCardheading": "हमारी विशेषताएं जानें",
      "featureCarddescription":"जानें कि हमारी स्मार्ट सिंचाई प्रणाली कैसे किसानों को रियल-टाइम डेटा और बुद्धिमान स्वचालन के साथ कुशल जल प्रबंधन में सशक्त बनाती है।",

      "featuresCard.title1": "फसल सिफारिश",
      "featuresCard.description1": "मिट्टी प्रकार और क्षेत्र-विशिष्ट मौसम के आधार पर उपयुक्त फसलों की सिफारिश करता है",

      "featuresCard.title2": "PestPedia",
      "featuresCard.description2": "कीटों की पहचान, उनके प्रभाव और उपयुक्त कीटनाशकों की जानकारी प्रदान करता है।",

      "featuresCard.title3": "फसल परिवर्तन एवं अनुकूलन",
      "featuresCard.description3": "स्थान और वास्तविक समय के मौसम अपडेट के आधार पर फसल उत्पादन और उपज की भविष्यवाणी करें। बेहतर उत्पादकता और स्थिरता के लिए फसल चयन को अनुकूलित करें।",

      "featuresCard.title4": "फसल बाजार प्रवृत्ति विश्लेषक",
      "featuresCard.description4": "बाजार में फसलों और सब्जियों के मूल्यों का विश्लेषण कर किसानों के लाभ को अनुकूलित करने हेतु सुझाव प्रदान करता है",

     "featureheading": "हमारी विशेषताएँ",
"featuredescription": "जानें कि कैसे हमारी एआई-संचालित समाधान किसानों को डेटा-संचालित अंतर्दृष्टि, अनुकूलित फसल प्रबंधन और सतत कृषि पद्धतियों से सशक्त बनाते हैं।",

"feature1title": "फसल सिफारिश",
"feature1description": "मिट्टी की स्थिति, मौसम और स्थान-विशिष्ट डेटा के आधार पर सर्वश्रेष्ठ फसलें उगाने के लिए एआई-संचालित सिफारिशें प्राप्त करें।",

"feature2title": "पेस्टपीडिया – स्मार्ट कीट प्रबंधन",
"feature2description": "कीटों की पहचान करें, उनके फसलों पर प्रभाव को समझें और संक्रमण को प्रभावी ढंग से कम करने के लिए पर्यावरण-अनुकूल समाधान प्राप्त करें।",

"feature3title": "फसल स्वैपिंग और अनुकूलन",
"feature3description": "वास्तविक समय के मौसम अपडेट और बाजार प्रवृत्तियों के आधार पर उत्पादन और उपज की भविष्यवाणी करके फसल चयन को अनुकूलित करें।",

"feature4title": "फसल बाजार प्रवृत्ति विश्लेषक",
"feature4description": "फसलों और सब्जियों की बाजार कीमतों का विश्लेषण करें, जिससे किसानों को अधिकतम लाभ प्राप्त करने और स्थिरता बढ़ाने में मदद मिले।",

    "mapCardheading": "एआई-संचालित कृषि क्यों महत्वपूर्ण है?",
"mapCarddescription1": "मिट्टी की स्थिति और मौसम पैटर्न की वास्तविक समय निगरानी से फसल उत्पादकता बढ़ाएं।",
"mapCarddescription2": "कुशल संसाधन प्रबंधन के लिए एआई-संचालित अंतर्दृष्टि का उपयोग करके डेटा-आधारित निर्णय लें।",
"mapCarddescription3": "स्मार्ट सेंसर और क्लाउड-आधारित नियंत्रण प्रणालियों का उपयोग करके सिंचाई, कीट नियंत्रण और उर्वरक प्रबंधन को स्वचालित करें।"
,
    // Optimal Crop Season Card Section
    "optimalCropSeasonCardheading": "इष्टतम फसल मौसम भविष्यवक्ता",
    "optimalCropSeasonCarddescription": "यह बुद्धिमान उपकरण उपयोगकर्ताओं को विशिष्ट फसलों के लिए आदर्श मौसम निर्धारित करने में सहायक है। यह फसल वर्ष, फसल प्रकार और राज्य सहित विभिन्न कारकों का विश्लेषण कर सटीक सिफारिशें प्रदान करता है, जिससे किसान न्यूनतम जल और संसाधन उपयोग के साथ उत्तम उत्पादन प्राप्त कर सकें।",
    "optimalCropSeasonCardbutton":"इष्टतम फसल मौसम खोजें",

    // GeoSpatial Analysis Card Section
    "geoSpatialAnalysisCardheading": "फसलों का भौगोलिक विश्लेषण",
    "geoSpatialAnalysisdescription":"हीटमैप्स और मौसमी विश्लेषण के साथ फसल पैटर्न और उत्पादन प्रवृत्तियों का अन्वेषण करें। हमारी प्रणाली ऐतिहासिक फसल उत्पादन और क्षेत्रों को विज़ुअलाइज़ करने, विभिन्न मौसमों में पैटर्न विश्लेषण करने, और बेहतर कृषि निर्णयों के लिए अंतर्दृष्टि उत्पन्न करने में सक्षम बनाती है। फसल प्रकार, जिलों या मौसमों का चयन कर दृश्य प्रस्तुतियों के माध्यम से छिपे पैटर्न खोजें।",
    "geoSpatialAnalysisbutton":"भौगोलिक विश्लेषण शुरू करें",

    // Contact Us Section
    "contactusheading": "संपर्क करें",
"contactusdescription": "कोई तकनीकी समस्या है? किसी बीटा फीचर के बारे में प्रतिक्रिया भेजना चाहते हैं? हमारे बिजनेस प्लान के बारे में जानकारी चाहिए? हमें बताएं।"

    }
  }
  // Add more languages as needed...
};

i18n
  .use(LanguageDetector) // Automatically detects user language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Fallback to English if language detection fails
    interpolation: {
      escapeValue: false, // React handles escaping
    },
  });

export default i18n;
