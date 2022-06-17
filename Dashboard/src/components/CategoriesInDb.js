import React from "react";

function CategoriesInDb(props) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            {props.title}
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {props.data?.map((item, index) => 
              <div className="col-lg-6 mb-4" key={index}>
                <div className="card bg-dark text-white shadow">
                  <div className="card-body">{item.name}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesInDb;
