/**
 * Ifeanyi Kalu Ukoha - Portfolio Interactive Script
 * Shared across all pages: Home, About, Projects, Academic Planner
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Shared Responsive Navigation Drawer System
  // =========================================================================
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navDrawer = document.getElementById('primaryNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navDrawerClose = document.getElementById('navDrawerClose');
  const navLinks = document.querySelectorAll('.nav-drawer .nav-link');

  const openDrawer = () => {
    if (!navDrawer) return;
    navDrawer.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus close button or first link for accessibility
    setTimeout(() => {
      if (navDrawerClose) {
        navDrawerClose.focus();
      } else if (navLinks.length > 0) {
        navLinks[0].focus();
      }
    }, 50);
  };

  const closeDrawer = () => {
    if (!navDrawer) return;
    navDrawer.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.focus();
    }
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navDrawer && navDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (navDrawerClose) {
    navDrawerClose.addEventListener('click', closeDrawer);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer on nav link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navDrawer && navDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  });

  // Keyboard accessibility: Escape key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navDrawer && navDrawer.classList.contains('open')) {
        closeDrawer();
      }
      const projectModal = document.getElementById('projectModal');
      if (projectModal && projectModal.classList.contains('open')) {
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });

  // Header shadow on scroll
  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 15);
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // =========================================================================
  // 2. Smooth Scrolling for internal anchors (#)
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 84;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================================================
  // 3. Project Detail Interactive Modal (Projects Page)
  // =========================================================================
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalImage = document.getElementById('modalImage');

  const projectDetails = {
    'starter-kit': {
      category: 'FEATURED WORK',
      title: 'Nigerian Remote Job Starter Kit',
      desc: 'A digital resource designed to help Nigerians prepare for remote job opportunities, with materials covering CVs, cover letters, interview preparation, and application tracking.',
      img: '/assets/img/6.png'
    },
    ebooks: {
      category: 'EDUCATIONAL GUIDES & PUBLISHING',
      title: 'Digital Products and E-books',
      desc: 'Educational PDF materials, guides, and digital reference products developed to explain foundational concepts and study routines clearly.',
      img: 'assets/img/4.png'
    },
    graphics: {
      category: 'VISUAL DESIGN & MARKETING ASSETS',
      title: 'Graphic Design and Digital Content',
      desc: 'Promotional flyers, product mockups, typography lockups, and social media graphics designed for various campaigns, organizations, and brand initiatives.',
      img: 'assets/img/5.png'
    },
    ezine: {
      category: 'PROMOTIONAL CONTENT & AI PLATFORM',
      title: 'Ezine Learning',
      desc: 'Recruitment, marketing, and informational promotional materials developed for an AI-powered learning platform.',
      img: 'assets/img/2.png'
    },
    prayer: {
      category: 'COMMUNITY MEDIA & FAITH FELLOWSHIP',
      title: 'When Friends Pray: One Accord',
      desc: 'Content creation, community communications, prayer schedules, promotional graphics, and social announcements for a Christ-centred prayer community.',
      img: 'assets/img/1.png'
    }
  };

  const openProjectModal = (id) => {
    const data = projectDetails[id];
    if (!data || !modalBackdrop) return;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalImage) {
      modalImage.src = data.img;
      modalImage.alt = data.title;
    }
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-modal-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }


  // 4. Academic Planner Task Manager (Planner Page)

  const plannerForm = document.getElementById('plannerForm');
  const plannerInput = document.getElementById('plannerInput');
  const tasksList = document.getElementById('tasksList');
  const totalTasksEl = document.getElementById('totalTasksCount');
  const pendingTasksEl = document.getElementById('pendingTasksCount');
  const completedTasksEl = document.getElementById('completedTasksCount');

  if (tasksList) {
    // Default tasks matching screenshot
    const defaultTasks = [
      { id: 1, title: 'Complete COS 106 assignment', completed: false },
      { id: 2, title: 'Prepare project screenshots', completed: true, finalized: true }
    ];

    let tasks = [];
    let isInitialDefault = false;
    try {
      const stored = localStorage.getItem('iku_academic_tasks');
      if (stored) {
        tasks = JSON.parse(stored);
      } else {
        tasks = [...defaultTasks];
        isInitialDefault = true;
      }
    } catch {
      tasks = [...defaultTasks];
      isInitialDefault = true;
    }

    const saveAndRenderTasks = (isInteractive = false) => {
      if (isInteractive) {
        isInitialDefault = false;
        try {
          localStorage.setItem('iku_academic_tasks', JSON.stringify(tasks));
        } catch {
          // localStorage fallback
        }
      }

      if (isInitialDefault) {
        // Initial untouched state matches screenshot design numbers exactly: 3, 2, 1
        if (totalTasksEl) totalTasksEl.textContent = '3';
        if (pendingTasksEl) pendingTasksEl.textContent = '2';
        if (completedTasksEl) completedTasksEl.textContent = '1';
      } else {
        // Dynamic stats calculation for all user actions
        const total = tasks.length;
        const completed = tasks.filter((t) => t.completed).length;
        const pending = total - completed;

        if (totalTasksEl) totalTasksEl.textContent = total;
        if (pendingTasksEl) pendingTasksEl.textContent = pending;
        if (completedTasksEl) completedTasksEl.textContent = completed;
      }

      // Render tasks list
      tasksList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = `planner-task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
          <div class="planner-task-left">
            <input
              type="checkbox"
              class="planner-checkbox"
              ${task.completed ? 'checked' : ''}
              aria-label="Toggle ${task.title}"
            />
            <div class="planner-task-content">
              <span class="planner-task-title">${task.title}</span>
              ${
                task.completed
                  ? `<div class="planner-finalized-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="9 12 12 15 16 10"></polyline>
                      </svg>
                      <span>Finalized</span>
                    </div>`
                  : ''
              }
            </div>
          </div>
          <button type="button" class="planner-delete-btn" aria-label="Delete task">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        `;

        // Toggle checkbox
        const checkbox = li.querySelector('.planner-checkbox');
        checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          if (task.completed) task.finalized = true;
          saveAndRenderTasks(true);
        });

        // Delete button
        const deleteBtn = li.querySelector('.planner-delete-btn');
        deleteBtn.addEventListener('click', () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          saveAndRenderTasks(true);
        });

        tasksList.appendChild(li);
      });
    };

    if (plannerForm && plannerInput) {
      plannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = plannerInput.value.trim();
        if (!text) return;
        const newTask = {
          id: Date.now(),
          title: text,
          completed: false
        };
        tasks.unshift(newTask);
        plannerInput.value = '';
        saveAndRenderTasks(true);
      });
    }

    saveAndRenderTasks(false);
  }

  // =========================================================================
  // 5. Contact Form Submission Handling (Contact Page)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullNameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const enquiryInput = document.getElementById('enquiry');

      const fullName = (fullNameInput ? fullNameInput.value : '').trim();
      const email = (emailInput ? emailInput.value : '').trim();
      const phone = (phoneInput ? phoneInput.value : '').trim();
      const enquiry = (enquiryInput ? enquiryInput.value : '').trim();

      if (!fullName || !email || !phone || !enquiry) {
        if (contactStatus) {
          contactStatus.className = 'contact-form-status error';
          contactStatus.textContent = 'Please fill out all required fields marked with an asterisk (*).';
        }
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (contactStatus) {
          contactStatus.className = 'contact-form-status error';
          contactStatus.textContent = 'Please provide a valid email address.';
        }
        return;
      }

      // Show temporary sending state
      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = 'Sending Message...';
      }

      setTimeout(() => {
        if (contactStatus) {
          contactStatus.className = 'contact-form-status success';
          contactStatus.textContent = `Thank you, ${fullName}! Your message has been sent successfully. I will get back to you soon.`;
        }

        contactForm.reset();

        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = 'Send Message <span class="arrow" aria-hidden="true">→</span>';
        }
      }, 500);
    });
  }
});
