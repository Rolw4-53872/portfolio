import type { Project } from '@/src/types'

const projects: Project[] = [
  {
    title: 'Saudi Arabia Domestic Tourism Analysis & Visualization (2018–2023)',
    titleAr: 'تحليل وتصور السياحة الداخلية في السعودية (2018–2023)',
    description:
      'A comprehensive data analytics project examining domestic tourism trends across Saudi Arabia from 2018 to 2023, with geographic mapping and interactive visualizations.',
    descriptionAr:
      'مشروع تحليل بيانات شامل يفحص اتجاهات السياحة الداخلية في المملكة العربية السعودية من 2018 إلى 2023، مع خرائط جغرافية وتصورات تفاعلية.',
    longDescription:
      'End-to-end data analysis of Saudi domestic tourism including data collection, cleaning, EDA, and multi-layer visual storytelling. Geographic maps built with Folium highlight regional hotspots, while Plotly dashboards make the trends interactive and accessible.',
    longDescriptionAr:
      'تحليل بيانات شامل للسياحة الداخلية السعودية يشمل جمع البيانات، تنظيفها، الاستكشاف، وسرد بصري متعدد الطبقات. خرائط جغرافية باستخدام Folium ولوحات Plotly تفاعلية.',
    technologies: ['Python', 'Pandas', 'Plotly', 'Matplotlib', 'Seaborn', 'Folium', 'Google Colab'],
    challenges:
      'Handling missing and inconsistent regional data, normalizing multi-year datasets, and designing visualizations that communicate clearly to non-technical audiences.',
    challengesAr:
      'التعامل مع البيانات الإقليمية المفقودة وغير المتسقة، وتطبيع مجموعات البيانات متعددة السنوات، وتصميم تصورات واضحة للجمهور غير التقني.',
    results:
      'Produced a polished, publication-ready analytics report with interactive geographic maps and trend charts highlighting key tourism patterns across all regions.',
    resultsAr:
      'تقرير تحليلي احترافي جاهز للنشر مع خرائط جغرافية تفاعلية ومخططات اتجاهات تبرز أنماط السياحة الرئيسية.',
    github: 'https://github.com/Rolw4-53872/saudi-domestic-tourism-visualization',
    year: '2024',
    slug: 'saudi-tourism',
  },
  {
    title: 'Flower Recognition Using Deep Learning (ResNet-18 vs Custom CNN)',
    titleAr: 'التعرف على الزهور باستخدام التعلم العميق (ResNet-18 مقابل CNN مخصص)',
    description:
      'A deep learning study comparing a pre-trained ResNet-18 model with Transfer Learning against a custom CNN for flower species classification, achieving 93.76% accuracy.',
    descriptionAr:
      'دراسة تعلم عميق تقارن نموذج ResNet-18 المدرب مسبقاً مع التعلم الانتقالي مقابل CNN مخصص لتصنيف أنواع الزهور، بدقة 93.76%.',
    longDescription:
      'Built two complete deep learning pipelines in PyTorch — one from scratch and one leveraging ResNet-18 with transfer learning. Evaluated both using classification metrics, confusion matrices, and learning curves.',
    longDescriptionAr:
      'بناء خطين كاملين للتعلم العميق في PyTorch — واحد من الصفر وآخر يستخدم ResNet-18 مع التعلم الانتقالي. تقييم كليهما بمقاييس التصنيف ومصفوفات الارتباك.',
    technologies: ['PyTorch', 'Torchvision', 'CNN', 'ResNet-18', 'Transfer Learning', 'Scikit-learn', 'Matplotlib'],
    challenges:
      'Limited dataset size required careful data augmentation and regularization strategies to prevent overfitting on the custom CNN.',
    challengesAr:
      'حجم مجموعة البيانات المحدود تطلب استراتيجيات دقيقة لزيادة البيانات والتنظيم لمنع الإفراط في التخصيص على CNN المخصص.',
    results:
      'ResNet-18 with Transfer Learning achieved 93.76% test accuracy, significantly outperforming the custom CNN (78.4%).',
    resultsAr:
      'حقق ResNet-18 مع التعلم الانتقالي دقة 93.76% في الاختبار، متفوقاً بشكل كبير على CNN المخصص (78.4%).',
    github: 'https://github.com/Rolw4-53872/flower-recognition-cnn-resnet',
    year: '2024',
    slug: 'flower-recognition',
  },
  {
    title: 'Predicting Student Academic Performance Using Machine Learning',
    titleAr: 'التنبؤ بالأداء الأكاديمي للطلاب باستخدام التعلم الآلي',
    description:
      'An end-to-end ML project predicting student academic outcomes using regression, classification, clustering, and anomaly detection techniques.',
    descriptionAr:
      'مشروع تعلم آلي متكامل يتنبأ بالنتائج الأكاديمية للطلاب باستخدام الانحدار، التصنيف، التجميع، واكتشاف الشذوذات.',
    longDescription:
      'Full ML pipeline from raw data to deployable model: EDA, feature engineering, baseline models, hyperparameter tuning, and model comparison. Applied K-Means clustering and isolation forest for anomaly detection.',
    longDescriptionAr:
      'خط أنابيب تعلم آلي كامل من البيانات الخام إلى نموذج قابل للنشر: استكشاف، هندسة الميزات، النماذج الأساسية، ضبط المعاملات الفائقة، ومقارنة النماذج.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'NumPy'],
    challenges:
      'Feature selection from a high-dimensional dataset, handling class imbalance, and interpreting model outputs in a meaningful educational context.',
    challengesAr:
      'اختيار الميزات من مجموعة بيانات عالية الأبعاد، معالجة عدم توازن الفئات، وتفسير مخرجات النموذج في سياق تعليمي ذي معنى.',
    results:
      'Random Forest classifier outperformed baselines. Clustering revealed 3 distinct student performance profiles with actionable insights.',
    resultsAr:
      'تفوق مصنف الغابة العشوائية على الخطوط الأساسية. كشف التجميع عن 3 ملفات أداء مميزة للطلاب مع رؤى قابلة للتنفيذ.',
    github: 'https://github.com/Rolw4-53872/student-performance-prediction',
    year: '2025',
    slug: 'student-performance',
  },
]

export default projects
