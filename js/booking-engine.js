/**
 * Gurukrupa Tours & Travels - 3-Step Dynamic Booking Engine
 * Fully reactive for Outstation One-Way, Round-Trip & Local City Hourly bookings.
 * Strict passenger-count vehicle filtering and 1-tap WhatsApp checkout.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingEngine();
});

function initBookingEngine() {
  const bookingWidget = document.getElementById('booking-engine-widget');
  if (!bookingWidget) return;

  // Booking Engine State
  const bookingState = {
    step: 1,
    tripType: 'outstation-oneway', // 'outstation-oneway', 'outstation-round', 'local-hourly'
    fromCity: 'Solapur',
    toCity: 'Pune',
    pickupDate: getTomorrowDate(),
    returnDate: getDayAfterTomorrowDate(),
    pickupTime: '07:00',
    passengers: 4,
    days: 1,
    localPackage: '8hr80km',
    selectedVehicle: null,
    customerName: '',
    customerPhone: '',
    pickupAddress: '',
    specialNotes: ''
  };

  // DOM Elements
  const tabButtons = bookingWidget.querySelectorAll('.trip-type-tab');
  const stepPanels = bookingWidget.querySelectorAll('.booking-step-panel');
  const stepIndicators = bookingWidget.querySelectorAll('.step-nav-item');
  const fromInput = document.getElementById('bk-from-city');
  const toInput = document.getElementById('bk-to-city');
  const toInputGroup = document.getElementById('bk-to-city-group');
  const pickupDateInput = document.getElementById('bk-pickup-date');
  const returnDateGroup = document.getElementById('bk-return-date-group');
  const returnDateInput = document.getElementById('bk-return-date');
  const pickupTimeInput = document.getElementById('bk-pickup-time');
  const passengersInput = document.getElementById('bk-passengers');
  const localPkgGroup = document.getElementById('bk-local-package-group');
  const localPkgSelect = document.getElementById('bk-local-package');
  const daysGroup = document.getElementById('bk-days-group');
  const daysInput = document.getElementById('bk-days');
  const routePresetsWrap = document.getElementById('bk-route-presets-wrap');

  // Navigation Buttons
  const btnToStep2 = document.getElementById('btn-to-step-2');
  const btnBackToStep1 = document.getElementById('btn-back-to-step-1');
  const btnBackToStep2 = document.getElementById('btn-back-to-step-2');
  const vehicleListContainer = document.getElementById('vehicle-cards-container');
  const confirmationContainer = document.getElementById('booking-summary-checkout');
  const formFinalSubmit = document.getElementById('booking-final-form');

  // Set default dates
  if (pickupDateInput) {
    pickupDateInput.value = bookingState.pickupDate;
    pickupDateInput.min = getTodayDate();
    pickupDateInput.addEventListener('change', () => {
      bookingState.pickupDate = pickupDateInput.value;
      if (returnDateInput && returnDateInput.value < pickupDateInput.value) {
        returnDateInput.value = pickupDateInput.value;
        returnDateInput.min = pickupDateInput.value;
      }
    });
  }

  if (returnDateInput) {
    returnDateInput.value = bookingState.returnDate;
    returnDateInput.min = getTodayDate();
    returnDateInput.addEventListener('change', () => {
      bookingState.returnDate = returnDateInput.value;
    });
  }

  // Quick Preset Route Buttons (Clean city selection without confusing price tags)
  const presetChips = bookingWidget.querySelectorAll('.route-preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const toCity = chip.getAttribute('data-to');
      if (toInput) toInput.value = toCity;
      bookingState.toCity = toCity;

      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Trip Type Tab Switcher (Reactive State Updates)
  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      tabButtons.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tripType = tab.getAttribute('data-trip-type');
      bookingState.tripType = tripType;
      
      // Update form layout for this specific mode
      applyTripTypeConfig(tripType);

      // Return to Step 1 on tab change for a clean flow
      if (bookingState.step !== 1) {
        goToStep(1);
      }
    });
  });

  function applyTripTypeConfig(type) {
    const routeHint = document.getElementById('bk-route-hint');

    if (type === 'outstation-oneway') {
      if (toInputGroup) toInputGroup.style.display = 'block';
      if (returnDateGroup) returnDateGroup.style.display = 'none';
      if (daysGroup) daysGroup.style.display = 'none';
      if (localPkgGroup) localPkgGroup.style.display = 'none';
      if (routePresetsWrap) routePresetsWrap.style.display = 'block';
      if (routeHint) routeHint.innerHTML = '✨ <strong>Outstation One-Way:</strong> Point-to-point direct drop with transparent per-km billing.';
    } else if (type === 'outstation-round') {
      if (toInputGroup) toInputGroup.style.display = 'block';
      if (returnDateGroup) returnDateGroup.style.display = 'block';
      if (daysGroup) daysGroup.style.display = 'block';
      if (localPkgGroup) localPkgGroup.style.display = 'none';
      if (routePresetsWrap) routePresetsWrap.style.display = 'block';
      if (routeHint) routeHint.innerHTML = '🔄 <strong>Outstation Round-Trip:</strong> Dedicated cab & chauffeur at your disposal for complete round tour.';
    } else if (type === 'local-hourly') {
      if (toInputGroup) toInputGroup.style.display = 'none';
      if (returnDateGroup) returnDateGroup.style.display = 'none';
      if (daysGroup) daysGroup.style.display = 'none';
      if (localPkgGroup) localPkgGroup.style.display = 'block';
      if (routePresetsWrap) routePresetsWrap.style.display = 'none';
      if (routeHint) routeHint.innerHTML = '⏱️ <strong>Solapur Local Hourly:</strong> Dedicated city car for temple darshans, weddings, shopping & business.';
    }
  }

  // Step 1 -> Step 2: Validate & Generate Passenger-Filtered Vehicle Quotes
  if (btnToStep2) {
    btnToStep2.addEventListener('click', () => {
      const from = fromInput ? fromInput.value.trim() : 'Solapur';
      let to = toInput ? toInput.value.trim() : 'Pune';

      if (bookingState.tripType === 'local-hourly') {
        to = 'Solapur City Local';
      }

      if (!from) {
        if (window.showToast) window.showToast('Please enter your pickup location.', 'error');
        fromInput?.focus();
        return;
      }

      if (bookingState.tripType !== 'local-hourly' && !to) {
        if (window.showToast) window.showToast('Please enter your destination city.', 'error');
        toInput?.focus();
        return;
      }

      bookingState.fromCity = from;
      bookingState.toCity = to;
      bookingState.pickupDate = pickupDateInput ? pickupDateInput.value : getTomorrowDate();
      bookingState.returnDate = returnDateInput ? returnDateInput.value : getDayAfterTomorrowDate();
      bookingState.pickupTime = pickupTimeInput ? pickupTimeInput.value : '07:00';
      bookingState.passengers = passengersInput ? parseInt(passengersInput.value) || 4 : 4;
      bookingState.days = daysInput ? parseInt(daysInput.value) || 1 : 1;
      bookingState.localPackage = localPkgSelect ? localPkgSelect.value : '8hr80km';

      // Render strictly filtered vehicle list
      renderFilteredVehicleQuotes();
      goToStep(2);
    });
  }

  // Back Navigation Handlers
  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => goToStep(1));
  }
  if (btnBackToStep2) {
    btnBackToStep2.addEventListener('click', () => goToStep(2));
  }

  function goToStep(stepNum) {
    bookingState.step = stepNum;
    stepPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.getAttribute('data-step') == stepNum) {
        panel.classList.add('active');
      }
    });

    stepIndicators.forEach(ind => {
      const stepVal = parseInt(ind.getAttribute('data-step'));
      ind.classList.remove('active', 'completed');
      if (stepVal === stepNum) {
        ind.classList.add('active');
      } else if (stepVal < stepNum) {
        ind.classList.add('completed');
      }
    });

    // Smooth scroll to top of booking card
    bookingWidget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Step 2: Render Vehicles based on Passenger Count
  function renderFilteredVehicleQuotes() {
    if (!vehicleListContainer || !window.FareEngine) return;

    // Get strictly compatible vehicles based on chosen passenger count
    const quotes = window.FareEngine.getFilteredFleetQuotes(bookingState);

    // Route Summary Header Bar
    const summaryBar = document.getElementById('step-2-route-summary');
    if (summaryBar) {
      const b = quotes[0]?.breakdown;
      summaryBar.innerHTML = `
        <div class="route-badge-pill">
          <span class="trip-tag">${b ? b.tripTypeLabel : 'Trip'}</span>
          <strong>${bookingState.fromCity} ➔ ${bookingState.toCity}</strong>
          <span class="route-meta">📅 ${formatDate(bookingState.pickupDate)} • 👥 ${bookingState.passengers} Pax</span>
        </div>
      `;
    }

    // Render Vehicle Selection Cards
    vehicleListContainer.innerHTML = `
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
        <i class="fas fa-filter" style="color: var(--color-accent);"></i> Showing <strong>${quotes.length} vehicles</strong> perfectly sized for <strong>${bookingState.passengers} Passenger${bookingState.passengers > 1 ? 's' : ''}</strong>:
      </div>
      ${quotes.map(quote => {
        const b = quote.breakdown;
        return `
          <div class="vehicle-card-select" data-vehicle-id="${quote.vehicleId}">
            ${quote.tag ? `<div class="vehicle-tag-badge">${quote.tag}</div>` : ''}
            <div class="vehicle-card-header">
              <div class="vehicle-photo-wrapper">
                <img src="${quote.image}" alt="${quote.vehicleName}" class="vehicle-thumb" onerror="this.src='assets/images/swift-dzire.jpg'">
              </div>
              <div class="vehicle-main-info">
                <h3 class="vehicle-model-name">${quote.vehicleName}</h3>
                <div class="vehicle-capacity-pills">
                  <span class="cap-pill"><i class="fas fa-user-friends"></i> Up to ${quote.seats} Seats</span>
                  <span class="cap-pill"><i class="fas fa-suitcase"></i> ${quote.luggage}</span>
                  <span class="cap-pill"><i class="fas fa-snowflake"></i> AC</span>
                </div>
                <ul class="vehicle-feature-list">
                  ${quote.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div class="vehicle-card-pricing-footer">
              <div class="fare-quote-block">
                <div class="fare-est-label">Estimated Total Fare</div>
                <div class="fare-est-amount">₹${b.total.toLocaleString('en-IN')}</div>
                <div class="fare-rate-note">${b.rateText} • ${b.distanceText}</div>
              </div>
              <button type="button" class="btn-select-vehicle theme-btn btn-primary" data-vehicle-id="${quote.vehicleId}">
                Select & Proceed <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    `;

    // Attach Selection Event Listeners
    const selectBtns = vehicleListContainer.querySelectorAll('.btn-select-vehicle');
    selectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const vId = btn.getAttribute('data-vehicle-id');
        const chosen = quotes.find(q => q.vehicleId === vId);
        if (chosen) {
          bookingState.selectedVehicle = chosen;
          renderStep3Summary();
          goToStep(3);
        }
      });
    });
  }

  // Step 3: Render Checkout & Transparent Breakdown
  function renderStep3Summary() {
    if (!confirmationContainer || !bookingState.selectedVehicle) return;

    const v = bookingState.selectedVehicle;
    const b = v.breakdown;

    confirmationContainer.innerHTML = `
      <div class="checkout-summary-card">
        <div class="checkout-card-header">
          <div class="selected-car-visual">
            <img src="${v.image}" alt="${v.vehicleName}" onerror="this.src='assets/images/swift-dzire.jpg'">
          </div>
          <div class="selected-car-details">
            <span class="badge-accent">${b.tripTypeLabel}</span>
            <h3 class="checkout-car-title">${v.vehicleName}</h3>
            <p class="checkout-car-specs">👥 Fits ${bookingState.passengers} Passengers | 🧳 ${v.luggage} | ❄️ AC Chauffeur Driven</p>
          </div>
        </div>

        <div class="trip-itinerary-box">
          <div class="itinerary-row">
            <div class="itin-point">
              <span class="itin-dot origin"></span>
              <div>
                <span class="itin-label">Pickup Location</span>
                <strong>${bookingState.fromCity}</strong>
              </div>
            </div>
            <div class="itin-arrow">➔</div>
            <div class="itin-point">
              <span class="itin-dot destination"></span>
              <div>
                <span class="itin-label">Destination</span>
                <strong>${bookingState.toCity}</strong>
              </div>
            </div>
          </div>
          <div class="itinerary-meta-grid">
            <div><span class="meta-title">Pickup Date:</span> <strong>${formatDate(bookingState.pickupDate)}</strong></div>
            <div><span class="meta-title">Pickup Time:</span> <strong>${bookingState.pickupTime}</strong></div>
            <div><span class="meta-title">Passengers:</span> <strong>${bookingState.passengers} Pax</strong></div>
            <div><span class="meta-title">Route Distance:</span> <strong>${b.distanceText}</strong></div>
          </div>
        </div>

        <div class="fare-breakdown-table">
          <h4 class="fare-table-title"><i class="fas fa-receipt"></i> Transparent Fare Breakdown</h4>
          <div class="fare-row">
            <span>Base Fare (${b.billedDistanceText} @ ${b.rateText})</span>
            <span>₹${b.baseFare.toLocaleString('en-IN')}</span>
          </div>
          ${b.driverBata > 0 ? `
          <div class="fare-row">
            <span>Driver Allowance (Bata)</span>
            <span>₹${b.driverBata.toLocaleString('en-IN')}</span>
          </div>` : ''}
          ${b.tollEst > 0 ? `
          <div class="fare-row" style="color: var(--text-muted);">
            <span>Estimated Fastag Tolls & Taxes</span>
            <span>₹${b.tollEst.toLocaleString('en-IN')}</span>
          </div>` : ''}
          <div class="fare-row total-row">
            <span>Estimated Total Amount</span>
            <span class="grand-total-price">₹${b.total.toLocaleString('en-IN')}</span>
          </div>
          <p class="fare-disclaimer"><i class="fas fa-info-circle"></i> ${b.terms}</p>
        </div>
      </div>
    `;
  }

  // Handle Final WhatsApp Checkout Submission
  if (formFinalSubmit) {
    formFinalSubmit.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('bk-customer-name');
      const phoneInput = document.getElementById('bk-customer-phone');
      const addressInput = document.getElementById('bk-pickup-address');
      const notesInput = document.getElementById('bk-special-notes');

      if (!nameInput || !nameInput.value.trim()) {
        if (window.showToast) window.showToast('Please enter your name.', 'error');
        nameInput?.focus();
        return;
      }

      if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 10) {
        if (window.showToast) window.showToast('Please enter a valid 10-digit mobile number.', 'error');
        phoneInput?.focus();
        return;
      }

      bookingState.customerName = nameInput.value.trim();
      bookingState.customerPhone = phoneInput.value.trim();
      bookingState.pickupAddress = addressInput ? addressInput.value.trim() : '';
      bookingState.specialNotes = notesInput ? notesInput.value.trim() : '';

      // Generate Reference Code
      bookingState.bookingId = 'GK-' + Math.floor(100000 + Math.random() * 900000);

      // Show Modal & Open WhatsApp
      showBookingSuccessModal(bookingState);
      openWhatsAppBooking(bookingState);
    });
  }

  // 1-Tap WhatsApp Preformatted Message
  function openWhatsAppBooking(state) {
    const v = state.selectedVehicle;
    const b = v.breakdown;
    const phone = '919922520939'; // Gurukrupa primary booking helpline

    let msg = `*🚖 GURUKRUPA TOURS & TRAVELS - CAB BOOKING INQUIRY*\n`;
    msg += `*Booking Ref:* ${state.bookingId}\n`;
    msg += `------------------------------------\n`;
    msg += `*Passenger Name:* ${state.customerName}\n`;
    msg += `*Mobile:* ${state.customerPhone}\n`;
    msg += `*Trip Type:* ${b.tripTypeLabel}\n`;
    msg += `*Pickup:* ${state.fromCity}\n`;
    msg += `*Destination:* ${state.toCity}\n`;
    msg += `*Pickup Date & Time:* ${formatDate(state.pickupDate)} at ${state.pickupTime}\n`;
    if (state.tripType === 'outstation-round') {
      msg += `*Return Date / Days:* ${formatDate(state.returnDate)} (${state.days} Days)\n`;
    }
    msg += `*Vehicle:* ${v.vehicleName} (${v.seats} Seater AC)\n`;
    msg += `*Passenger Count:* ${state.passengers} Persons\n`;
    if (state.pickupAddress) {
      msg += `*Pickup Address:* ${state.pickupAddress}\n`;
    }
    if (state.specialNotes) {
      msg += `*Special Note:* ${state.specialNotes}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `*Estimated Fare:* ₹${b.total.toLocaleString('en-IN')}\n`;
    msg += `------------------------------------\n`;
    msg += `Please confirm cab availability & dispatch driver details. Thank you!`;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  }

  // In-App Success Modal
  function showBookingSuccessModal(state) {
    const modal = document.getElementById('booking-success-modal');
    if (!modal) return;

    const v = state.selectedVehicle;
    const b = v.breakdown;

    const refElem = document.getElementById('modal-booking-ref');
    const nameElem = document.getElementById('modal-customer-name');
    const routeElem = document.getElementById('modal-route-info');
    const carElem = document.getElementById('modal-car-info');
    const fareElem = document.getElementById('modal-fare-info');
    const waBtn = document.getElementById('modal-whatsapp-btn');
    const callBtn = document.getElementById('modal-call-btn');

    if (refElem) refElem.innerText = state.bookingId;
    if (nameElem) nameElem.innerText = state.customerName;
    if (routeElem) routeElem.innerText = `${state.fromCity} ➔ ${state.toCity} on ${formatDate(state.pickupDate)}`;
    if (carElem) carElem.innerText = `${v.vehicleName} (${state.passengers} Pax)`;
    if (fareElem) fareElem.innerText = `₹${b.total.toLocaleString('en-IN')}`;

    if (waBtn) waBtn.onclick = () => openWhatsAppBooking(state);
    if (callBtn) callBtn.onclick = () => { window.location.href = 'tel:9922520939'; };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Modal Close Handlers
  document.querySelectorAll('.close-modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.site-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// Helpers
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getDayAfterTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-notification-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === 'error' ? '⚠️' : (type === 'success' ? '✅' : 'ℹ️')}</div>
    <div class="toast-msg">${message}</div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

window.showToast = showToast;
window.formatDate = formatDate;
