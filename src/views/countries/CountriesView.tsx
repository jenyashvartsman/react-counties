import React, { useEffect, useState } from 'react';
import CountryList from './CountryList';
import { Country } from '../../models/country';
import CountrySearch from './CountrySearch';

const CountriesView = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

	useEffect(() => {
		getCountries();
	}, []);

	const getCountries = () => {
		fetch('https://restcountries.eu/rest/v2/all')
			.then(res => res.json())
			.then(res => {
				setCountries(res);
				setFilteredCountries(res)
			});
	}

	const toggleCountryDetails = (toggleCountry: Country) => {
		const newCountries: Country[] = [...countries];
		const found: Country | undefined = newCountries.find(country => country.name === toggleCountry.name);
		if (found) {
			found.showDetails = !found.showDetails;
			setCountries(newCountries);
		}
	}

	const filterCountries = (query: string) => {
		if (!!query) {
			query = query.toLowerCase();
			const newCountries: Country[] = countries.filter(country =>
				country.name.toLowerCase().search(query) > -1 || country.region.toLowerCase().search(query) > -1);
			setFilteredCountries(newCountries);
		} else {
			setFilteredCountries([...countries]);
		}
	}

	return (
		<div>
			<CountrySearch filterCountries={filterCountries}/>
			<CountryList countries={filteredCountries} toggleCountryDetails={toggleCountryDetails}/>
		</div>
	)
}

export default CountriesView;
