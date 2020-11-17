import React, { useEffect, useState } from 'react';
import CountryList from './CountryList';
import { Country } from '../../models/country';

const CountriesView = () => {
	const [countries, setCountries] = useState<Country[]>([]);

	useEffect(() => {
		getCountries();
	}, []);

	const getCountries = () => {
		fetch('https://restcountries.eu/rest/v2/all')
			.then(res => res.json())
			.then(res => setCountries(res));
	}

	const toggleCountryDetails = (toggleCountry: Country) => {
		const newCountries: Country[] = [...countries];
		const found: Country | undefined = newCountries.find(country => country.name === toggleCountry.name);
		if (found) {
			found.showDetails = !found.showDetails;
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
