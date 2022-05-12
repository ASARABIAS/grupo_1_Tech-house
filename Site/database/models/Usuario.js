module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        country: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.INTEGER
        },
        id_role: {
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
