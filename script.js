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
        this.wordValue = document.getElementById('wordValue');
        this.romanValue = document.getElementById('romanValue');
        this.binaryValue = document.getElementById('binaryValue');
        this.factsValue = document.getElementById('factsValue');
        this.currencyValue = document.getElementById('currencyValue');
        this.scientificValue = document.getElementById('scientificValue');
        this.percentageValue = document.getElementById('percentageValue');
        this.timeValue = document.getElementById('timeValue');
        this.clearBtn = document.getElementById('clearBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.copyRawBtn = document.getElementById('copyRawBtn');
        this.copyFormattedBtn = document.getElementById('copyFormattedBtn');
        this.copyWordBtn = document.getElementById('copyWordBtn');
        this.copyRomanBtn = document.getElementById('copyRomanBtn');
        this.copyBinaryBtn = document.getElementById('copyBinaryBtn');
        this.copyFactsBtn = document.getElementById('copyFactsBtn');
        this.copyCurrencyBtn = document.getElementById('copyCurrencyBtn');
        this.copyScientificBtn = document.getElementById('copyScientificBtn');
        this.copyPercentageBtn = document.getElementById('copyPercentageBtn');
        this.copyTimeBtn = document.getElementById('copyTimeBtn');
        this.toast = document.getElementById('toast');
        this.counterValue = document.getElementById('counterValue');
        this.body = document.body;
        this.currentCount = 0;
    }

    // Bind event listeners
    bindEvents() {
        // Input events
        this.numberInput.addEventListener('input', (e) => this.handleInput(e));
        this.numberInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.numberInput.addEventListener('keypress', (e) => this.handleKeypress(e));
        this.numberInput.addEventListener('beforeinput', (e) => this.handleBeforeInput(e));
        this.numberInput.addEventListener('paste', (e) => this.handlePaste(e));
        this.numberInput.addEventListener('focus', () => this.handleFocus());
        this.numberInput.addEventListener('blur', () => this.handleBlur());

        // Button events
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.copyRawBtn.addEventListener('click', () => this.copyToClipboard('raw'));
        this.copyFormattedBtn.addEventListener('click', () => this.copyToClipboard('formatted'));
        this.copyWordBtn.addEventListener('click', () => this.copyToClipboard('word'));
        this.copyRomanBtn.addEventListener('click', () => this.copyToClipboard('roman'));
        this.copyBinaryBtn.addEventListener('click', () => this.copyToClipboard('binary'));
        this.copyFactsBtn.addEventListener('click', () => this.copyToClipboard('facts'));
        this.copyCurrencyBtn.addEventListener('click', () => this.copyToClipboard('currency'));
        this.copyScientificBtn.addEventListener('click', () => this.copyToClipboard('scientific'));
        this.copyPercentageBtn.addEventListener('click', () => this.copyToClipboard('percentage'));
        this.copyTimeBtn.addEventListener('click', () => this.copyToClipboard('time'));



        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));
    }

    // Initialize the application
    initializeApp() {
        this.updateAllDisplays(0);
        this.updateClearButton();
        this.animateElements();
    }

    // Handle input changes
    handleInput(e) {
        const value = e.target.value;
        const cleanValue = this.cleanInput(value);
        
        // If the cleaned value is different from the original, update the input
        if (value !== cleanValue) {
            const cursorPosition = e.target.selectionStart;
            e.target.value = cleanValue;
            // Adjust cursor position to account for removed characters
            const removedChars = value.length - cleanValue.length;
            e.target.setSelectionRange(cursorPosition - removedChars, cursorPosition - removedChars);
            this.showInputRestrictionFeedback();
        }
        
        // Update counter with animated increment
        this.updateCounter(cleanValue.length);
        
        if (cleanValue === '') {
            this.updateAllDisplays(0);
            this.updateClearButton();
            return;
        }

        try {
            const number = this.parseNumber(cleanValue);
            if (number !== null) {
                this.updateAllDisplays(number);
            } else {
                this.updateAllDisplays('Invalid');
            }
        } catch (error) {
            console.error('Number formatting error:', error);
            this.updateAllDisplays('Error');
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

    // Update all display values
    updateAllDisplays(number) {
        if (number === 'Invalid' || number === 'Error') {
            this.rawValue.textContent = number;
            this.formattedValue.textContent = number;
            this.wordValue.textContent = number;
            this.romanValue.textContent = number;
            this.binaryValue.textContent = number;
            this.factsValue.textContent = number;
            this.currencyValue.textContent = number;
            this.scientificValue.textContent = number;
            this.percentageValue.textContent = number;
            this.timeValue.textContent = number;
        } else {
            this.rawValue.textContent = this.formatRawNumber(number);
            this.formattedValue.textContent = this.formatNumber(number);
            this.wordValue.textContent = this.numberToWords(number);
            this.romanValue.textContent = this.numberToRoman(number);
            this.binaryValue.textContent = this.numberToBinaryHex(number);
            this.factsValue.textContent = this.getNumberFacts(number);
            this.currencyValue.textContent = this.numberToCurrency(number);
            this.scientificValue.textContent = this.numberToScientific(number);
            this.percentageValue.textContent = this.numberToPercentage(number);
            this.timeValue.textContent = this.numberToTimeDuration(number);
        }
        
        // Add animation class to all elements
        const elements = [this.rawValue, this.formattedValue, this.wordValue, this.romanValue, this.binaryValue, this.factsValue, this.currencyValue, this.scientificValue, this.percentageValue, this.timeValue];
        elements.forEach(el => el.classList.add('updated'));
        
        setTimeout(() => {
            elements.forEach(el => el.classList.remove('updated'));
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
        this.updateAllDisplays(0);
        this.updateCounter(0);
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

    // Handle beforeinput to prevent non-numeric input (most reliable)
    handleBeforeInput(e) {
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
        if (e.inputType === 'deleteContentBackward' || 
            e.inputType === 'deleteContentForward' ||
            e.inputType === 'insertCompositionText' ||
            e.inputType === 'deleteCompositionText') {
            return;
        }
        
        // Allow only numbers, decimal point, and minus sign
        if (e.data && !/[0-9.-]/.test(e.data)) {
            e.preventDefault();
            this.showInputRestrictionFeedback();
        }
    }

    // Handle keypress to prevent non-numeric input
    handleKeypress(e) {
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
        if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            (e.keyCode === 90 && e.ctrlKey === true)) {
            return;
        }
        
        // Allow only numbers, decimal point, and minus sign
        const char = e.key;
        if (!/[0-9.-]/.test(char)) {
            e.preventDefault();
            this.showInputRestrictionFeedback();
        }
    }

    // Handle paste events to filter non-numeric content
    handlePaste(e) {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        const cleanPaste = paste.replace(/[^\d.,-]/g, '');
        
        if (cleanPaste !== paste) {
            this.showInputRestrictionFeedback();
        }
        
        // Insert only the clean numeric content
        const start = this.numberInput.selectionStart;
        const end = this.numberInput.selectionEnd;
        const currentValue = this.numberInput.value;
        const newValue = currentValue.substring(0, start) + cleanPaste + currentValue.substring(end);
        
        this.numberInput.value = newValue;
        this.numberInput.setSelectionRange(start + cleanPaste.length, start + cleanPaste.length);
        
        // Trigger input event to update display and counter
        this.numberInput.dispatchEvent(new Event('input'));
    }

    // Show visual feedback when input is restricted
    showInputRestrictionFeedback() {
        this.numberInput.style.borderColor = '#ef4444';
        this.numberInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        setTimeout(() => {
            this.numberInput.style.borderColor = '';
            this.numberInput.style.boxShadow = '';
        }, 300);
    }

    // Update counter with smooth animation
    updateCounter(newCount) {
        if (newCount === this.currentCount) return;
        
        const targetCount = newCount;
        const startCount = this.currentCount;
        const duration = 300; // Animation duration in ms
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(startCount + (targetCount - startCount) * easeOutCubic);
            
            this.counterValue.textContent = currentCount;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.currentCount = targetCount;
                this.counterValue.classList.add('updated');
                setTimeout(() => {
                    this.counterValue.classList.remove('updated');
                }, 400);
            }
        };
        
        requestAnimationFrame(animate);
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
        let text, btn;
        
        switch(type) {
            case 'raw':
                text = this.rawValue.textContent;
                btn = this.copyRawBtn;
                break;
            case 'formatted':
                text = this.formattedValue.textContent;
                btn = this.copyFormattedBtn;
                break;
            case 'word':
                text = this.wordValue.textContent;
                btn = this.copyWordBtn;
                break;
            case 'roman':
                text = this.romanValue.textContent;
                btn = this.copyRomanBtn;
                break;
            case 'binary':
                text = this.binaryValue.textContent;
                btn = this.copyBinaryBtn;
                break;
            case 'facts':
                text = this.factsValue.textContent;
                btn = this.copyFactsBtn;
                break;
            case 'currency':
                text = this.currencyValue.textContent;
                btn = this.copyCurrencyBtn;
                break;
            case 'scientific':
                text = this.scientificValue.textContent;
                btn = this.copyScientificBtn;
                break;
            case 'percentage':
                text = this.percentageValue.textContent;
                btn = this.copyPercentageBtn;
                break;
            case 'time':
                text = this.timeValue.textContent;
                btn = this.copyTimeBtn;
                break;
            default:
                text = this.rawValue.textContent;
                btn = this.copyRawBtn;
        }
        
        try {
            await navigator.clipboard.writeText(text);
            this.showToast(`Copied ${type} value to clipboard!`);
            
            // Add visual feedback
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

    // Convert number to words
    numberToWords(num) {
        if (num === 0) return 'Zero';
        if (num < 0) return 'Negative ' + this.numberToWords(-num);
        
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion'];
        
        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? '-' + ones[num % 10] : '');
        if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + this.numberToWords(num % 100) : '');
        
        for (let i = scales.length - 1; i >= 0; i--) {
            const scale = Math.pow(1000, i);
            if (num >= scale) {
                const quotient = Math.floor(num / scale);
                const remainder = num % scale;
                return this.numberToWords(quotient) + ' ' + scales[i] + (remainder ? ' ' + this.numberToWords(remainder) : '');
            }
        }
        
        return 'Number too large';
    }

    // Convert number to Roman numerals
    numberToRoman(num) {
        if (num === 0) return 'N';
        if (num < 0) return 'Negative numbers not supported';
        if (num > 3999) return 'Number too large for Roman numerals';
        
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
        
        let result = '';
        for (let i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result += symbols[i];
                num -= values[i];
            }
        }
        return result;
    }

    // Convert number to binary and hexadecimal
    numberToBinaryHex(num) {
        if (num === 0) return '0b0 / 0x0';
        if (!Number.isInteger(num)) return 'Decimal numbers not supported';
        if (num < 0) return 'Negative numbers not supported';
        if (num > 9007199254740991) return 'Number too large';
        
        const binary = '0b' + num.toString(2);
        const hex = '0x' + num.toString(16).toUpperCase();
        return `${binary} / ${hex}`;
    }

    // Get interesting number facts
    getNumberFacts(num) {
        if (num === 0) return 'Zero (additive identity)';
        if (!Number.isInteger(num)) return 'Decimal number';
        if (num < 0) return 'Negative number';
        
        const facts = [];
        
        // Even/Odd
        facts.push(num % 2 === 0 ? 'Even' : 'Odd');
        
        // Prime check
        if (this.isPrime(num)) {
            facts.push('Prime');
        }
        
        // Perfect square
        if (Number.isInteger(Math.sqrt(num))) {
            facts.push('Perfect square');
        }
        
        // Perfect cube
        if (Number.isInteger(Math.cbrt(num))) {
            facts.push('Perfect cube');
        }
        
        // Fibonacci
        if (this.isFibonacci(num)) {
            facts.push('Fibonacci');
        }
        
        // Palindrome
        if (this.isPalindrome(num.toString())) {
            facts.push('Palindrome');
        }
        
        // Sum of digits
        const digitSum = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        if (digitSum > 0) {
            facts.push(`Sum of digits: ${digitSum}`);
        }
        
        return facts.length > 0 ? facts.join(' • ') : 'Regular number';
    }

    // Helper function to check if number is prime
    isPrime(num) {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    // Helper function to check if number is Fibonacci
    isFibonacci(num) {
        if (num < 0) return false;
        if (num === 0 || num === 1) return true;
        
        let a = 0, b = 1;
        while (b < num) {
            const temp = a + b;
            a = b;
            b = temp;
        }
        return b === num;
    }

    // Helper function to check if string is palindrome
    isPalindrome(str) {
        return str === str.split('').reverse().join('');
    }

    // Convert number to currency format
    numberToCurrency(num) {
        if (num === 0) return '$0.00';
        if (num < 0) return '-$' + Math.abs(num).toFixed(2);
        
        // Format with commas and 2 decimal places
        return '$' + num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Convert number to scientific notation
    numberToScientific(num) {
        if (num === 0) return '0.00e+0';
        if (Math.abs(num) < 0.001 || Math.abs(num) >= 1000000) {
            return num.toExponential(2);
        }
        return num.toFixed(2) + 'e+0';
    }

    // Convert number to percentage and ratio
    numberToPercentage(num) {
        if (num === 0) return '0% (0:1)';
        if (num < 0) return 'Negative percentage not supported';
        
        const percentage = (num * 100).toFixed(1) + '%';
        
        // Calculate ratio (simplified)
        let ratio;
        if (num === 1) {
            ratio = '1:1';
        } else if (num < 1) {
            const denominator = Math.round(1 / num);
            ratio = `1:${denominator}`;
        } else {
            const numerator = Math.round(num);
            ratio = `${numerator}:1`;
        }
        
        return `${percentage} (${ratio})`;
    }

    // Convert number to time duration
    numberToTimeDuration(num) {
        if (num === 0) return '0 seconds';
        if (!Number.isInteger(num) || num < 0) return 'Invalid time duration';
        
        const seconds = num;
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;
        
        const parts = [];
        
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        if (remainingHours > 0) parts.push(`${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`);
        if (remainingMinutes > 0) parts.push(`${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`);
        if (remainingSeconds > 0) parts.push(`${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`);
        
        return parts.length > 0 ? parts.join(', ') : '0 seconds';
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
