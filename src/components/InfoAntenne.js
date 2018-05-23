import styled from "styled-components";
import SearchButton from "./SearchButton";
import ExitButton from "./ExitButton";
import Modal from "react-modal";
import Form from "react-jsonschema-form";
import fetch from "isomorphic-fetch";
import apiFetch from "./Api";

const ModalInformation = styled(Modal)`
	position: absolute;
	width: 900px !important;
	height: 450px !important;
	background-color: white;
	opacity: 1 !important;
	overflow: auto;
	div.form-group {
		vertical-align: top;
	}
`;

const schema = {
	title: "Modifier les informations de cette antenne",
	type: "object",
	required: [
		"nom1",
		"prenom1",
		"telephone1",
		"telephone_portable1",
		"email1",
		"adresse1",
		"code_postal1",
		"ville1",
		"dispo_max1",
		"disponibilite1"
	],
	properties: {
		nom1: { type: "string", title: "Nom", default: "" },
		prenom1: { type: "string", title: "Prénom", default: "" },
		poste1: { type: "string", title: "Poste", default: "" },
		telephone1: { type: "string", title: "Téléphone", default: "" },
		telephone_portable1: {
			type: "string",
			title: "Téléphone Portable",
			default: ""
		},
		email1: { type: "string", title: "Adresse email", default: "" },
		adresse1: { type: "string", title: "Rue", default: "" },
		code_postal1: { type: "string", title: "Code Postal", default: "" },
		ville1: { type: "string", title: "Commune", default: "" },
		dispo_max1: {
			type: "integer",
			title: "Nombre de mesures souhaitées",
			default: ""
		},
		disponibilite1: {
			type: "integer",
			title: "Nombre de mesures",
			default: ""
		}
	}
};
const uiSchema = {
	nom1: {
		"ui:placeholder": "Nom",
		"ui:autofocus": true
	},
	prenom1: {
		"ui:placeholder": "Prenom",
		"ui:autofocus": true
	},
	poste1: {
		"ui:placeholder": "Poste",
		"ui:autofocus": true
	},
	telephone1: {
		"ui:placeholder": "Téléphone",
		"ui:autofocus": true
	},
	telephone_portable1: {
		"ui:placeholder": "Téléphone Portable",
		"ui:autofocus": true
	},
	email1: {
		"ui:placeholder": "Email",
		"ui:autofocus": true
	},
	adresse1: {
		"ui:placeholder": "Adresse",
		"ui:autofocus": true
	},
	code_postal1: {
		"ui:placeholder": "Code Postal",
		"ui:autofocus": true
	},
	ville1: {
		"ui:placeholder": "Ville",
		"ui:autofocus": true
	},
	dispo_max1: {
		"ui:placeholder": "Nombre de mesures souhaitées",
		"ui:autofocus": true
	},
	disponibilite1: {
		"ui:placeholder": "Nombre de mesures en cours",
		"ui:autofocus": true
	}
};

const formData = {};

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)"
	}
};

const InformationsAntenne = styled.p`
	margin-bottom: 0;
`;

class InfoAntenne extends React.Component {
	state = {
		data: [],
		datamesure: [],
		currentMandataire: "",
		modalIsOpen: false
	};

	onSubmit = ({ formData }) => {
		console.log("erreur 1");

		apiFetch(`/serviceAntenne/1`, {
			method: "PUT",
			body: JSON.stringify({
				nom: formData.nom1 || "",
				prenom: formData.prenom1 || "",
				poste: formData.poste1 || "",
				telephone: formData.telephone1 || "",
				telephone_portable: formData.telephone_portable1 || "",
				email: formData.email1 || "",
				adresse: formData.adresse1 || "",
				code_postal: formData.code_postal1 || "",
				ville: formData.ville1 || "",
				dispo_max: formData.dispo_max1 || 0,
				disponibilite: formData.disponibilite1 || 0
			})
		}).then(json => {
			if (
				formData.dispo_max1 !==
				this.props.currentMandataireModal.dispo_max
			) {
				piwik.push([
					"trackEvent",
					"mesures",
					"Modification du nombre de mesures souhaitées par un service"
				]);
			}
			this.props.updateMadataire(json);
		});
		this.closeModal();
	};

	openModal = mandataire => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	render() {
		const formData = {
			nom1: this.props.currentMandataireModal.nom,
			prenom1: this.props.currentMandataireModal.prenom,
			poste1: this.props.currentMandataireModal.poste,
			telephone1: this.props.currentMandataireModal.telephone,
			telephone_portable1: this.props.currentMandataireModal
				.telephone_portable,
			ville1: this.props.currentMandataireModal.ville,
			adresse1: this.props.currentMandataireModal.adresse,
			email1: this.props.currentMandataireModal.email,
			code_postal1: this.props.currentMandataireModal.code_postal,
			dispo_max1: this.props.currentMandataireModal.dispo_max,
			disponibilite1: this.props.currentMandataireModal.disponibilite
		};
		return (
			<div>
				<div className="container" style={{ marginTop: "30px" }}>
					<h3>
						{" "}
						Antenne de {
							this.props.currentMandataireModal.ville
						}{" "}
					</h3>
					<br />
					<strong>Contact</strong>
					<InformationsAntenne>
						{this.props.currentMandataireModal.prenom}{" "}
						{this.props.currentMandataireModal.nom} -{" "}
						{this.props.currentMandataireModal.poste}
					</InformationsAntenne>
					<InformationsAntenne>
						{this.props.currentMandataireModal.type.toUpperCase()}
					</InformationsAntenne>
					<InformationsAntenne>
						{this.props.currentMandataireModal.telephone}
					</InformationsAntenne>
					<InformationsAntenne>
						{this.props.currentMandataireModal.telephone_portable}
					</InformationsAntenne>
					<InformationsAntenne>
						{this.props.currentMandataireModal.email}
					</InformationsAntenne>
					<br />
					<strong>Adresse</strong>
					<InformationsAntenne>
						{this.props.currentMandataireModal.adresse}
					</InformationsAntenne>
					<InformationsAntenne>
						{this.props.currentMandataireModal.ville} <br />
						{this.props.currentMandataireModal.code_postal}
					</InformationsAntenne>
					<br />
					{/*<strong>Tribunal d'instance de l'antenne</strong>
					<InformationsAntenne>Dunkerque</InformationsAntenne>
					<br />*/}
					<strong>Nombre de mesures en cours pour l'antenne</strong>
					<InformationsAntenne>
						{this.props.currentMandataireModal.disponibilite}
					</InformationsAntenne>
					<br />
					<strong>Nombre de mesures souhaitées pour l'antenne</strong>
					<InformationsAntenne>
						{this.props.currentMandataireModal.dispo_max}
					</InformationsAntenne>
					<br />
					<SearchButton onClick={this.openModal}>
						Modifier
					</SearchButton>
				</div>
				<ModalInformation
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Antenne"
					background="#e9ecef"
					style={customStyles}
					className="ModalInformation"
					overlayClassName="OverlayInput"
				>
					<ExitButton onClick={this.closeModal}>X</ExitButton>
					<Form
						schema={schema}
						formData={formData}
						onSubmit={this.onSubmit}
					>
						<div
							style={{
								textAlign: "left",
								paddingBottom: "10px",
								marginLeft: "20px"
							}}
						>
							<SearchButton type="submit">
								Enregistrer
							</SearchButton>
						</div>
					</Form>
				</ModalInformation>
			</div>
		);
	}
}

export default InfoAntenne;
