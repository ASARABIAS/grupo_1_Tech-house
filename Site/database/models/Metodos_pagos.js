module.exports = (sequelize, dataTypes) => {
    let alias = "Metodos_pagos";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "Paymen_methods",
        timestamps: false
    };
    const Metodos_pagos = sequelize.define(alias, cols, config);

    return Metodos_pagos;

}
