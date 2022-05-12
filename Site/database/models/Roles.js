module.exports = (sequelize, dataTypes) => {
    let alias = "Roles";
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
        tableName: "Roles",
        timestamps: false
    };
    const Roles = sequelize.define(alias, cols, config);

    return Roles;

}
