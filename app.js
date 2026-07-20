document.addEventListener('DOMContentLoaded', () => {
    // DOM Element Selectors
    const tabs = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    const googleBtn = document.getElementById('google-auth-btn');
    const googleSpinner = document.getElementById('google-spinner');
    
    const emailForm = document.getElementById('email-login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailGroup = emailInput.closest('.input-group');
    const passwordGroup = passwordInput.closest('.input-group');
    
    const emailSubmitBtn = document.getElementById('email-submit-btn');
    const emailSpinner = document.getElementById('email-spinner');
    
    const passwordToggle = document.getElementById('toggle-password');
    const toastContainer = document.getElementById('toast-container');

    // ==========================================================================
    // 1. Tab Switching Functionality
    // ==========================================================================
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('active')) return;

            // Remove active status from current active tab and pane
            document.querySelector('.tab-btn.active').classList.remove('active');
            document.querySelector('.tab-pane.active').classList.remove('active');

            // Set current tab as active
            tab.classList.add('active');
            
            // Get associated pane ID and set active
            const targetPaneId = tab.getAttribute('aria-controls');
            const targetPane = document.getElementById(targetPaneId);
            targetPane.classList.add('active');

            // Accessibility updates
            tabs.forEach(t => {
                const isSelected = t === tab;
                t.setAttribute('aria-selected', isSelected);
                t.setAttribute('tabindex', isSelected ? '0' : '-1');
            });
        });
    });

    // Support keyboard arrows navigation inside tabs
    const tabList = document.querySelector('[role="tablist"]');
    if (tabList) {
        tabList.addEventListener('keydown', e => {
            const activeTab = document.querySelector('.tab-btn.active');
            let nextTab;

            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const tabsArray = Array.from(tabs);
                const activeIndex = tabsArray.indexOf(activeTab);

                if (e.key === 'ArrowRight') {
                    nextTab = tabsArray[activeIndex + 1] || tabsArray[0];
                } else if (e.key === 'ArrowLeft') {
                    nextTab = tabsArray[activeIndex - 1] || tabsArray[tabsArray.length - 1];
                }

                if (nextTab) {
                    nextTab.focus();
                    nextTab.click();
                }
            }
        });
    }

    // ==========================================================================
    // 2. Google OAuth Login Simulation (Option 1)
    // ==========================================================================
    googleBtn.addEventListener('click', () => {
        // Toggle loading states
        googleBtn.classList.add('loading');
        const originalText = googleBtn.querySelector('.google-btn-text').textContent;
        googleBtn.querySelector('.google-btn-text').textContent = 'Connecting to Google...';
        googleBtn.disabled = true;

        showToast('Initiating Google Authentication...', 'info');

        // Simulate OAuth handshakes and verification
        setTimeout(() => {
            // Success Mock Flow
            googleBtn.classList.remove('loading');
            googleBtn.querySelector('.google-btn-text').textContent = originalText;
            googleBtn.disabled = false;

            showToast('Successfully signed in via Google Account! Redirecting...', 'success');
            
            // Placeholder: Perform client side login state store / redirect
            mockBackendRedirect('google-oauth-user@gmail.com');
        }, 2000);
    });

    // ==========================================================================
    // 3. Email & Password Validation and Login (Option 2)
    // ==========================================================================
    
    // Toggle Password Visibility
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update eye icon class
        const icon = passwordToggle.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Real-time input cleaning on type (remove error visual once fixed)
    emailInput.addEventListener('input', () => {
        if (validateEmailFormat(emailInput.value)) {
            emailGroup.classList.remove('invalid');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length >= 8) {
            passwordGroup.classList.remove('invalid');
        }
    });

    // Form Submission Handler
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailVal = emailInput.value.trim();
        const passwordVal = passwordInput.value;

        let isValid = true;

        // 1. Email Check
        if (!validateEmailFormat(emailVal)) {
            emailGroup.classList.add('invalid');
            isValid = false;
        } else {
            emailGroup.classList.remove('invalid');
        }

        // 2. Password Check
        if (passwordVal.length < 8) {
            passwordGroup.classList.add('invalid');
            isValid = false;
        } else {
            passwordGroup.classList.remove('invalid');
        }

        if (!isValid) {
            showToast('Please correct validation errors.', 'error');
            return;
        }

        // Simulate Submission API Call
        emailSubmitBtn.classList.add('loading');
        emailSubmitBtn.disabled = true;

        setTimeout(() => {
            emailSubmitBtn.classList.remove('loading');
            emailSubmitBtn.disabled = false;

            // Mock database response check
            if (emailVal === 'error@bookink.com') {
                showToast('Authentication failed: Invalid credentials.', 'error');
            } else {
                showToast('Login successful! Redirecting to dashboard...', 'success');
                mockBackendRedirect(emailVal);
            }
        }, 2000);
    });

    // Validation Helpers
    function validateEmailFormat(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ==========================================================================
    // 4. Feedback & Notification Helpers (Toasts)
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

        // Fade out transition after 3.5 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3500);
    }

    // ==========================================================================
    // 5. Future Backend Integration Hooks (Placeholders)
    // ==========================================================================
    /**
     * Placeholder function to showcase how backend redirect or routing is integrated.
     * In a live project, this will store JWT / session tokens and route.
     * @param {string} email User email identity.
     */
    function mockBackendRedirect(email) {
        console.log(`[BACKEND INTEGRATION] Sign-in verified for: ${email}`);
        console.log(`[BACKEND INTEGRATION] Token payload: JWT_SESSION_TOKEN_MOCK_XYZ`);
        
        // Redirecting to the reservation dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }
});
