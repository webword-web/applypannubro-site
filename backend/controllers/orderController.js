const Order = require('../models/Order');
const Service = require('../models/Service');
const { generateInvoicePDF } = require('../utils/pdfGenerator');

// Generate unique invoice number
const generateInvoiceNumber = () => {
  return `INV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      mobileNumber,
      service,
      quantity,
      serviceType,
      correctionDetails,
      amount,
    } = req.body;

    const dbService = await Service.findById(service);
    if (!dbService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const invoiceNumber = generateInvoiceNumber();

    const order = new Order({
      customerName,
      mobileNumber,
      service,
      quantity,
      serviceType,
      correctionDetails,
      amount,
      invoiceNumber,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('service', 'name price');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order payment status
// @route   PUT /api/orders/:id/pay
// @access  Public
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.paymentStatus = 'Completed';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('service', 'name').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = orderStatus;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download Invoice PDF
// @route   GET /api/orders/:id/invoice
// @access  Public
const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('service', 'name');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    generateInvoicePDF(order, (err, pdfBuffer) => {
      if (err) {
        return res.status(500).json({ message: 'Error generating PDF' });
      }

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${order.invoiceNumber}.pdf`,
        'Content-Length': pdfBuffer.length,
      });

      res.send(pdfBuffer);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard metrics
// @route   GET /api/orders/dashboard/metrics
// @access  Private/Admin
const getDashboardMetrics = async (req, res) => {
  try {
    const totalOrdersCount = await Order.countDocuments();
    const pendingOrdersCount = await Order.countDocuments({ orderStatus: 'Pending' });
    const completedOrdersCount = await Order.countDocuments({ orderStatus: 'Completed' });
    
    // Today's orders
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todaysOrdersCount = await Order.countDocuments({ createdAt: { $gte: startOfToday } });

    // Calculate total revenue
    const completedOrders = await Order.find({ paymentStatus: 'Completed' });
    const totalRevenue = completedOrders.reduce((acc, item) => acc + item.amount, 0);

    res.json({
      totalOrders: totalOrdersCount,
      pendingOrders: pendingOrdersCount,
      completedOrders: completedOrdersCount,
      todaysOrders: todaysOrdersCount,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderStatus,
  downloadInvoice,
  getDashboardMetrics,
};
