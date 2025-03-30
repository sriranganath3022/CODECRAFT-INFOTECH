document.addEventListener('DOMContentLoaded', function() {
    const tempInput = document.getElementById('temperature');
    const unitSelect = document.getElementById('unit');
    const convertBtn = document.getElementById('convert-btn');
    const celsiusResult = document.getElementById('celsius-result');
    const fahrenheitResult = document.getElementById('fahrenheit-result');
    const kelvinResult = document.getElementById('kelvin-result');

    // Convert when button is clicked
    convertBtn.addEventListener('click', convertTemperature);

    // Also convert when Enter key is pressed
    tempInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertTemperature();
        }
    });

    function convertTemperature() {
        // Get input values
        const temperature = parseFloat(tempInput.value);
        const unit = unitSelect.value;

        // Check if temperature is a valid number
        if (isNaN(temperature)) {
            alert('Please enter a valid temperature');
            return;
        }

        // Calculate all temperature units
        let celsius, fahrenheit, kelvin;

        switch (unit) {
            case 'celsius':
                celsius = temperature;
                fahrenheit = celsiusToFahrenheit(temperature);
                kelvin = celsiusToKelvin(temperature);
                break;
            case 'fahrenheit':
                celsius = fahrenheitToCelsius(temperature);
                fahrenheit = temperature;
                kelvin = celsiusToKelvin(fahrenheitToCelsius(temperature));
                break;
            case 'kelvin':
                celsius = kelvinToCelsius(temperature);
                fahrenheit = celsiusToFahrenheit(kelvinToCelsius(temperature));
                kelvin = temperature;
                break;
        }

        // Display results with 2 decimal places
        celsiusResult.textContent = celsius.toFixed(2) + ' °C';
        fahrenheitResult.textContent = fahrenheit.toFixed(2) + ' °F';
        kelvinResult.textContent = kelvin.toFixed(2) + ' K';

        // Highlight the original unit
        highlightOriginalUnit(unit);
    }

    function highlightOriginalUnit(unit) {
        // Reset all highlights
        celsiusResult.parentElement.classList.remove('original');
        fahrenheitResult.parentElement.classList.remove('original');
        kelvinResult.parentElement.classList.remove('original');

        // Highlight the original unit
        switch (unit) {
            case 'celsius':
                celsiusResult.parentElement.classList.add('original');
                break;
            case 'fahrenheit':
                fahrenheitResult.parentElement.classList.add('original');
                break;
            case 'kelvin':
                kelvinResult.parentElement.classList.add('original');
                break;
        }
    }

    // Conversion functions
    function celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5/9;
    }

    function celsiusToKelvin(celsius) {
        return celsius + 273.15;
    }

    function kelvinToCelsius(kelvin) {
        return kelvin - 273.15;
    }
});