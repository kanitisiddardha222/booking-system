document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Selected Ticket from sessionStorage
    const sessionData = sessionStorage.getItem('selectedTicket');
    if (!sessionData) {
        showToast('No reservation selected. Redirecting back to search...', 'error');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        return;
    }

    const bookingDetails = JSON.parse(sessionData);
    const { ticket, category, passengersCount, travelDate, source, destination } = bookingDetails;

    // Theme Switcher support
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('bookink-theme') || 'light';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('bookink-theme', theme);
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun theme-icon';
        } else {
            icon.className = 'fa-solid fa-moon theme-icon';
        }
    }

    // DOM Elements Selectors
    const ticketOverview = document.getElementById('selected-ticket-overview');
    const dynamicPassengersContainer = document.getElementById('dynamic-passengers-container');
    const fareRowsContainer = document.getElementById('fare-rows-container');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    const passengerForm = document.getElementById('passenger-info-form');
    const insuranceCheckbox = document.getElementById('travel-insurance');
    
    const couponInput = document.getElementById('coupon-input');
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const couponFeedback = document.getElementById('coupon-feedback');

    const paymentOverlay = document.getElementById('payment-modal-overlay');
    const closePaymentBtn = document.getElementById('close-payment-btn');
    const paymentCardForm = document.getElementById('payment-card-form');
    const modalPaymentAmount = document.getElementById('modal-payment-amount');
    const payBtnAmount = document.getElementById('pay-btn-amount');

    const paymentCardPanel = document.getElementById('payment-card-panel');
    const paymentProcessingPanel = document.getElementById('payment-processing-panel');
    const paymentSuccessPanel = document.getElementById('payment-success-panel');

    const receiptBookingId = document.getElementById('receipt-booking-id');
    const receiptTotalAmount = document.getElementById('receipt-total-amount');
    const successHomeBtn = document.getElementById('success-home-btn');
    const toastContainer = document.getElementById('toast-container');

    // Pricing States
    let basePrice = ticket.price * passengersCount;
    let taxAndFees = Math.round(basePrice * 0.1);
    let serviceFee = 10;
    let insuranceCost = 0;
    let discountAmount = 0;
    let finalTotal = basePrice + taxAndFees + serviceFee;
    let appliedCouponCode = '';

    // Initialize UI
    renderTicketOverview();
    renderPassengerBlocks();
    updateFareSummary();

    // ==========================================================================
    // 2. Render Functions
    // ==========================================================================
    function renderTicketOverview() {
        const formattedDate = new Date(travelDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        
        let headerDetails = '';
        if (category === 'Hotels') {
            const stars = '★'.repeat(ticket.rating) + '☆'.repeat(5 - ticket.rating);
            headerDetails = `
                <div class="checkout-ticket-summary">
                    <div class="ticket-summary-header">
                        <span class="ticket-type-badge">${category} Booking</span>
                        <span class="ticket-summary-date">Check-in: ${formattedDate}</span>
                    </div>
                    <div class="ticket-operator">
                        <img src="${ticket.logoUrl}" alt="${ticket.operatorName}" class="operator-logo">
                        <div>
                            <span class="operator-name">${ticket.operatorName}</span>
                            <div class="hotel-rating-stars">${stars}</div>
                            <span class="hotel-location"><i class="fa-solid fa-location-dot"></i> ${ticket.location}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            let iconClass = 'fa-plane';
            if (category === 'Train') iconClass = 'fa-train';
            if (category === 'Bus') iconClass = 'fa-bus';
            if (category === 'Cab') iconClass = 'fa-taxi';

            headerDetails = `
                <div class="checkout-ticket-summary">
                    <div class="ticket-summary-header">
                        <span class="ticket-type-badge">${category} Ticket</span>
                        <span class="ticket-summary-date">Date: ${formattedDate}</span>
                    </div>
                    <div class="ticket-operator">
                        <img src="${ticket.logoUrl}" alt="${ticket.operatorName}" class="operator-logo">
                        <div>
                            <span class="operator-name">${ticket.operatorName}</span>
                            <span class="operator-class">${ticket.airline || category + ' Express'}</span>
                        </div>
                    </div>
                    <div class="ticket-details">
                        <div class="timeline-group" style="max-width: 100%;">
                            <div class="timeline-node">
                                <span class="node-time">${ticket.departureTime}</span>
                                <span class="node-station">${ticket.departureStation || 'SRC'}</span>
                            </div>
                            <div class="timeline-connector">
                                <span class="connector-duration">${ticket.duration}</span>
                                <div class="connector-line">
                                    <i class="fa-solid ${iconClass}"></i>
                                </div>
                            </div>
                            <div class="timeline-node">
                                <span class="node-time">${ticket.arrivalTime}</span>
                                <span class="node-station">${ticket.arrivalStation || 'DST'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        ticketOverview.innerHTML = headerDetails;
    }

    function renderPassengerBlocks() {
        dynamicPassengersContainer.innerHTML = '';
        for (let i = 1; i <= passengersCount; i++) {
            const block = document.createElement('div');
            block.className = 'passenger-block';
            block.innerHTML = `
                <div class="passenger-block-title">
                    <i class="fa-solid fa-user"></i> Passenger #${i} ${i === 1 ? '(Lead Passenger)' : ''}
                </div>
                <div class="form-row">
                    <div class="form-group flex-2">
                        <label for="passenger-name-${i}">Full Name</label>
                        <input type="text" id="passenger-name-${i}" placeholder="Enter full name as on ID" required>
                    </div>
                    <div class="form-group flex-1">
                        <label for="passenger-age-${i}">Age</label>
                        <input type="number" id="passenger-age-${i}" min="1" max="120" placeholder="Age" required>
                    </div>
                    <div class="form-group flex-1">
                        <label for="passenger-gender-${i}">Gender</label>
                        <select id="passenger-gender-${i}" required>
                            <option value="" disabled selected>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="prefer-not">Prefer not to say</option>
                        </select>
                    </div>
                </div>
            `;
            dynamicPassengersContainer.appendChild(block);
        }
    }

    function updateFareSummary() {
        finalTotal = basePrice + taxAndFees + serviceFee + insuranceCost - discountAmount;
        
        let unitText = category === 'Hotels' ? 'night' : 'passenger';
        
        let breakdownHtml = `
            <div class="fare-row">
                <span>Base Fare ($${ticket.price} x ${passengersCount} ${passengersCount > 1 ? 'passengers' : 'passenger'})</span>
                <span>$${basePrice.toFixed(2)}</span>
            </div>
            <div class="fare-row">
                <span>Taxes & Airport/Hotel Fees (10%)</span>
                <span>$${taxAndFees.toFixed(2)}</span>
            </div>
            <div class="fare-row">
                <span>Secure Service Booking Fee</span>
                <span>$${serviceFee.toFixed(2)}</span>
            </div>
        `;

        if (insuranceCost > 0) {
            breakdownHtml += `
                <div class="fare-row">
                    <span>Trip Protection Add-on ($15.00 x ${passengersCount})</span>
                    <span>$${insuranceCost.toFixed(2)}</span>
                </div>
            `;
        }

        if (discountAmount > 0) {
            breakdownHtml += `
                <div class="fare-row discount-row">
                    <span>Promo Discount (${appliedCouponCode})</span>
                    <span>-$${discountAmount.toFixed(2)}</span>
                </div>
            `;
        }

        fareRowsContainer.innerHTML = breakdownHtml;
        checkoutTotalPrice.textContent = `$${finalTotal.toFixed(2)}`;
    }

    // ==========================================================================
    // 3. Coupon Validation Logic
    // ==========================================================================
    applyCouponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        couponFeedback.className = 'coupon-feedback';
        couponFeedback.textContent = '';

        if (!code) {
            couponFeedback.classList.add('error');
            couponFeedback.textContent = 'Please enter a coupon code.';
            return;
        }

        // Mock coupon rules check
        let isSuccess = false;
        let discountPct = 0;
        let maxCap = 999;

        if (code === 'FLYINK25' && ['Flight', 'Holiday Packages'].includes(category)) {
            discountPct = 0.25;
            maxCap = 50;
            isSuccess = true;
        } else if (code === 'STAYINK15' && category === 'Hotels') {
            discountPct = 0.15;
            isSuccess = true;
        } else if (code === 'ADVENTURE20' && category === 'Holiday Packages') {
            discountPct = 0.20;
            isSuccess = true;
        } else if (code === 'ROADS10' && ['Cab', 'Bus', 'Train'].includes(category)) {
            discountPct = 0.10;
            isSuccess = true;
        }

        if (isSuccess) {
            appliedCouponCode = code;
            discountAmount = Math.min(basePrice * discountPct, maxCap);
            
            couponFeedback.classList.add('success');
            couponFeedback.textContent = `Coupon ${code} applied successfully! Discount: $${discountAmount.toFixed(2)}`;
            couponInput.disabled = true;
            applyCouponBtn.disabled = true;
            applyCouponBtn.textContent = 'Applied';
            
            updateFareSummary();
            showToast('Discount applied!', 'success');
        } else {
            discountAmount = 0;
            appliedCouponCode = '';
            couponFeedback.classList.add('error');
            couponFeedback.textContent = `Coupon ${code} is invalid or not applicable for ${category} bookings.`;
            updateFareSummary();
        }
    });

    // Insurance Add-on Change Listener
    insuranceCheckbox.addEventListener('change', () => {
        if (insuranceCheckbox.checked) {
            insuranceCost = 15 * passengersCount;
        } else {
            insuranceCost = 0;
        }
        updateFareSummary();
    });

    // ==========================================================================
    // 4. Passenger Form Submit & Payment Gate Trigger
    // ==========================================================================
    passengerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extra Validation Check
        let isValid = true;
        for (let i = 1; i <= passengersCount; i++) {
            const name = document.getElementById(`passenger-name-${i}`).value.trim();
            const age = document.getElementById(`passenger-age-${i}`).value;
            const gender = document.getElementById(`passenger-gender-${i}`).value;
            if (!name || !age || !gender) isValid = false;
        }

        if (!isValid) {
            showToast('Please fill out all passenger details.', 'error');
            return;
        }

        // Open Payment Modal Overlay
        modalPaymentAmount.textContent = `$${finalTotal.toFixed(2)}`;
        payBtnAmount.textContent = `$${finalTotal.toFixed(2)}`;
        paymentOverlay.classList.add('active');
    });

    // Modal Close
    closePaymentBtn.addEventListener('click', () => {
        paymentOverlay.classList.remove('active');
    });

    // Format credit card input numbers
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formattedValue += ' ';
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
    });

    // Format card expiry input date
    const cardExpiryInput = document.getElementById('card-expiry');
    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length > 2) {
            e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
        } else {
            e.target.value = value;
        }
    });

    // ==========================================================================
    // 5. Payment gateway checkout processing
    // ==========================================================================
    paymentCardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const holder = document.getElementById('card-holder').value.trim();
        const number = cardNumberInput.value.trim();
        const expiry = cardExpiryInput.value.trim();
        const cvv = document.getElementById('card-cvv').value.trim();

        if (!holder || number.length < 19 || expiry.length < 5 || cvv.length < 3) {
            showToast('Please enter correct payment credentials.', 'error');
            return;
        }

        // 1. Hide Input Form Panel, show loading spinner panel
        paymentCardPanel.style.display = 'none';
        paymentProcessingPanel.style.display = 'block';

        // 2. Simulate 2.5 seconds Gateway communication delay
        setTimeout(() => {
            paymentProcessingPanel.style.display = 'none';
            paymentSuccessPanel.style.display = 'block';
            
            // Generate mock receipt
            const transactionId = `BK-2026-INK${Math.floor(100000 + Math.random() * 900000)}`;
            receiptBookingId.textContent = transactionId;
            receiptTotalAmount.textContent = `$${finalTotal.toFixed(2)}`;
            
            showToast('Reservation guaranteed successfully!', 'success');
        }, 2500);
    });

    // Success Return Actions
    successHomeBtn.addEventListener('click', () => {
        // Clean up storage
        sessionStorage.removeItem('selectedTicket');
        window.location.href = 'dashboard.html';
    });

    // ==========================================================================
    // Helper Toast notification builder
    // ==========================================================================
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconClass = 'fa-circle-info';
        if (type === 'success') iconClass = 'fa-circle-check';
        if (type === 'error') iconClass = 'fa-circle-xmark';
        
        toast.innerHTML = `
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3500);
    }
});
