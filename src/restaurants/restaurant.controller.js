import Restaurant from './restaurant.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getRestaurants = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const restaurants = await Restaurant.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Restaurant.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: restaurants,
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
      message: 'Error al obtener restaurantes',
      error: error.message,
    });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener restaurante',
      error: error.message,
    });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(filename.indexOf('restaurants/'));
      data.photo = `${relativePath}.${extension}`;
    } else {
      data.photo = 'restaurants/default_restaurant';
    }

    const restaurant = new Restaurant(data);
    await restaurant.save();

    res.status(201).json({
      success: true,
      message: 'Restaurante creado exitosamente',
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear restaurante',
      error: error.message,
    });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const current = await Restaurant.findById(id);

      if (current && current.photo) {
        const photoPath = current.photo;
        const photoWithoutExt = photoPath.substring(0, photoPath.lastIndexOf('.'));
        const publicId = `restaurants/${photoWithoutExt}`;
        await cloudinary.uploader.destroy(publicId);
      }

      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('restaurants/')
        ? filename.substring(filename.indexOf('restaurants/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurante actualizado exitosamente',
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar restaurante',
      error: error.message,
    });
  }
};

export const changeRestaurantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Restaurante ${action} exitosamente`,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado del restaurante',
      error: error.message,
    });
  }
};
