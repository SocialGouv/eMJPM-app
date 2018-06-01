import fetch from "isomorphic-fetch";
import Form, { validateJsonSchema, mergeErrorSchema } from "react-jsonschema-form";
import styled from "styled-components";
import apiFetch from "../Api";
import RowModal from "../RowModal";
import SearchButton from "../SearchButton";
import piwik from "../../piwik";

function validate(formData, errors) {
	if (formData.pass1 !== formData.pass2) {
		errors.pass2.addError("Passwords don't match");
	}
	return errors;
}
const schema = {
	type: "object",
	required: [
		"Iusername",
		"pass1",
		"pass2",
		"etablissement"
		"telephone",
		"email",
		"adresse",
		"ville",
		"code_postal",
	],
	properties: {
		Iusername: { type: "string", title: "Nom d'utilisateur (identifiant)", default: "" },
		pass1: {
			type: "string",
			title: "Mot de passe ( 10 caractères minimum )",
			minLength: 10
		},
		pass2: { type: "string", title: "Répeter mot de passe", minLength: 10 },
		etablissement: { type: "string", title: "Établissement", default: "" },
		
		telephone: { type: "string", title: "Téléphone", default: "" },
		email: { type: "string", title: "Adresse email", default: "" },
		adresse: { type: "string", title: "Rue", default: "" },
		ville: { type: "string", title: "Commune", default: "" },
		code_postal: { type: "string", title: "Code Postal", default: "" }
	}
};

const uiSchema = {
	pass1: {
		"ui:placeholder": "Mot de passe",
		"ui:widget": "password"
	},
	pass2: {
		"ui:placeholder": "Répéter le mot de passe",
		"ui:widget": "password"
	},
	Iusername: {
		"ui:placeholder": "Nom d'utilisateur (identifiant)"
	},
	etablissement: {
		"ui:placeholder": "Établissement"
	},
	telephone: {
		"ui:placeholder": "Téléphone"
	},
	email: {
		"ui:placeholder": "Adresse email"
	},
	adresse: {
		"ui:placeholder": "Rue"
	},
	code_postal: {
		"ui:placeholder": "Code Postal"
	},
	ville: {
		"ui:placeholder": "Commune"
	}
};

const formData = {};

class InscriptionTis extends React.Component {
	/*onSubmit = ({ formData }) => {
		

		 apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
    	Iusername:
    	pass1:
    	pass2:
       	
        
        telephone:
        
        email:
        adresse:
        code_postal:
        ville:
        
      })
    }).then(json => {
     //piwik
     // this.props.updateMadataire(json);
    });
	};*/


	render() {
		return (
			<div>
				<br />
				<h4>Ouvrir un nouveau tribunal d'instance :</h4>
				<br />
				<b>
					<Form
						schema={schema}
						formData={formData}
						uiSchema={uiSchema}
						validate={validate}
					>
						<div
							style={{ textAlign: "left", paddingBottom: "10px", marginLeft: "20px" }}
						>
							<SearchButton type="submit">Enregistrer</SearchButton>
						</div>
					</Form>
				</b>
			</div>
		);
	}
}

export default InscriptionTis;
