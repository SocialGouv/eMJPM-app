import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import SearchButton from "../src/components/SearchButton";

const getColorFromDisponibilite = dispo => {
	if (dispo <= 0) {
		return "#f05659";
	} else if (dispo <= 5) {
		return "#eb9123";
	}
	return "#43b04a";
};

const antenne = {
	etablissement: "Martin",
	disponibilite: 20,
	dispo_max: 250
};

const Cell = ({ style, title, children }) => (
	<td
		className="pagination-centered"
		style={{ fontSize: "1em", textAlign: "left", verticalAlign: "middle", ...style }}
		title={title}
	>
		{children}
	</td>
);

const PillDispo = ({ dispo, dispo_max }) => (
	<Pill
		style={{
			background: getColorFromDisponibilite(dispo_max - dispo)
		}}
	>
		{dispo} / {dispo_max}
	</Pill>
);

const Pill = styled.div`
	font-size: 18px;
	width: 130px;
	height: 30px;
	line-height: 30px;
	border-radius: 2px;
	text-align: center;
	color: white;
`;

const RowAntenne = () => {
	const { etablissement, disponibilite, dispo_max } = antenne;

	return (
		<div>
			<table>
				<tr style={{ background: "white" }}>
					<Cell style={{ width: "250px", verticalAlign: "middle" }}>
						<b>{etablissement}</b>
					</Cell>
					<td
						style={{
							fontSize: "0.8em",
							verticalAlign: "middle",
							textAlign: "center"
						}}
					>
						<PillDispo dispo={disponibilite} dispo_max={dispo_max} />
					</td>
					<td
						style={{
							fontSize: "0.8em",
							verticalAlign: "middle",
							textAlign: "center"
						}}
					>
						<SearchButton
							align="center"
							type="submit"
							style={{ height: "30px", marginTop: "20px" }}
						>
							Modifier
						</SearchButton>
					</td>
				</tr>
			</table>
		</div>
	);
};

storiesOf("RowAntenne", module).add("RowAntenne", () => <RowAntenne antenne="antenne" />);
