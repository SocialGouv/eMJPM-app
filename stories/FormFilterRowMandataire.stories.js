import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import FormFilterMandataire from "../src/components/FormFilterMandataire";
import RowMandataire from "../src/components/RowMandataires";
import FormInput from "../src/components/FormInput";
import SearchButton from "../src/components/SearchButton";

const mandataire0 = {
	ville: "MartinVille",
	type: "Martin",
	etablissement: "CentreMartin",
	disponibilite: "40",
	referent: "Martin Martin",
	code_postal: "00000",
	dispo_max: "60"
};

const mandataire1 = {
	ville: "MartinVille",
	type: "Martin",
	etablissement: "CentreMartin",
	disponibilite: "55",
	referent: "Martin Martin",
	code_postal: "00000",
	dispo_max: "60"
};

const mandataire2 = {
	ville: "MartinVille",
	type: "Martin",
	etablissement: "CentreMartin",
	disponibilite: "60",
	referent: "Martin Martin",
	code_postal: "00000",
	dispo_max: "60"
};

const Displayed = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	background: white;
	border: 0px solid black;
	border-radius: 3px;
`;

const FormFilterRowMandataire = () => {
	return (
		<div style={{ background: "gray" }}>
			<div className="container">
				<FormFilterMandataire />
				<Displayed>
					<h5 style={{ fontSize: "18px", padding: "15px", marginTop: "15px" }}>
						<strong>3 professionnels référencés</strong>
					</h5>
					<table class="table">
						<thead class="thead-light table table-striped table-bordered">
							<tr>
								<th scope="col" colSpan="2">
									Nom
								</th>
								<th scope="col" style={{ textAlign: "center" }}>
									Code Postal et Ville
								</th>
								<th scope="col" style={{ textAlign: "right" }}>
									Mesures en cours
								</th>
							</tr>
						</thead>
						<tbody>
							<RowMandataire showDetails mandataire={mandataire0} />
							<RowMandataire showDetails mandataire={mandataire1} />
							<RowMandataire showDetails mandataire={mandataire2} />
							<RowMandataire showDetails mandataire={mandataire0} />
							<RowMandataire showDetails mandataire={mandataire1} />
							<RowMandataire showDetails mandataire={mandataire2} />
						</tbody>
					</table>
				</Displayed>
			</div>
		</div>
	);
};

storiesOf("FormFilterRowMandataire", module).add("FormFilterRowMandataire", () => (
	<FormFilterRowMandataire />
));
