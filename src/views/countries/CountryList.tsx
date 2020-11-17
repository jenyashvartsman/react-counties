import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';
import { Country } from '../../models/country';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
		},
		inline: {
			display: 'inline',
		},
		code: {
			margin: '20px 40px',
			padding: '10px',
			maxHeight: '300px',
			overflow: 'auto'
		}
	}),
);

const CountryList = (props: any) => {
	const classes = useStyles();
	const countries: Country[] = props.countries;

	const handleClick = (country: Country) => {
		props.toggleCountryDetails(country);
	}

	return (
		<List className={classes.root}>
			{countries.map((country: any) => {
				return <div key={country.name}>
					<ListItem alignItems="flex-start" button onClick={() => handleClick(country)}>
						<ListItemAvatar>
							<Avatar alt="Remy Sharp" src={country.flag}/>
						</ListItemAvatar>
						<ListItemText
							primary={country.name}
							secondary={
								<React.Fragment>
									<Typography
										component="span"
										variant="body2"
										className={classes.inline}
										color="textPrimary">
										{country.region + ' - '}
									</Typography>
									Capital: {country.capital || 'NA'}, Population: {country.population.toLocaleString()}
								</React.Fragment>
							}
						/>
					</ListItem>
					<Collapse in={country.showDetails} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<pre className={classes.code}>
								{JSON.stringify(country, undefined, 2)}
							</pre>
						</List>
					</Collapse>
					<Divider variant="inset" component="li"/>
				</div>
			})}
		</List>
	)
}

export default CountryList;
