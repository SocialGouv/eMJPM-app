import React from "react";
import apiFetch from "../communComponents/Api";

//
// render prop
// handle selection, onAdd, onRemove
// triggers props.onAdd and props.onRemove http method
// assume given objects have an "id" property
//
class DragAndDrop extends React.Component {
  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);

    apiFetch(`/mandataires/upload`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage} >
        <div>
          <input
            ref={ref => {
              this.uploadInput = ref;
            }}
            type="file"
            name="userFile"
          />
        </div>
        <div>
          <button>Upload</button>
        </div>
      </form>
    );
  }
}

export default DragAndDrop;
