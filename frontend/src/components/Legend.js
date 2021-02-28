import React from 'react';

export const Legend = (legendItems) => {
	//console.log(legendItems);
	const legendStyle = {
		display: 'flex',
		alignItems: 'stretch'
	};
	return (
		<div style={legendStyle}>
			{legendItems.legendItems.map((item) => (
				<div
					key={item.title}
					style={{
						backgroundColor: item.color,
						flex: 1,
						display: 'flex',
						alignItems: 'center', // vertical
						justifyContent: 'center', // horiztontal
						color: item.textColor != null ? item.textColor : 'black',
						fontWeight: 'bolder',
						fontSize: '1em',
						height: '10vh'
					}}
				>
					<span>{item.title}</span>
				</div>
			))}
		</div>
	);
};
