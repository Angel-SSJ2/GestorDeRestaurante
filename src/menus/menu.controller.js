import Menu from './menu.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getMenus = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const menus = await Menu.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Menu.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: menus,
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
      message: 'Error al obtener menús',
      error: error.message,
    });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener menú',
      error: error.message,
    });
  }
};

export const createMenu = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(filename.indexOf('menus/'));
      data.photo = `${relativePath}.${extension}`;
    } else {
      data.photo = 'menus/default_menu';
    }

    const menu = new Menu(data);
    await menu.save();

    res.status(201).json({
      success: true,
      message: 'Menú creado exitosamente',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear menú',
      error: error.message,
    });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const current = await Menu.findById(id);

      if (current && current.photo) {
        const photoPath = current.photo;
        const photoWithoutExt = photoPath.substring(0, photoPath.lastIndexOf('.'));
        const publicId = `menus/${photoWithoutExt}`;
        await cloudinary.uploader.destroy(publicId);
      }

      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('menus/')
        ? filename.substring(filename.indexOf('menus/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const menu = await Menu.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menú actualizado exitosamente',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar menú',
      error: error.message,
    });
  }
};

export const changeMenuStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const menu = await Menu.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menú no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Menú ${action} exitosamente`,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado del menú',
      error: error.message,
    });
  }
};
