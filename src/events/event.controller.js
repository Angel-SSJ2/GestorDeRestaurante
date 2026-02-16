import Event from './event.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const events = await Event.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: events,
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
      message: 'Error al obtener eventos',
      error: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener evento',
      error: error.message,
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(filename.indexOf('events/'));
      data.photo = `${relativePath}.${extension}`;
    } else {
      data.photo = 'events/default_event';
    }

    const event = new Event(data);
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Evento creado exitosamente',
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear evento',
      error: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const current = await Event.findById(id);

      if (current && current.photo) {
        const photoPath = current.photo;
        const photoWithoutExt = photoPath.substring(0, photoPath.lastIndexOf('.'));
        const publicId = `events/${photoWithoutExt}`;
        await cloudinary.uploader.destroy(publicId);
      }

      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('events/')
        ? filename.substring(filename.indexOf('events/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const event = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Evento actualizado exitosamente',
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar evento',
      error: error.message,
    });
  }
};

export const changeEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const event = await Event.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Evento ${action} exitosamente`,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message,
    });
  }
};
