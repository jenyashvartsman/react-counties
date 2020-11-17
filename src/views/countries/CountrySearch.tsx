import React from 'react';
import { TextField } from '@material-ui/core';

const CountrySearch = (props: any) => {

	const handleChange = (event: any) => {
		props.filterCountries(event.target.value);
	}

	return (
		<TextField fullWidth id="country-search" label="Name or Region" onChange={handleChange}/>
	)
}

export default CountrySearch;
