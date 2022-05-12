module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        length: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    };
    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;

}
