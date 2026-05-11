const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Catatan = sequelize.define(
  "catatan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tanggal_dibuat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // krn kita pakai field tanggal_dibuat, jd tidak perlu createdAt & updateAt dari Sequelize
    tableName: "catatan", // paksa pakai nama ini
    freezeTableName: true, // agar nama tidak diubah jadi plural
  },
);

module.exports = Catatan;
