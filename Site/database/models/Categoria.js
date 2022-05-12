module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
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
    const Categoria = sequelize.define(alias, cols, config);

    return Categoria;

}


