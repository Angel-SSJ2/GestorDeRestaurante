import Billing from './billing.model.js';

export const getBillings = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const billings = await Billing.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Billing.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: billings,
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
      message: 'Error al obtener facturas',
      error: error.message,
    });
  }
};

export const getBillingById = async (req, res) => {
  try {
    const { id } = req.params;

    const billing = await Billing.findById(id);

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: 'Factura no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: billing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener factura',
      error: error.message,
    });
  }
};

export const createBilling = async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();

    res.status(201).json({
      success: true,
      message: 'Factura creada exitosamente',
      data: billing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear factura',
      error: error.message,
    });
  }
};

export const updateBilling = async (req, res) => {
  try {
    const { id } = req.params;

    const billing = await Billing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: 'Factura no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Factura actualizada exitosamente',
      data: billing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar factura',
      error: error.message,
    });
  }
};

export const changeBillingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activada' : 'desactivada';

    const billing = await Billing.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: 'Factura no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: `Factura ${action} exitosamente`,
      data: billing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message,
    });
  }
};
