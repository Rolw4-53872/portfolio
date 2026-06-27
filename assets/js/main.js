const STORAGE_KEY = 'portfolio-content-v1';
const defaultContent = {
  profile: {
    name: 'Rola Alsulami',
    tagline: 'Transforming data into decisions, models, and human-centered analytics experiences.',
    status: 'Available for internships and analytics projects',
    heroEyebrow: 'Data Science / Machine Learning / AI',
    coverImage: 'assets/images/banner.png',
    profileImage: 'assets/images/profile.png',
    github: 'https://github.com/rola',
    linkedin: 'https://www.linkedin.com/',
    cv: 'assets/files/Rola_Alsulami_CV.pdf',
    email: 'rola@example.com',
    phone: '+966 5XXX XXXX',
    location: 'Makkah, Saudi Arabia'
  },
  about: {
    headline: 'Data Science student building analytics that make decisions easier.',
    summary: 'A premium portfolio focused on clarity, impact, and measurable data work.',
    paragraphs: [
      'I am passionate about data science, analytics, machine learning, artificial intelligence, and business intelligence.',
      'I am currently completing my internship at Dama Holding Company, where I contribute to real-world analytics and BI projects.',
      'My goal is to turn complex data into clear decisions and meaningful products.'
    ],
    focus: [
      ['Python', 'Analysis and ML'],
      ['SQL', 'Data modeling'],
      ['Power BI', 'Executive dashboards'],
      ['PyTorch', 'Deep learning']
    ]
  },
  skills: [
    { category: 'Programming', items: ['Python', 'SQL', 'JavaScript'] },
    { category: 'Data Science', items: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering'] },
    { category: 'Machine Learning', items: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'] },
    { category: 'Deep Learning', items: ['PyTorch', 'CNN', 'Transfer Learning', 'Computer Vision'] },
    { category: 'Business Intelligence', items: ['Power BI', 'Dashboard Development', 'KPI Design', 'Business Intelligence'] },
    { category: 'Visualization', items: ['Plotly', 'Matplotlib', 'Seaborn', 'Folium'] },
    { category: 'Database', items: ['SQL', 'Database Design', 'Data Modeling', 'ETL'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'Google Colab', 'Jupyter Notebook'] }
  ],
  projects: [
    {
      id: 1,
      title: 'Saudi Arabia Domestic Tourism Analysis & Visualization',
      type: 'academic',
      featured: true,
      image: 'assets/images/projects/dashboard1.svg',
      description: 'Comprehensive analysis and visualization of Saudi Arabia\'s domestic tourism using Python and interactive dashboards.',
      technologies: ['Python', 'Pandas', 'Plotly', 'Matplotlib'],
      github: 'https://github.com/rola/tourism-analysis',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Flower Recognition Using Deep Learning',
      type: 'academic',
      featured: true,
      image: 'assets/images/projects/makeup-ai.svg',
      description: 'Compared transfer learning with ResNet-18 against a custom CNN for flower recognition.',
      technologies: ['PyTorch', 'CNN', 'ResNet-18', 'Scikit-learn'],
      github: 'https://github.com/rola/flower-recognition',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Executive Performance Dashboard',
      type: 'internship',
      featured: false,
      image: 'assets/images/projects/dashboard2.svg',
      description: 'Designed and developed an interactive executive dashboard to monitor KPIs and organizational performance.',
      technologies: ['Power BI', 'SQL', 'Python', 'Business Intelligence'],
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Hajj Analytics Dashboard',
      type: 'internship',
      featured: false,
      image: 'assets/images/projects/dashboard1.svg',
      description: 'Developed a dashboard for Hajj operations to support data-driven planning and KPI visibility.',
      technologies: ['Power BI', 'SQL', 'Python', 'Data Analysis'],
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Database Design & Development',
      type: 'internship',
      featured: false,
      image: 'assets/images/projects/database.svg',
      description: 'Implemented a relational database with optimized tables and relationships to support reporting systems.',
      technologies: ['SQL', 'Database Design', 'Data Modeling', 'Relational Databases'],
      status: 'Completed'
    },
    {
      id: 6,
      title: 'Recommendation System',
      type: 'internship',
      featured: true,
      image: 'assets/images/projects/restaurant-db.svg',
      description: 'Currently developing an intelligent recommendation system using machine learning techniques.',
      technologies: ['Python', 'Machine Learning', 'Recommendation Systems', 'Artificial Intelligence'],
      status: 'In Progress'
    }
  ],
  experience: [
    {
      company: 'Dama Holding Company',
      role: 'Data Science Intern',
      duration: 'February 2026 – Present',
      description: 'Worked on real-world analytics and business intelligence projects that support decisions and reporting.'
    }
  ],
  internshipProjects: [
    {
      title: 'Executive Performance Dashboard',
      description: 'Interactive executive dashboard for KPI monitoring across organizational units.',
      technologies: ['Power BI', 'SQL', 'Python'],
      status: 'Completed'
    },
    {
      title: 'Hajj Analytics Dashboard',
      description: 'Operational analytics dashboard focused on planning, reporting, and KPI visibility.',
      technologies: ['Power BI', 'SQL', 'Python'],
      status: 'Completed'
    },
    {
      title: 'Database Design & Development',
      description: 'Relational database architecture supporting dashboards and reporting needs.',
      technologies: ['SQL', 'Database Design', 'Data Modeling'],
      status: 'Completed'
    },
    {
      title: 'Recommendation System',
      description: 'Personalized recommendation engine in development for intelligent decision support.',
      technologies: ['Python', 'Machine Learning', 'AI'],
      status: 'In Progress'
    }
  ],
  education: {
    university: 'Umm Al-Qura University',
    degree: 'Bachelor of Data Science',
    period: '2023 – 2027'
  },
  certificates: [],
  contact: {
    email: 'rola@example.com',
    phone: '+966 5XXX XXXX',
    location: 'Makkah, Saudi Arabia',
    message: 'Have an opportunity, project, or idea? I’d love to hear from you.'
  }
};

const state = {
  content: loadContent(),
  filters: ['all', 'academic', 'internship', 'featured'],
  activeFilter: 'all',
  language: localStorage.getItem('portfolio-language') || 'en'
};

function loadContent() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultContent);
  try {
    return { ...structuredClone(defaultContent), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultContent);
  }
}

function saveContent() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.content));
}

function render() {
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderExperience();
  renderInternshipProjects();
  renderEducation();
  renderCertificates();
  renderContact();
  renderFooter();
  renderAdmin();
  setTimeout(() => document.getElementById('loading-screen')?.classList.add('hidden'), 250);
}

function renderHero() {
  const profile = state.content.profile;
  document.getElementById('hero-eyebrow').textContent = profile.heroEyebrow;
  document.getElementById('hero-name').textContent = profile.name;
  document.getElementById('hero-tagline').textContent = profile.tagline;
  document.getElementById('hero-profile-image').src = profile.profileImage;
  document.getElementById('hero-profile-image').alt = profile.name;
  document.getElementById('hero-status').textContent = profile.status;
  document.getElementById('hero-cv').href = profile.cv;
  document.getElementById('hero-github').href = profile.github;
  document.getElementById('hero-linkedin').href = profile.linkedin;
  document.getElementById('hero-pills').innerHTML = ['Data Science', 'Machine Learning', 'AI', 'Business Intelligence'].map(item => `<span class="chip">${item}</span>`).join('');
  document.getElementById('hero-stats').innerHTML = [
    ['4+', 'Internship Projects'],
    ['8+', 'Core Skills'],
    ['3+', 'Key Tools'],
    ['1', 'University Track']
  ].map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('');
}

function renderAbout() {
  const about = state.content.about;
  document.getElementById('about-title').textContent = 'About';
  document.getElementById('about-summary').textContent = about.summary;
  document.getElementById('about-headline').textContent = about.headline;
  document.getElementById('about-body').innerHTML = about.paragraphs.map(text => `<p>${text}</p>`).join('');
  document.getElementById('focus-panel').innerHTML = about.focus.map(([title, detail]) => `<div class="focus-item"><strong>${title}</strong><span>${detail}</span></div>`).join('');
}

function renderSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = state.content.skills.map(skill => `
    <article class="skill-card">
      <h3>${skill.category}</h3>
      <ul>${skill.items.map(item => `<li>${item}</li>`).join('')}</ul>
    </article>
  `).join('');
}

function renderProjects() {
  const filters = document.getElementById('project-filters');
  filters.innerHTML = ['all', 'academic', 'internship', 'featured'].map(filter => `<button class="chip-btn ${state.activeFilter === filter ? 'active' : ''}" data-filter="${filter}" type="button">${filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}</button>`).join('');
  const query = document.getElementById('project-search').value.toLowerCase();
  const visibleProjects = state.content.projects.filter(project => {
    const matchesFilter = state.activeFilter === 'all' || (state.activeFilter === 'featured' ? project.featured : project.type === state.activeFilter);
    const matchesQuery = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });
  const grid = document.getElementById('projects-grid');
  if (!visibleProjects.length) {
    grid.innerHTML = '<div class="project-card"><h3>No projects found</h3><p>Try another search term or filter.</p></div>';
    return;
  }
  grid.innerHTML = visibleProjects.map(project => `
    <article class="project-card">
      <div class="meta">${project.type === 'academic' ? 'Academic' : 'Internship'} • ${project.status}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">${project.technologies.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="project-actions">
        ${project.github ? `<a class="ghost-btn" href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
        <button class="ghost-btn" type="button">View Details</button>
      </div>
    </article>
  `).join('');
}

function renderExperience() {
  document.getElementById('experience-list').innerHTML = state.content.experience.map(item => `
    <article class="timeline-card">
      <div class="timeline-top">
        <div>
          <div class="timeline-role">${item.role}</div>
          <strong>${item.company}</strong>
        </div>
        <span class="small-muted">${item.duration}</span>
      </div>
      <p>${item.description}</p>
    </article>
  `).join('');
}

function renderInternshipProjects() {
  document.getElementById('internship-grid').innerHTML = state.content.internshipProjects.map(item => `
    <article class="project-card">
      <div class="meta">Internship Project</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="tags">${item.technologies.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="small-muted">Status: ${item.status}</div>
    </article>
  `).join('');
}

function renderEducation() {
  const education = state.content.education;
  document.getElementById('education-card').innerHTML = `
    <div>
      <h3>${education.university}</h3>
      <p>${education.degree}</p>
    </div>
    <div class="small-muted">${education.period}</div>
  `;
}

function renderCertificates() {
  if (!state.content.certificates.length) {
    document.getElementById('certificates-grid').innerHTML = '<article class="certificate-card"><h3>No certifications added yet.</h3><p>The admin panel can be used later to add certificates.</p></article>';
    return;
  }
  document.getElementById('certificates-grid').innerHTML = state.content.certificates.map(cert => `
    <article class="certificate-card"><h3>${cert.title}</h3><p>${cert.issuer}</p></article>
  `).join('');
}

function renderContact() {
  const contact = state.content.contact;
  document.getElementById('contact-heading').textContent = 'Let\'s connect';
  document.getElementById('contact-message').textContent = contact.message;
  document.getElementById('contact-list').innerHTML = `
    <div class="contact-item"><strong>Email:</strong> ${contact.email}</div>
    <div class="contact-item"><strong>Phone:</strong> ${contact.phone}</div>
    <div class="contact-item"><strong>Location:</strong> ${contact.location}</div>
  `;
  document.getElementById('contact-profile-image').src = state.content.profile.profileImage;
  document.getElementById('contact-profile-image').alt = state.content.profile.name;
}

function renderFooter() {
  document.getElementById('footer-name').textContent = state.content.profile.name;
  document.getElementById('footer-role').textContent = 'Data Science Portfolio';
  document.getElementById('footer-github').href = state.content.profile.github;
  document.getElementById('footer-linkedin').href = state.content.profile.linkedin;
}

function renderAdmin() {
  const body = document.getElementById('admin-body');
  body.innerHTML = `
    <div class="admin-grid">
      <div class="admin-card">
        <h3>Profile</h3>
        <label>Name<input data-field="profile.name" value="${state.content.profile.name}" /></label>
        <label>Tagline<textarea data-field="profile.tagline">${state.content.profile.tagline}</textarea></label>
        <label>Status<input data-field="profile.status" value="${state.content.profile.status}" /></label>
        <label>GitHub<input data-field="profile.github" value="${state.content.profile.github}" /></label>
        <label>LinkedIn<input data-field="profile.linkedin" value="${state.content.profile.linkedin}" /></label>
      </div>
      <div class="admin-card">
        <h3>About</h3>
        <label>Headline<input data-field="about.headline" value="${state.content.about.headline}" /></label>
        <label>Summary<input data-field="about.summary" value="${state.content.about.summary}" /></label>
        <label>Paragraph 1<textarea data-field="about.paragraphs.0">${state.content.about.paragraphs[0]}</textarea></label>
        <label>Paragraph 2<textarea data-field="about.paragraphs.1">${state.content.about.paragraphs[1]}</textarea></label>
      </div>
      <div class="admin-card">
        <h3>Projects</h3>
        <label>Project title<input data-field="projects.0.title" value="${state.content.projects[0].title}" /></label>
        <label>Description<textarea data-field="projects.0.description">${state.content.projects[0].description}</textarea></label>
        <label>Project title 2<input data-field="projects.1.title" value="${state.content.projects[1].title}" /></label>
      </div>
      <div class="admin-card">
        <h3>Contact</h3>
        <label>Email<input data-field="contact.email" value="${state.content.contact.email}" /></label>
        <label>Phone<input data-field="contact.phone" value="${state.content.contact.phone}" /></label>
        <label>Location<input data-field="contact.location" value="${state.content.contact.location}" /></label>
      </div>
    </div>
  `;
  body.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', (event) => updateField(event.target.dataset.field, event.target.value));
  });
}

function updateField(path, value) {
  const keys = path.split('.');
  let current = state.content;
  for (let i = 0; i < keys.length - 1; i += 1) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  render();
  saveContent();
}

function setupInteractions() {
  document.getElementById('theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
  document.getElementById('language-toggle').addEventListener('click', () => {
    state.language = state.language === 'en' ? 'ar' : 'en';
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('portfolio-language', state.language);
    document.getElementById('language-toggle').textContent = state.language.toUpperCase();
  });
  document.getElementById('admin-open').addEventListener('click', () => document.getElementById('admin-panel').showModal());
  document.getElementById('save-admin').addEventListener('click', () => { saveContent(); render(); });
  document.getElementById('reset-admin').addEventListener('click', () => { localStorage.removeItem(STORAGE_KEY); state.content = structuredClone(defaultContent); render(); });
  document.getElementById('export-admin').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state.content, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio-content.json';
    link.click();
  });
  document.getElementById('import-admin').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    state.content = JSON.parse(text);
    saveContent();
    render();
  });
  document.getElementById('project-search').addEventListener('input', renderProjects);
  document.getElementById('project-filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    state.activeFilter = button.dataset.filter;
    renderProjects();
  });
  document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = `mailto:${state.content.contact.email}?subject=Portfolio Contact&body=${encodeURIComponent(`${data.get('name')}\n${data.get('email')}\n${data.get('message')}`)}`;
    window.location.href = email;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  setupInteractions();
});
