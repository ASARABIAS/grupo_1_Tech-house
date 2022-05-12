module.exports = (sequelize, dataTypes) => {
    let alias = "Color";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: dataTypes.STRING
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "Colors",
        timestamps: false
    };
    const Color = sequelize.define(alias, cols, config);

    return Color;

}
