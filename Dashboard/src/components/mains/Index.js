import React from 'react';

const Index = () => {
    return (
        <div className="container-fluid">
            <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
            </div>

            {/*<!--general summary-->*/}
            <ContentRowMovies />
            <ContentRowCenter />
            <Chart />

        </div>
    );
}

export default Index;
