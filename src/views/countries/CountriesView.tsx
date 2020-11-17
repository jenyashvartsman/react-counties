import React, { useEffect, useState } from 'react';
import CountryList from './CountryList';

const CountriesView = () => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		getCountries();
	}, []);

	const getCountries = () => {
		fetch('https://restcountries.eu/rest/v2/all')
			.then(res => res.json())
			.then(res => setCountries(res));
	}

	const toggleCountryDetails = (toggleCountry: any) => {
		const newCountries: any[] = [...countries];
		const countryToToggle = newCountries.find(country => country.name === toggleCountry.name);
		if (countryToToggle) {
			countryToToggle.showDetails = !countryToToggle.showDetails;
			// @ts-ignore
			setCountries(newCountries);
		}
	}

	return (
		<div>
			<CountryList countries={countries} toggleCountryDetails={toggleCountryDetails}/>
		</div>
	)
}

export default CountriesView;
