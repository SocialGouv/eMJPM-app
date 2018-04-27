import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Post, Search } from "../src/components/FilterMesuresMap";

const FormFilterMandataire = ({ props }) => {
	return (
		<Presentation>
			<div style={{ marginLeft: "5px" }}>
				<Title> Rechercher par lieu de rattachement </Title>
				<td className="form-inline">
					<tr>
						<Post
							padd="2"
							size="120"
							id="code_postal"
							name="code_postal"
							placeholder="Code postal"
						/>
					</tr>
					<tr>
						<Post
							padd="2"
							size="260"
							id="commune"
							name="commune"
							placeholder="Commune"
						/>
					</tr>
				</td>
				<Title> Rechercher par zone d'intervention </Title>
				<td className="form-inline">
					<tr>
						<Post
							padd="2"
							size="120"
							id="code_postal"
							name="code_postal"
							placeholder="Code postal"
						/>
					</tr>
					<tr>
						<Post
							padd="2"
							size="260"
							id="commune"
							name="commune"
							placeholder="Commune"
						/>
					</tr>
				</td>

				<Title> Rechercher par professionnel </Title>

				<td className="form-inline">
					<tr>
						<Post
							padd="2"
							size="385"
							id="nameOrService"
							name="nameOrService"
							placeholder="Nom de la personne ou du service"
						/>
					</tr>

					<div
						className="custom-control custom-radio custom-control-inline"
						style={{ marginLeft: "20px" }}
					>
						<label style={{ cursor: "pointer" }} for="customRadioInline1">
							<input
								type="radio"
								id="customRadioInline1"
								name="customRadioInline"
								style={{ margin: "5px" }}
							/>Individuels
						</label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<label style={{ cursor: "pointer" }} for="customRadioInline2">
							<input
								type="radio"
								id="customRadioInline2"
								name="customRadioInline"
								style={{ margin: "5px" }}
							/>Préposés
						</label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<label style={{ cursor: "pointer" }} for="customRadioInline3">
							<input
								type="radio"
								id="customRadioInline3"
								name="customRadioInline"
								style={{ margin: "5px" }}
							/>Services
						</label>
					</div>
				</td>

				<Search align="center" type="submit" style={{ marginTop: "20px" }}>
					Rechercher
				</Search>
			</div>
		</Presentation>
	);
};

const Title = styled.label`
	font-weight: Bold;
	padding-left: 5px;
	margin-top: 15px;
	font-weight: 16px;
`;

const Presentation = styled.div`
	background: #ebeff3;
	border-radius: 5px;
	border: 1px solid #ebeff3;
	padding: 5px;
	width: 865px;
	height: 335px;
	font-weight: 14px;
`;

storiesOf("FormFilterMandataire", module).add("FormFilterMandataire", () => (
	<FormFilterMandataire />
));
