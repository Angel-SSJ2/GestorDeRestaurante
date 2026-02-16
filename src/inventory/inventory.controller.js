import Inventory from './inventory.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getInventory = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const items = await Inventory.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Inventory.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: items,
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
      message: 'Error al obtener inventario',
      error: error.message,
    });
  }
};

export const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener item',
      error: error.message,
    });
  }
};

export const createInventory = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(filename.indexOf('inventory/'));
      data.photo = `${relativePath}.${extension}`;
    } else {
      data.photo = 'inventory/default_item';
    }

    const item = new Inventory(data);
    await item.save();

    res.status(201).json({
      success: true,
      message: 'Item creado exitosamente',
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear item',
      error: error.message,
    });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const current = await Inventory.findById(id);

      if (current && current.photo) {
        const photoPath = current.photo;
        const photoWithoutExt = photoPath.substring(0, photoPath.lastIndexOf('.'));
        const publicId = `inventory/${photoWithoutExt}`;
        await cloudinary.uploader.destroy(publicId);
      }

      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('inventory/')
        ? filename.substring(filename.indexOf('inventory/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const item = await Inventory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item actualizado exitosamente',
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar item',
      error: error.message,
    });
  }
};

export const changeInventoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const item = await Inventory.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Item ${action} exitosamente`,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message,
    });
  }
};
