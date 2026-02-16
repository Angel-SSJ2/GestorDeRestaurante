import Table from './table.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getTables = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const tables = await Table.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Table.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: tables,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener mesas',
      error: error.message,
    });
  }
};

export const getTableById = async (req, res) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Mesa no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener mesa',
      error: error.message,
    });
  }
};

export const createTable = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(filename.indexOf('tables/'));
      data.photo = `${relativePath}.${extension}`;
    } else {
      data.photo = 'tables/default_table';
    }

    const table = new Table(data);
    await table.save();

    res.status(201).json({
      success: true,
      message: 'Mesa creada exitosamente',
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear mesa',
      error: error.message,
    });
  }
};

export const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const current = await Table.findById(id);

      if (current && current.photo) {
        const photoPath = current.photo;
        const photoWithoutExt = photoPath.substring(0, photoPath.lastIndexOf('.'));
        const publicId = `tables/${photoWithoutExt}`;
        await cloudinary.uploader.destroy(publicId);
      }

      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('tables/')
        ? filename.substring(filename.indexOf('tables/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const table = await Table.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Mesa no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mesa actualizada exitosamente',
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar mesa',
      error: error.message,
    });
  }
};

export const changeTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const table = await Table.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Mesa no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: `Mesa ${action} exitosamente`,
      data: table,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message,
    });
  }
};
