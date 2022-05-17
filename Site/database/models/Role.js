module.exports = (sequelize, dataTypes) => {
    let alias = "Role";
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
    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models){
        Role.hasMany(models.Usuario, {
            as: "usuario" ,
            foreignKey: "id_role"
        })
    }

    return Role;

}
