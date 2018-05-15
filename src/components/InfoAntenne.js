import styled from "styled-components";
import SearchButton from "./SearchButton";

const JSONSchema = {
	title: "Modifier les informations de cette antenne",
	type: "object",
	required: [
		"nom1",
		"prenom1",
		"poste1",
		"telephone1",
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
		telephone_portable1: { type: "string", title: "Téléphone Portable", default: "" },
		email1: { type: "string", title: "Adresse email", default: "" },
		adresse1: { type: "string", title: "Rue", default: "" },
		code_postal1: { type: "string", title: "Code Postal", default: "" },
		ville1: { type: "string", title: "Commune", default: "" },
		dispo_max1: { type: "string", title: "Nombre de mesures souhaitées", default: "" },
		disponibilite1: { type: "string", title: "Nombre de mesures", default: "" },
		secretariat1: { type: "string", title: "Secretariat", default: "" },
		nb_secretariat1: { type: "string", title: "Secrétariat : nombre d'ETP", default: "" }
	}
};
const uiSchema = {
	Nom: {
		"ui:autofocus": true,
		"ui:placeholder": "Nom"
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

const Test = styled.p`
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
		apiFetch(`/mandataires/1`, {
			method: "PUT",
			body: JSON.stringify({
				nom: formData.nom1,
				prenom: formData.prenom1,
				telephone: formData.telephone1,
				telephone_portable: formData.telephone_portable1,
				email: formData.email1,
				adresse: formData.adresse1,
				code_postal: formData.code_postal1,
				ville: formData.ville1,
				dispo_max: formData.dispo_max1,
				secretariat: formData.secretariat1,
				nb_secretariat: formData.nb_secretariat1,
				disponibilite: formData.disponibilite1
			})
		}).then(json => {
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
			// nom1: `${this.props.currentMandataireModal.nom}`,
			// prenom1: `${this.props.currentMandataireModal.prenom}`,
			// poste1: `${this.props.currentMandataireModal.poste}`,
			// telephone1: `${this.props.currentMandataireModal.telephone}`,
			// telephone_portable1: `${this.props.currentMandataireModal.telephone_portable}`,
			// ville1: `${this.props.currentMandataireModal.ville}`,
			// adresse1: `${this.props.currentMandataireModal.adresse}`,
			// secretariat1: `${this.props.currentMandataireModal.secretariat}`,
			// nb_secretariat1: `${this.props.currentMandataireModal.nb_secretariat}`,
			// email1: `${this.props.currentMandataireModal.email}`,
			// code_postal1: `${this.props.currentMandataireModal.code_postal}`,
			// dispo_max1: `${this.props.currentMandataireModal.dispo_max}`,
			// disponibilite1: `${this.props.currentMandataireModal.disponibilite}`

			nom1: "Martin2",
			prenom1: "Martin1",
			poste1: "chef",
			telephone1: "0612000000",
			telephone_portable1: "0600000000",
			ville1: "Martinville",
			adresse1: "1 rue martin",
			secretariat1: "",
			nb_secretariat1: "",
			email1: "martin.martin@martin.fr",
			code_postal1: "00000",
			dispo_max1: 150,
			disponibilite1: 200
		};
		return (
			<div>
				<div className="container" style={{ marginTop: "30px" }}>
					<h3> Antenne de Ville </h3>
					<br />
					<strong>Contact</strong>
					<Test>
						{/*
						{this.props.currentMandataireModal.prenom}{" "}
						{this.props.currentMandataireModal.nom} -{" "}
						{this.props.currentMandataireModal.poste}*/}
						{prenom1} {nom1}-{poste1}
					</Test>
					<Test>05 59 01 02 03</Test>
					<Test>06 06 06 06 06</Test>
					<Test>martin.martin@martin.fr</Test>
					<br />
					<strong>Adresse</strong>
					<Test>1 rue Martin</Test>
					<Test>00000 - Martinville</Test>
					<br />
					<strong>Tribunal d'instance de l'antenne</strong>
					<Test>Dunkerque</Test>
					<br />
					<strong>Nombre de mesures souhaitées pour l'antenne</strong>
					<Test>250</Test>
					<br />
					<SearchButton onClick={this.openModal}>Modifier</SearchButton>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Antenne"
					background="#e9ecef"
					style={customStyles}
					className="ModalInformation"
					overlayClassName="OverlayInput"
				>
					<Form schema={schema} formData={formData} onSubmit={this.onSubmit}>
						<div style={{ textAlign: "left", paddingBottom: "10px" }}>
							<SearchButton type="submit">Enregistrer</SearchButton>
						</div>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default InfoAntenne;
