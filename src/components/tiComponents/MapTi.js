import React, { createRef } from "react";
import { Map, TileLayer, CircleMarker } from "react-leaflet";

//Redux
import { connect } from "react-redux";

import FilterMesuresMap from "./FilterMesuresMap";
import DisplayMandataires from "./DisplayMandataires";
import apiFetch from "../communComponents/Api";
import getCenter from "../communComponents/getCenter";
import { filterDataForMandataires } from "../index";
import FilterMandataires from "./FilterMandataires";

const Attribution = () => (
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
  />
);

class MapTi extends React.Component {
  state = {
    filterData: [],
    zoom: 7,
    loading: false,
    circleSelected: "",
    lat: 50.459441,
    lng: 2.693963
  };

  mapRef = createRef();

  fetchData = () => {
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    if (!this.state.loading) {
      this.setState({ loading: true }, () =>
        apiFetch(`${this.props.fetch}`, {
          method: "POST",
          body: JSON.stringify({
            latNorthEast: mapRefGetBound._northEast.lat,
            latSouthWest: mapRefGetBound._southWest.lat,
            longNorthEast: mapRefGetBound._northEast.lng,
            longSouthWest: mapRefGetBound._southWest.lng
          })
        })
          .then(data => {
            this.setState({
              filterData: data,
              loading: false
            });
          })
          .catch(console.log)
      );
    }
  };

  componentDidMount() {
    this.fetchData();
    apiFetch(`/usersTi`)
      .then(data => {
        this.setState({
          lat: data.latitude,
          lng: data.longitude,
          zoom: 10
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    // hack to force reload when some redux state change
    if (prevProps.data !== this.props.data) {
      this.fetchData();
    }
  }

  handleMoveend = () => {
    this.fetchData();
  };

  unselectMarker = () => {
    this.setState(
      {
        circleSelected: ""
      },
      () => this.handleMoveend()
    );
  };

  selectMarker = data => {
    const selectedMandataires = this.props.isMandataire
      ? [data]
      : data.mandataire_ids
          .map(mandataireId => this.props.data.find(mandataire => mandataire.id === mandataireId))
          .filter(Boolean)
          .concat(this.props.services);
    this.setState({
      filterData: selectedMandataires,
      circleSelected: data
    });
  };

  fetchpostCode = codePostal =>
    apiFetch("/mandataires/PosteCode", {
      method: "POST",
      body: JSON.stringify({
        codePoste: codePostal
      })
    });

  zoomCodePostal = codePostal => {
    if (!codePostal || !codePostal.trim()) {
      return Promise.resolve(null);
    } else if (!codePostal.match(/^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/)) {
      return alert("Code postal non valide");
    }
    this.fetchpostCode(codePostal)
      .then(mesure => {
        this.setState({
          lat: mesure.latitude,
          lng: mesure.longitude
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    this.mapRef.current && this.mapRef.current.leafletElement.setMaxZoom(13);
    const { dataFilters, datamesureFilters, isMandataire, filters, coordinates } = this.props;
    //const center = getCenter(this.state, coordinates);
    const center = [this.state.lat, this.state.lng];
    const filterMesure = {
      content: "type",
      filter: filters,
      connector: ""
    };
    const filteredData = filterDataForMandataires(this.state.filterData, filterMesure);
    const markers = isMandataire ? dataFilters : datamesureFilters;
    const mesureCount = filteredData.length;
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <FilterMesuresMap zoomCodePostal={this.zoomCodePostal} />
          <FilterMandataires isMandataire={isMandataire} />
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          <div style={{ flex: "1" }}>
            <Map
              center={center}
              zoom={this.state.zoom}
              style={{ width: "100%", height: "68vh", padding: 0 }}
              ref={this.mapRef}
              onMoveend={() => this.handleMoveend(this.mapRef)}
              onZoomend={() => this.handleMoveend(this.mapRef)}
            >
              <Attribution />
              {markers &&
                markers.map &&
                markers.map((marker, i) => {
                  const isSelected = isMandataire
                    ? this.state.circleSelected.id === marker.id
                    : this.state.circleSelected.code_postal === marker.code_postal;
                  const onClick = isSelected ? this.unselectMarker : this.selectMarker;
                  const markerColor = isSelected ? "blue" : "red";
                  return (
                    <CircleMarker
                      key={marker.id + "-" + i}
                      center={[marker.latitude, marker.longitude]}
                      color={markerColor}
                      radius={10}
                      onClick={() => onClick(marker)}
                    />
                  );
                })}
            </Map>
          </div>
          <div style={{ flex: "1" }}>
            <DisplayMandataires mesureCount={mesureCount} filteredData={filteredData} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dataFilters: state.mandataire.dataFilters,
  datamesureFilters: state.mandataire.datamesureFilters,
  services: state.mandataire.services,
  filters: state.mandataire.filters,
  data: state.mandataire.data
});

export default connect(mapStateToProps)(MapTi);
