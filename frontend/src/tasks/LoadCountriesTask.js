import papa from 'papaparse';
import { features } from '../data/countries.json';
import { legendItems } from '../entities/LegendItems';

export class LoadCountriesTask {
	covidUrl =
		'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv';

	setState = null;

	mapCountries = features;

	load = (setState) => {
		this.setState = setState;
		papa.parse(this.covidUrl, {
			download: true,
			header: true,
			complete: (result) => {
				// console.log(result);
				this.#processCovidData(result.data);
			}
		});
		setState(features);
	};

	#processCovidData = (covidCountries) => {
		for (let i = 0; i < this.mapCountries.length; i += 1) {
			const countryFromCSV = this.mapCountries[i];
			//console.log(country);
			const covidCountry = covidCountries.find(
				(countryFromData) => countryFromCSV.properties.ISO_A3 === countryFromData.ISO3
			);

			countryFromCSV.properties.confirmed = 0;
			countryFromCSV.properties.CONFIRMEDTEXT = '0';

			if (covidCountry != null) {
				const confirmed = Number(covidCountry.Confirmed);
				// console.log(confirmed);
				countryFromCSV.properties.confirmed = confirmed;
				// countryFromCSV.properties.CONFIRMEDTEXT = confirmed;
				countryFromCSV.properties.CONFIRMEDTEXT = this.#formatNumberWithCommas(
					confirmed
				);
			}
			this.#setCountryColor(countryFromCSV);
		}

		this.setState(this.mapCountries);
	};

	#setCountryColor = (country) => {
		const legendItem = legendItems.find((item) => item.isFor(country.properties.confirmed));

		if (legendItem != null) country.properties.color = legendItem.color;
	};

	#formatNumberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
