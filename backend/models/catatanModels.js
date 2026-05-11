const Catatan = require('../schema/Catatan');

const findAll = async () => {
  return await Catatan.findAll({
    attributes: ['id', 'judul', 'isi', 'tanggal_dibuat'],
  });
};

const create = async (catatanData) => {
  return await Catatan.create(catatanData);
};

const findById = async (id) => {
  return await Catatan.findByPk(id, {
    attributes: ['id', 'judul', 'isi', 'tanggal_dibuat'],
  });
};

const updateById = async (id, catatanData) => {
  return await Catatan.update(catatanData, {
    where: { id: id },
  });
};

const deleteById = async (id) => {
  return await Catatan.destroy({
    where: { id: id },
  });
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};