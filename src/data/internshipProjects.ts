import type { InternshipProject } from '@/src/types'

const internshipProjects: InternshipProject[] = [
  {
    name: 'Executive Performance Dashboard',
    nameAr: 'لوحة متابعة الأداء التنفيذي',
    status: 'Completed',
    statusAr: 'مكتمل',
    description:
      'Designed and developed an interactive executive dashboard to monitor KPIs and organizational performance in real time.',
    descriptionAr:
      'تصميم وتطوير لوحة تحكم تنفيذية تفاعلية لمراقبة مؤشرات الأداء الرئيسية والأداء التنظيمي في الوقت الفعلي.',
    technologies: ['Power BI', 'SQL', 'Python', 'Pandas', 'Business Intelligence', 'Data Visualization'],
  },
  {
    name: 'Hajj Analytics Dashboard',
    nameAr: 'لوحة تحليلات الحج',
    status: 'Completed',
    statusAr: 'مكتمل',
    description:
      'Developed an interactive analytics dashboard for Hajj operations that visualizes KPIs and supports data-driven planning.',
    descriptionAr:
      'تطوير لوحة تحليلات تفاعلية لعمليات الحج تتضمن مؤشرات الأداء وتدعم التخطيط المبني على البيانات.',
    technologies: ['Power BI', 'SQL', 'Python', 'Dashboard Development', 'Data Analysis'],
  },
  {
    name: 'Database Design & Development',
    nameAr: 'تصميم وتطوير قواعد البيانات',
    status: 'Completed',
    statusAr: 'مكتمل',
    description:
      'Designed and implemented a relational database with optimized tables and relationships to support dashboards and reporting systems.',
    descriptionAr:
      'تصميم وتنفيذ قاعدة بيانات علائقية بجداول وعلاقات محسنة لدعم لوحات التحكم وأنظمة التقارير.',
    technologies: ['SQL', 'Database Design', 'Database Development', 'Data Modeling', 'Relational Databases'],
  },
  {
    name: 'Recommendation System',
    nameAr: 'نظام التوصيات',
    status: 'In Progress',
    statusAr: 'قيد التطوير',
    description:
      'Developing an intelligent recommendation system using machine learning techniques to provide personalized recommendations.',
    descriptionAr:
      'تطوير نظام توصيات ذكي يستخدم تقنيات التعلم الآلي لتقديم توصيات مخصصة.',
    technologies: ['Python', 'Machine Learning', 'Recommendation Systems', 'Data Analysis', 'Artificial Intelligence'],
  },
]

export default internshipProjects
