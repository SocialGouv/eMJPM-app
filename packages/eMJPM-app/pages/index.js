import {render} from "react-dom";
import fetch from "isomorphic-fetch";
import TabeRow from "./TabeRow";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import TableTI from "./TableTI";
import CpOval from "./CpOval";
import Navigation from "./Navigation";


const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
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

const sortByDispo = (a, b) => {
    const dispoA = parseInt(a.properties.disponibilite, 10) || -Infinity;
    const dispoB = parseInt(b.properties.disponibilite, 10) || -Infinity;
    if (dispoA < dispoB) {
        return 1;
    }
    if (dispoA > dispoB) {
        return -1;
    }
    // names must be equal
    return 0;
}

class Mandataires extends React.Component {
    state = {
        data: [],
        searchType: "",
        searchNom: "",
        searchVille: "",
        searchTi: "",
        searchContact: "",
        searchDispo: "",
        currentMandataire: "",
        modalIsOpen: false,
        pageOfItems: []
    };

    componentDidMount() {
        const url = "http://127.0.0.1:3000/static/info.json";
        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    data: json.features
                });
            });
    }

    openModal = mandataire => {
        this.setState({modalIsOpen: true, currentMandataire: mandataire});
    };
    closeModal = () => {
        this.setState({modalIsOpen: false});
    };
    updateFilters = (filters) => {
        this.setState(filters);
    }

    render() {
        let filteredMandataires = this.state.data.filter(mandataire => {
            return (
                mandataire.properties.type
                    .toLowerCase()
                    .indexOf(this.state.searchType.toLowerCase()) !== -1 &&
                mandataire.properties.nom
                    .toLowerCase()
                    .indexOf(this.state.searchNom.toLowerCase()) !== -1 &&
                mandataire.properties.ville
                    .toLowerCase()
                    .indexOf(this.state.searchVille.toLowerCase()) !== -1
            );
        });

        filteredMandataires.sort(sortByDispo);
        console.log(filteredMandataires.map(m => m.properties.disponibilite))
        return (
            <div>
                <br/>
                <div className="container">
                    <TableTI
                        rows={filteredMandataires}
                        updateFilters={this.updateFilters}
                        openModal={this.openModal}
                    />

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        {this.state.currentMandataire && (
                            <div>
                                <h2
                                    style={{textAlign: "center"}}
                                    ref={subtitle => (this.subtitle = subtitle)}
                                >
                                    {this.state.currentMandataire.properties.nom}
                                </h2>

                                <div style={{textAlign: "left"}}>
                                    <b>Type:</b> {this.state.currentMandataire.properties.type}
                                </div>
                                <div style={{textAlign: "left"}}>
                                    <b>Contact:</b>{" "}
                                    {this.state.currentMandataire.properties.contact}
                                </div>
                                <div style={{textAlign: "left"}}>
                                    <b>Adresse:</b>{" "}
                                    {this.state.currentMandataire.properties.adresse}
                                </div>
                                <div style={{textAlign: "left"}}>
                                    <b>Ville:</b> {this.state.currentMandataire.properties.ville}
                                </div>
                                <div style={{textAlign: "left"}}>
                                    <b>Tel:</b> {this.state.currentMandataire.properties.tel}
                                </div>
                                <div style={{textAlign: "left"}}>
                                    <b>Email:</b> {this.state.currentMandataire.properties.email}
                                </div>
                                <div style={{textAlign: "left"}}>
                                    <b>Ti:</b> {this.state.currentMandataire.properties.ti}
                                </div>
                                <br/>
                                <div style={{align: "center"}}>
                                    <button className={"btn btn-dark"} onClick={this.closeModal}>
                                        close
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        );
    }
}

const App = () => (

    <div style={styles}>
        <Navigation/>
        <div>
            <CpOval/>
        </div>

        <Mandataires/>
    </div>
);

export default App;
  