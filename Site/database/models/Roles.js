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
        tableName: "roles",
        timestamps: false
    };
    const Roles = sequelize.define(alias, cols, config);

    Roles.associate = function(models){
        Roles.hasMany(models.Users, {
            as: "users" ,
            foreignKey: "id_role"
        })
    }

    return Roles;

}
