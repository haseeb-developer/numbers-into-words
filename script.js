// Advanced Number Formatter - Professional Portfolio Project
class NumberFormatter {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadTheme();
        this.initializeApp();
    }

    // Initialize DOM elements
    initializeElements() {
        this.numberInput = document.getElementById('numberInput');
        this.rawValue = document.getElementById('rawValue');
        this.formattedValue = document.getElementById('formattedValue');
        this.clearBtn = document.getElementById('clearBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.copyRawBtn = document.getElementById('copyRawBtn');
        this.copyFormattedBtn = document.getElementById('copyFormattedBtn');
        this.toast = document.getElementById('toast');
        this.body = document.body;
    }

    // Bind event listeners
    bindEvents() {
        // Input events
        this.numberInput.addEventListener('input', (e) => this.handleInput(e));
        this.numberInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.numberInput.addEventListener('focus', () => this.handleFocus());
        this.numberInput.addEventListener('blur', () => this.handleBlur());

        // Button events
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.copyRawBtn.addEventListener('click', () => this.copyToClipboard('raw'));
        this.copyFormattedBtn.addEventListener('click', () => this.copyToClipboard('formatted'));



        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));
    }

    // Initialize the application
    initializeApp() {
        this.updateDisplay('0', '0');
        this.updateClearButton();
        this.animateElements();
    }

    // Handle input changes
    handleInput(e) {
        const value = e.target.value;
        const cleanValue = this.cleanInput(value);
        
        if (cleanValue === '') {
            this.updateDisplay('0', '0');
            this.updateClearButton();
            return;
        }

        try {
            const number = this.parseNumber(cleanValue);
            if (number !== null) {
                const formatted = this.formatNumber(number);
                const rawFormatted = this.formatRawNumber(number);
                this.updateDisplay(rawFormatted, formatted);
            } else {
                this.updateDisplay('Invalid', 'Invalid');
            }
        } catch (error) {
            console.error('Number formatting error:', error);
            this.updateDisplay('Error', 'Error');
        }

        this.updateClearButton();
    }

    // Clean input value
    cleanInput(value) {
        return value.replace(/[^\d.,-]/g, '').replace(/,/g, '');
    }

    // Parse number with error handling
    parseNumber(value) {
        if (value === '' || value === '-') return null;
        
        // Handle scientific notation
        if (value.includes('e') || value.includes('E')) {
            const num = parseFloat(value);
            return isFinite(num) ? num : null;
        }

        // Handle regular numbers
        const num = parseFloat(value);
        return isFinite(num) ? num : null;
    }

    // Advanced number formatting with extended suffixes
    formatNumber(num) {
        if (num === 0) return '0';
        if (Math.abs(num) < 1) return this.formatSmallNumber(num);
        
        const absNum = Math.abs(num);
        const sign = num < 0 ? '-' : '';
        
        // Extended number suffixes for very large numbers
        const suffixes = [
            { value: 1e3, suffix: 'K' },
            { value: 1e6, suffix: 'M' },
            { value: 1e9, suffix: 'B' },
            { value: 1e12, suffix: 'T' },
            { value: 1e15, suffix: 'Q' },
            { value: 1e18, suffix: 'Qa' },
            { value: 1e21, suffix: 'Qi' },
            { value: 1e24, suffix: 'Sx' },
            { value: 1e27, suffix: 'Sp' },
            { value: 1e30, suffix: 'Oc' },
            { value: 1e33, suffix: 'No' },
            { value: 1e36, suffix: 'Dc' },
            { value: 1e39, suffix: 'Ud' },
            { value: 1e42, suffix: 'Dd' },
            { value: 1e45, suffix: 'Td' },
            { value: 1e48, suffix: 'Qad' },
            { value: 1e51, suffix: 'Qid' },
            { value: 1e54, suffix: 'Sxd' },
            { value: 1e57, suffix: 'Spd' },
            { value: 1e60, suffix: 'Ocd' },
            { value: 1e63, suffix: 'Nod' },
            { value: 1e66, suffix: 'Vg' },
            { value: 1e69, suffix: 'Uvg' },
            { value: 1e72, suffix: 'Dvg' },
            { value: 1e75, suffix: 'Tvg' },
            { value: 1e78, suffix: 'Qavg' },
            { value: 1e81, suffix: 'Qivg' },
            { value: 1e84, suffix: 'Sxvg' },
            { value: 1e87, suffix: 'Spvg' },
            { value: 1e90, suffix: 'Ocvg' },
            { value: 1e93, suffix: 'Novg' },
            { value: 1e96, suffix: 'Tg' },
            { value: 1e99, suffix: 'Utg' },
            { value: 1e102, suffix: 'Dtg' },
            { value: 1e105, suffix: 'Ttg' },
            { value: 1e108, suffix: 'Qatg' },
            { value: 1e111, suffix: 'Qitg' },
            { value: 1e114, suffix: 'Sxtg' },
            { value: 1e117, suffix: 'Sptg' },
            { value: 1e120, suffix: 'Octg' },
            { value: 1e123, suffix: 'Notg' },
            { value: 1e126, suffix: 'Qag' },
            { value: 1e129, suffix: 'Uqag' },
            { value: 1e132, suffix: 'Dqag' },
            { value: 1e135, suffix: 'Tqag' },
            { value: 1e138, suffix: 'Qaqag' },
            { value: 1e141, suffix: 'Qiqag' },
            { value: 1e144, suffix: 'Sxqag' },
            { value: 1e147, suffix: 'Spqag' },
            { value: 1e150, suffix: 'Ocqag' },
            { value: 1e153, suffix: 'Noqag' },
            { value: 1e156, suffix: 'Qig' },
            { value: 1e159, suffix: 'Uqig' },
            { value: 1e162, suffix: 'Dqig' },
            { value: 1e165, suffix: 'Tqig' },
            { value: 1e168, suffix: 'Qaqig' },
            { value: 1e171, suffix: 'Qiqig' },
            { value: 1e174, suffix: 'Sxqig' },
            { value: 1e177, suffix: 'Spqig' },
            { value: 1e180, suffix: 'Ocqig' },
            { value: 1e183, suffix: 'Noqig' },
            { value: 1e186, suffix: 'Sxg' },
            { value: 1e189, suffix: 'Usxg' },
            { value: 1e192, suffix: 'Dsxg' },
            { value: 1e195, suffix: 'Tsxg' },
            { value: 1e198, suffix: 'Qasxg' },
            { value: 1e201, suffix: 'Qisxg' },
            { value: 1e204, suffix: 'Sxsxg' },
            { value: 1e207, suffix: 'Spsxg' },
            { value: 1e210, suffix: 'Ocsxg' },
            { value: 1e213, suffix: 'Nosxg' },
            { value: 1e216, suffix: 'Spg' },
            { value: 1e219, suffix: 'Uspg' },
            { value: 1e222, suffix: 'Dspg' },
            { value: 1e225, suffix: 'Tspg' },
            { value: 1e228, suffix: 'Qaspg' },
            { value: 1e231, suffix: 'Qispg' },
            { value: 1e234, suffix: 'Sxspg' },
            { value: 1e237, suffix: 'Spspg' },
            { value: 1e240, suffix: 'Ocspg' },
            { value: 1e243, suffix: 'Nospg' },
            { value: 1e246, suffix: 'Ocg' },
            { value: 1e249, suffix: 'Uocg' },
            { value: 1e252, suffix: 'Docg' },
            { value: 1e255, suffix: 'Tocg' },
            { value: 1e258, suffix: 'Qaocg' },
            { value: 1e261, suffix: 'Qiocg' },
            { value: 1e264, suffix: 'Sxocg' },
            { value: 1e267, suffix: 'Spocg' },
            { value: 1e270, suffix: 'Ococg' },
            { value: 1e273, suffix: 'Noocg' },
            { value: 1e276, suffix: 'Nog' },
            { value: 1e279, suffix: 'Unog' },
            { value: 1e282, suffix: 'Dnog' },
            { value: 1e285, suffix: 'Tnog' },
            { value: 1e288, suffix: 'Qanog' },
            { value: 1e291, suffix: 'Qinog' },
            { value: 1e294, suffix: 'Sxnog' },
            { value: 1e297, suffix: 'Spnog' },
            { value: 1e300, suffix: 'Ocnog' },
            { value: 1e303, suffix: 'Nonog' }
        ];
        
        // Find the appropriate suffix
        for (let i = suffixes.length - 1; i >= 0; i--) {
            if (absNum >= suffixes[i].value) {
                return sign + this.formatLargeNumber(absNum, suffixes[i].value, suffixes[i].suffix);
            }
        }
        
        // For numbers beyond predefined suffixes, generate dynamic suffix
        if (absNum >= 1e306) {
            return sign + this.generateDynamicSuffix(absNum);
        }
        
        // If no suffix found, return the raw number
        return sign + this.formatRawNumber(absNum);
    }

    // Generate dynamic suffix for extremely large numbers
    generateDynamicSuffix(num) {
        const log10 = Math.log10(num);
        const exponent = Math.floor(log10);
        const mantissa = num / Math.pow(10, exponent);
        
        // Format mantissa with appropriate precision
        let formattedMantissa;
        if (mantissa >= 100) {
            formattedMantissa = Math.round(mantissa);
        } else if (mantissa >= 10) {
            formattedMantissa = mantissa.toFixed(1);
        } else {
            formattedMantissa = mantissa.toFixed(2);
        }
        
        return `${formattedMantissa}e${exponent}`;
    }

    // Format large numbers with precision
    formatLargeNumber(num, divisor, suffix) {
        const value = num / divisor;
        if (value >= 100) {
            return Math.round(value) + suffix;
        } else if (value >= 10) {
            return value.toFixed(1) + suffix;
        } else {
            return value.toFixed(2) + suffix;
        }
    }

    // Format small numbers (less than 1)
    formatSmallNumber(num) {
        const absNum = Math.abs(num);
        if (absNum >= 0.01) {
            return num.toFixed(2);
        } else if (absNum >= 0.001) {
            return num.toFixed(3);
        } else if (absNum >= 0.0001) {
            return num.toFixed(4);
        } else {
            return num.toExponential(2);
        }
    }

    // Format raw number with commas
    formatRawNumber(num) {
        if (Math.abs(num) < 1) {
            return num.toString();
        }
        
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    // Update display values
    updateDisplay(raw, formatted) {
        this.rawValue.textContent = raw;
        this.formattedValue.textContent = formatted;
        
        // Add animation class
        this.rawValue.classList.add('updated');
        this.formattedValue.classList.add('updated');
        
        setTimeout(() => {
            this.rawValue.classList.remove('updated');
            this.formattedValue.classList.remove('updated');
        }, 300);
    }

    // Update clear button visibility
    updateClearButton() {
        const hasValue = this.numberInput.value.trim() !== '';
        this.clearBtn.classList.toggle('visible', hasValue);
    }

    // Clear input
    clearInput() {
        this.numberInput.value = '';
        this.numberInput.focus();
        this.updateDisplay('0', '0');
        this.updateClearButton();
    }



    // Handle keyboard events
    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.clearInput();
        } else if (e.key === 'Enter') {
            this.numberInput.blur();
        }
    }

    // Handle global keyboard shortcuts
    handleGlobalKeydown(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    this.numberInput.focus();
                    break;
                case 'd':
                    e.preventDefault();
                    this.toggleTheme();
                    break;
            }
        }
    }

    // Handle input focus
    handleFocus() {
        this.numberInput.parentElement.classList.add('focused');
    }

    // Handle input blur
    handleBlur() {
        this.numberInput.parentElement.classList.remove('focused');
    }

    // Copy to clipboard
    async copyToClipboard(type) {
        const text = type === 'raw' ? this.rawValue.textContent : this.formattedValue.textContent;
        
        try {
            await navigator.clipboard.writeText(text);
            this.showToast(`Copied ${type} value to clipboard!`);
            
            // Add visual feedback
            const btn = type === 'raw' ? this.copyRawBtn : this.copyFormattedBtn;
            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 1000);
            
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            this.showToast('Failed to copy to clipboard', 'error');
        }
    }

    // Show toast notification
    showToast(message, type = 'success') {
        const toastContent = this.toast.querySelector('.toast-message');
        const toastIcon = this.toast.querySelector('i');
        
        toastContent.textContent = message;
        
        if (type === 'error') {
            this.toast.style.background = '#ef4444';
            toastIcon.className = 'fas fa-exclamation-circle';
        } else {
            this.toast.style.background = 'var(--accent-secondary)';
            toastIcon.className = 'fas fa-check-circle';
        }
        
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    // Theme management
    toggleTheme() {
        const isDark = this.body.classList.contains('dark-mode');
        this.body.classList.toggle('dark-mode', !isDark);
        this.updateThemeIcon(!isDark);
        this.saveTheme(!isDark);
    }

    // Update theme icon
    updateThemeIcon(isDark) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Save theme preference
    saveTheme(isDark) {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Load theme preference
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        
        this.body.classList.toggle('dark-mode', isDark);
        this.updateThemeIcon(isDark);
    }

    // Animate elements on load
    animateElements() {
        const elements = document.querySelectorAll('.result-card, .feature-card');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Utility method to format any number (public API)
    static format(number) {
        const formatter = new NumberFormatter();
        return formatter.formatNumber(number);
    }

    // Utility method to get formatted number with raw value
    static formatWithRaw(number) {
        const formatter = new NumberFormatter();
        const formatted = formatter.formatNumber(number);
        const raw = formatter.formatRawNumber(number);
        return { formatted, raw };
    }
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced input handling with debouncing
const debouncedInputHandler = debounce((formatter, event) => {
    formatter.handleInput(event);
}, 50);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const formatter = new NumberFormatter();
    
    // Enhanced input handling
    formatter.numberInput.addEventListener('input', (e) => {
        debouncedInputHandler(formatter, e);
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Performance monitoring
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`Number Formatter loaded in ${loadTime.toFixed(2)}ms`);
    }

    // Service Worker registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }

    // Add keyboard shortcuts help
    const shortcuts = {
        'Ctrl/Cmd + K': 'Focus input',
        'Ctrl/Cmd + D': 'Toggle theme',
        'Escape': 'Clear input',
        'Enter': 'Blur input'
    };

    console.log('Keyboard shortcuts:', shortcuts);
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NumberFormatter;
}

// Global access for debugging
window.NumberFormatter = NumberFormatter;
