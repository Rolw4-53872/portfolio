import type { Education } from '@/src/types'

const education: Education[] = [
  {
    institution: 'Umm Al-Qura University',
    institutionAr: 'جامعة أم القرى',
    degree: 'Bachelor of Data Science',
    degreeAr: 'بكالوريوس علم البيانات',
    from: '2023',
    to: '2027',
    description:
      'Pursuing a Bachelor\'s degree in Data Science with a focus on machine learning, artificial intelligence, statistical analysis, and data engineering. Developing strong foundations in Python, SQL, deep learning, and business intelligence.',
    descriptionAr:
      'أتابع درجة البكالوريوس في علم البيانات مع التركيز على التعلم الآلي، الذكاء الاصطناعي، التحليل الإحصائي، وهندسة البيانات. بناء أسس قوية في Python وSQL والتعلم العميق وذكاء الأعمال.',
    coursework: [
      'Data Science',
      'Machine Learning',
      'Deep Learning',
      'Artificial Intelligence',
      'Database Systems',
      'Statistics',
      'Data Visualization',
    ],
  },
]

export default education
