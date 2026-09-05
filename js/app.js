/**
 * Gurukrupa Tours & Travels - Core Application Controller
 * Handles Navigation, Direct Fleet & Package WhatsApp actions, Itinerary Modals & FAQs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFleetActions();
  initTourPackageActions();
  initFAQAccordion();
  initContactInquiry();
});

/* ----------------------------------------------------
 * 1. Mobile & Desktop Navigation
 * ---------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.main-header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-drawer');
  const mobileBackdrop = document.querySelector('.menu-backdrop');
  const closeBtn = document.querySelector('.close-menu-btn');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  function openMobileMenu() {
    mobileMenu?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  closeBtn?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  // Smooth link scroll & auto close
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        closeMobileMenu();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ----------------------------------------------------
 * 2. Fleet Category Filter & Direct Booking Action
 * ---------------------------------------------------- */
function initFleetActions() {
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-grid-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      fleetCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Direct WhatsApp booking on Fleet Cards (no re-typing from scratch!)
  const bookFleetBtns = document.querySelectorAll('.btn-book-fleet-car');
  bookFleetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const carName = btn.getAttribute('data-car-name') || 'Cab';
      const seats = btn.getAttribute('data-seats') || '4-7';
      const text = `*🚖 GURUKRUPA TOURS - VEHICLE INQUIRY*\n*Vehicle:* ${carName} (${seats} Seater AC)\n\nHello, I am interested in booking the *${carName}* for an upcoming trip. Please share availability, rates, and driver details.`;
      
      window.open(`https://wa.me/919922520939?text=${encodeURIComponent(text)}`, '_blank');
    });
  });
}

/* ----------------------------------------------------
 * 3. Tour Packages & Itinerary Detail Modal
 * ---------------------------------------------------- */
function initTourPackageActions() {
  const tourModal = document.getElementById('package-detail-modal');
  const viewDetailsBtns = document.querySelectorAll('.btn-view-package');
  const directBookPackageBtns = document.querySelectorAll('.btn-direct-book-package');

  // Direct WhatsApp Book Package from card
  directBookPackageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgTitle = btn.getAttribute('data-package-title') || 'Pilgrimage Tour';
      const text = `*🚖 GURUKRUPA TOURS - PACKAGE BOOKING*\n*Package:* ${pkgTitle}\n\nHi Gurukrupa Tours, I want to book the *${pkgTitle}*. Please share available dates, car options, and tariff details.`;
      window.open(`https://wa.me/919922520939?text=${encodeURIComponent(text)}`, '_blank');
    });
  });

  // Open Itinerary Modal
  if (!tourModal || !window.FARE_DATABASE) return;

  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgId = btn.getAttribute('data-package-id');
      const pkg = window.FARE_DATABASE.tourPackages.find(p => p.id === pkgId);
      if (pkg) {
        populateAndOpenTourModal(pkg);
      }
    });
  });

  function populateAndOpenTourModal(pkg) {
    const modalTitle = document.getElementById('pkg-modal-title');
    const modalDest = document.getElementById('pkg-modal-dest');
    const modalDuration = document.getElementById('pkg-modal-duration');
    const modalDesc = document.getElementById('pkg-modal-desc');
    const modalIncludesList = document.getElementById('pkg-modal-includes');
    const modalItineraryContainer = document.getElementById('pkg-modal-itinerary');
    const modalWaBtn = document.getElementById('pkg-modal-wa-btn');

    if (modalTitle) modalTitle.innerText = pkg.title;
    if (modalDest) modalDest.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${pkg.destination}`;
    if (modalDuration) modalDuration.innerText = pkg.duration;
    if (modalDesc) modalDesc.innerText = pkg.shortDesc;

    if (modalIncludesList) {
      modalIncludesList.innerHTML = pkg.includes.map(inc => `<li><i class="fas fa-check-circle"></i> ${inc}</li>`).join('');
    }

    if (modalItineraryContainer) {
      modalItineraryContainer.innerHTML = pkg.itinerary.map(item => `
        <div class="itinerary-timeline-item">
          <div class="timeline-day-badge">${item.day}</div>
          <div class="timeline-content">
            <h5 class="timeline-title">${item.title}</h5>
            <p class="timeline-text">${item.details}</p>
          </div>
        </div>
      `).join('');
    }

    // Direct WhatsApp booking button for this specific package inside modal
    if (modalWaBtn) {
      modalWaBtn.onclick = () => {
        const text = `*🚖 GURUKRUPA TOURS - ITINERARY BOOKING*\n*Package:* ${pkg.title}\n*Destinations:* ${pkg.destination}\n*Duration:* ${pkg.duration}\n\nHi Gurukrupa Tours, I have reviewed the day-by-day itinerary for *${pkg.title}* and would like to confirm cab booking with driver details.`;
        window.open(`https://wa.me/919922520939?text=${encodeURIComponent(text)}`, '_blank');
      };
    }

    tourModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/* ----------------------------------------------------
 * 4. FAQ Accordion
 * ---------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
 * 5. Quick Contact & Inquiry Form
 * ---------------------------------------------------- */
function initContactInquiry() {
  const forms = document.querySelectorAll('.quick-inquiry-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value.trim() || 'Customer';
      const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
      const service = form.querySelector('[name="service"]')?.value || 'Car Rental';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';

      if (!phone || phone.length < 10) {
        if (window.showToast) window.showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      if (window.showToast) {
        window.showToast(`Thank you, ${name}! Redirecting to WhatsApp for instant confirmation...`, 'success');
      }

      const waMsg = `*🚖 GURUKRUPA TOURS - NEW INQUIRY*\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Requirement:* ${message || 'Need cab booking and tariff details.'}\n\nPlease get in touch with me.`;
      
      setTimeout(() => {
        window.open(`https://wa.me/919922520939?text=${encodeURIComponent(waMsg)}`, '_blank');
      }, 800);

      form.reset();
    });
  });
}
