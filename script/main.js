$(document).ready(function () {
	var input = document.querySelector("#phone");
	var dialCodeInput = document.querySelector("#phone-input");
	
	const iti = window.intlTelInput(input, {
		onlyCountries: [
			"al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk",
			"ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv",
			"li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro",
			"ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"
		],
		utilsScript: "../script/utils.js"
	});

	// Устанавливаем значение поля выбора страны на "Russia"
	iti.setCountry("ru");
	updateCountryFlag("ru"); // Обновляем флаг страны

	// Обновляем флаг страны при изменении выбранной страны
	input.addEventListener("countrychange", function () {
		var selectedCountryData = iti.getSelectedCountryData();
		updateCountryFlag(selectedCountryData.iso2);
	});

	// Функция обновления флага страны
	function updateCountryFlag(iso2) {
		var country = iti.getSelectedCountryData();
		if (country) {
			input.value = country.name;
			updateMask(country.dialCode);
		}
	}

	// Обновление маски на основе кода страны
	function updateMask(dialCode) {
		var mask = "+" + dialCode + " 999 999 9999";
		$(dialCodeInput).inputmask({
			mask: mask,
			greedy: false,
			placeholder: ""
		});
	}

	input.addEventListener("input", function () {
		updateMask(iti.getSelectedCountryData().dialCode);
	});

	input.addEventListener("keydown", function (event) {
		event.preventDefault();
	});

	input.addEventListener("paste", function (event) {
		event.preventDefault();
	});
});