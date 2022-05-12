module.exports = (sequelize, dataTypes) => {
    let alias = "Categorias";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "Categories",
        timestamps: false
    };
    const Categorias = sequelize.define(alias, cols, config);

    return Categorias;

}


