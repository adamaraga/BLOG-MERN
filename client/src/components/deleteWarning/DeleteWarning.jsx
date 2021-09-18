import "./deleteWarning.css";

function DeleteWarning({ title, desc, handleDelete, show, setShowDeleteWarning, loading }) {
  return (
    <div className={ show?"deleteWarning show": "deleteWarning"}>
      <div className="deleteWarningMessage">
        <div className="deleteWarningTitle">{title}</div>
        <div className="deleteWarningDesc">
          <i
            className="fa fa-exclamation-triangle deleteWarningIcon"
            aria-hidden="true"
          ></i>{" "}
          Are you sure you want to delete {desc}
        </div>
      </div>
      <div className="deleteWarningBtn">
        <button className="btn" onClick={handleDelete}> {loading ? 'Deleting...' : 'Delete'} </button>
        <button className="btnSec" onClick={setShowDeleteWarning} > Cancle </button>
      </div>
    </div>
  );
}

export default DeleteWarning;
