function DataItem({ data }) {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{data.title}</span>
            <p>{data.code}</p>
          </div>
          <div class="card-action">
            <a href="#">Comment</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataItem;
