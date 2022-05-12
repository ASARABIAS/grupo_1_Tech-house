module.exports = (sequelize, dataTypes) => {
    let alias = "Imagenes";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: dataTypes.STRING
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "Images",
        timestamps: false
    };
    const Imagenes = sequelize.define(alias, cols, config);

    return Imagenes;

}
