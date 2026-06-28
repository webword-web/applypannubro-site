// script.js - Core interactivity for Apply Pannu Bro

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Loading screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => loadingScreen.classList.add('hidden'), 800);
  }

  // Navbar toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Theme toggle (light/dark) saved in LocalStorage
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const storedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', storedTheme);
  if (themeToggle) themeToggle.innerHTML = storedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
  });
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Set current year in footers
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Load Services (cards) from services.json
  loadServices();

  // Service modal handling (services page)
  const serviceModal = document.getElementById('service-modal');
  const serviceContinue = document.getElementById('service-continue');
  const serviceCancel = document.getElementById('service-cancel');
  const correctionSection = document.getElementById('correction-details');

  if (serviceModal) {
    // Listen for card button clicks – delegated
    document.addEventListener('click', (e) => {
      if (e.target && e.target.matches('.proceed-btn')) {
        // Store selected service ID in modal dataset
        const card = e.target.closest('.card');
        serviceModal.dataset.serviceId = card.dataset.id;
        serviceModal.classList.remove('hidden');
      }
    });

    // Radio change to show/hide correction textarea
    document.addEventListener('change', (e) => {
      if (e.target && e.target.name === 'service-type') {
        if (e.target.value === 'correction') correctionSection.classList.remove('hidden');
        else correctionSection.classList.add('hidden');
      }
    });

    // Continue button – store selection into localStorage and navigate to invoice page
    if (serviceContinue) {
      serviceContinue.addEventListener('click', () => {
        const serviceId = serviceModal.dataset.serviceId;
        const type = document.querySelector('input[name="service-type"]:checked').value;
        const correction = type === 'correction' ? document.getElementById('correction-text').value : '';
        const selected = { serviceId, type, correction };
        localStorage.setItem('selectedService', JSON.stringify(selected));
        // Redirect to invoice page
        window.location.href = 'invoice.html';
      });
    }
    if (serviceCancel) {
      serviceCancel.addEventListener('click', () => serviceModal.classList.add('hidden'));
    }
  }

  // Feedback form handling (feedback.html)
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = e.target.elements['name'].value.trim();
      const phone = e.target.elements['phone'].value.trim();
      const rating = e.target.elements['rating'].value;
      const message = e.target.elements['message'].value.trim();
      const feedback = { name, phone, rating, message, date: new Date().toISOString() };
      const stored = JSON.parse(localStorage.getItem('feedback') || '[]');
      stored.push(feedback);
      localStorage.setItem('feedback', JSON.stringify(stored));
      alert('Thank you for your feedback!');
      e.target.reset();
      // Optionally refresh displayed feedback on home page
    });
  }

  // Admin login handling (admin.html)
  const adminLoginForm = document.getElementById('admin-login-form');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = e.target.elements['username'].value.trim();
      const password = e.target.elements['password'].value.trim();
      // Demo credentials (stored in script for simplicity)
      const demoCred = { username: 'admin', password: 'admin123' };
      if (username === demoCred.username && password === demoCred.password) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        window.location.href = 'admin-dashboard.html';
      } else {
        alert('Invalid credentials');
      }
    });
  }

  // Admin dashboard interactions (admin-dashboard.html)
  if (window.location.pathname.endsWith('admin-dashboard.html')) {
    initAdminDashboard();
  }
});

// ---------- Helper Functions ----------
function loadServices() {
  fetch('services.json')
    .then((res) => res.json())
    .then((services) => {
      const container = document.getElementById('services-cards');
      if (!container) return;
      const fragment = document.createDocumentFragment();
      services.forEach((svc) => {
        const card = document.createElement('div');
        card.className = 'card glass';
        card.dataset.id = svc.id;
        card.innerHTML = `
          <img src="${svc.image}" alt="${svc.name}" loading="lazy" />
          <h3>${svc.name}</h3>
          <p>${svc.description}</p>
          <p><strong>₹${svc.price}</strong></p>
          <input type="number" min="1" value="1" class="quantity-input" style="width:60px;margin-right:8px;" />
          <button class="proceed-btn btn btn-primary" data-key="proceedBtn">Proceed</button>
        `;
        fragment.appendChild(card);
      });
      container.appendChild(fragment);
    })
    .catch((err) => console.error('Failed to load services:', err));
}

function initAdminDashboard() {
  // Verify auth
  if (sessionStorage.getItem('adminAuthenticated') !== 'true') {
    window.location.href = 'admin.html';
    return;
  }

  const servicesKey = 'adminServices';
  const feedbackKey = 'feedback';
  const ordersKey = 'orders';

  // Load existing services from LocalStorage or initialise empty array
  const services = JSON.parse(localStorage.getItem(servicesKey) || '[]');
  renderServiceTable(services);

  // Service form handling (Add / Edit)
  const serviceForm = document.getElementById('service-form');
  let editMode = false;
  let editId = null;
  if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = editMode ? editId : Date.now().toString();
      const name = e.target.elements['name'].value.trim();
      const price = parseFloat(e.target.elements['price'].value);
      const desc = e.target.elements['description'].value.trim();
      const image = e.target.elements['image'].value.trim() || 'images/default.png';

      const newService = { id, name, price, description: desc, image };
      let updatedServices;
      if (editMode) {
        updatedServices = services.map((s) => (s.id === id ? newService : s));
        editMode = false;
        editId = null;
        serviceForm.reset();
        document.getElementById('service-submit').textContent = 'Add Service';
      } else {
        updatedServices = [...services, newService];
      }
      localStorage.setItem(servicesKey, JSON.stringify(updatedServices));
      renderServiceTable(updatedServices);
    });
  }

  // Delete / Edit button listeners (delegated)
  const tableBody = document.getElementById('services-table-body');
  if (tableBody) {
    tableBody.addEventListener('click', (e) => {
      if (e.target.matches('.edit-btn')) {
        const row = e.target.closest('tr');
        const sid = row.dataset.id;
        const svc = services.find((s) => s.id === sid);
        if (!svc) return;
        // Populate form
        serviceForm.elements['name'].value = svc.name;
        serviceForm.elements['price'].value = svc.price;
        serviceForm.elements['description'].value = svc.description;
        serviceForm.elements['image'].value = svc.image;
        editMode = true;
        editId = sid;
        document.getElementById('service-submit').textContent = 'Update Service';
      } else if (e.target.matches('.delete-btn')) {
        const row = e.target.closest('tr');
        const sid = row.dataset.id;
        const filtered = services.filter((s) => s.id !== sid);
        localStorage.setItem(servicesKey, JSON.stringify(filtered));
        renderServiceTable(filtered);
      }
    });
  }

  // Render feedback list
  const feedbackContainer = document.getElementById('feedback-list');
  if (feedbackContainer) {
    const fb = JSON.parse(localStorage.getItem(feedbackKey) || '[]');
    feedbackContainer.innerHTML = fb
      .map((f) => `<div class="feedback-item"><strong>${f.name}</strong> (${f.rating}/5): ${f.message}</div>`)
      .join('');
  }

  // Render orders summary cards
  const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
  const totalServices = services.length;
  const totalOrders = orders.length;
  const totalFeedback = JSON.parse(localStorage.getItem(feedbackKey) || '[]').length;
  const totalQueries = JSON.parse(localStorage.getItem('queries') || '[]').length;

  document.getElementById('total-services').textContent = totalServices;
  document.getElementById('total-orders').textContent = totalOrders;
  document.getElementById('total-feedback').textContent = totalFeedback;
  document.getElementById('total-queries').textContent = totalQueries;
}

function renderServiceTable(services) {
  const tbody = document.getElementById('services-table-body');
  if (!tbody) return;
  tbody.innerHTML = services
    .map(
      (s) => `
    <tr data-id="${s.id}">
      <td>${s.name}</td>
      <td>₹${s.price}</td>
      <td>${s.description}</td>
      <td>
        <button class="edit-btn btn btn-secondary" data-key="editBtn">Edit</button>
        <button class="delete-btn btn btn-primary" data-key="deleteBtn">Delete</button>
      </td>
    </tr>`
    )
    .join('');
}

// ---------- Language Switcher (delegated to language.js) ----------
// language.js will expose a global `changeLanguage(lang)` function; we call it on select change.
const langSelect = document.getElementById('language-select');
if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    if (window.changeLanguage) window.changeLanguage(lang);
    localStorage.setItem('preferredLang', lang);
  });
  // On load, apply stored preference
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  langSelect.value = savedLang;
  if (window.changeLanguage) window.changeLanguage(savedLang);
}
