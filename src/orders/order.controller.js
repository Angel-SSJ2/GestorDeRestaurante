import Order from './order.model.js';

export const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const orders = await Order.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: orders,
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
      message: 'Error al obtener órdenes',
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener orden',
      error: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Orden creada exitosamente',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear orden',
      error: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orden actualizada exitosamente',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar orden',
      error: error.message,
    });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activada' : 'desactivada';

    const order = await Order.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: `Orden ${action} exitosamente`,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message,
    });
  }
};
