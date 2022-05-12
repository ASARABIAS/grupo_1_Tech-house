module.exports = (sequelize, dataTypes) => {
    let alias = "Caracteristicas";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "Characteristics",
        timestamps: false
    };
    const Caracteristicas = sequelize.define(alias, cols, config);

    return Caracteristicas;

}
